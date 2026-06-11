import * as Location from 'expo-location';

export interface PlaceResult {
  id: string;
  name: string;
  address: string;
  area: string;
  city: string;
  latitude?: number;
  longitude?: number;
  placeId?: string;
}

const mockPlaces: PlaceResult[] = [
  { id: 'p1', name: 'Koramangala', address: 'Koramangala 1st Block', area: 'Koramangala', city: 'Bengaluru' },
  { id: 'p2', name: 'Indiranagar', address: 'Indiranagar Double Road', area: 'Indiranagar', city: 'Bengaluru' },
  { id: 'p3', name: 'Whitefield', address: 'Whitefield Main Road', area: 'Whitefield', city: 'Bengaluru' },
  { id: 'p4', name: 'MG Road', address: 'MG Road', area: 'MG Road', city: 'Bengaluru' },
  { id: 'p5', name: 'JP Nagar', address: 'JP Nagar 3rd Phase', area: 'JP Nagar', city: 'Bengaluru' },
  { id: 'p6', name: 'BTM Layout', address: 'BTM Layout 2nd Stage', area: 'BTM Layout', city: 'Bengaluru' },
  { id: 'p7', name: 'HSR Layout', address: 'HSR Layout Sector 3', area: 'HSR Layout', city: 'Bengaluru' },
  { id: 'p8', name: 'Electronic City', address: 'Electronic City Phase 1', area: 'Electronic City', city: 'Bengaluru' },
  { id: 'p9', name: 'Marathahalli', address: 'Marathahalli Bridge', area: 'Marathahalli', city: 'Bengaluru' },
  { id: 'p10', name: 'Jayanagar', address: 'Jayanagar 4th Block', area: 'Jayanagar', city: 'Bengaluru' },
  { id: 'p11', name: 'Andheri West', address: 'Andheri West', area: 'Andheri', city: 'Mumbai' },
  { id: 'p12', name: 'Connaught Place', address: 'Connaught Place', area: 'CP', city: 'Delhi' },
];

export const getCurrentLocation = async (): Promise<{ latitude: number; longitude: number }> => {
  return { latitude: 12.9716, longitude: 77.5946 };
};

export const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  try {
    const results = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
    if (results && results.length > 0) {
      const r = results[0];
      const parts = [r.name, r.street, r.district, r.city, r.region, r.postalCode]
        .filter((p): p is string => !!p);
      return parts.length > 0 ? parts.join(', ') : `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  } catch {
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
};

export const getPlaceDetails = async (placeId: string): Promise<{ latitude: number; longitude: number } | null> => {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return null;
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=geometry&key=${apiKey}`
    );
    const data = await response.json();
    if (data.status === 'OK' && data.result?.geometry?.location) {
      const loc = data.result.geometry.location;
      return {
        latitude: loc.lat,
        longitude: loc.lng,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching Google Place Details:', error);
    return null;
  }
};

export const searchPlaces = async (query: string): Promise<PlaceResult[]> => {
  if (!query.trim()) return [];

  const googleApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (googleApiKey) {
    try {
      // Fetch predictions from Google Places Autocomplete API
      // Restrict results to India (components=country:in) for better local accuracy
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${googleApiKey}&components=country:in`
      );
      const data = await response.json();
      if (data.status === 'OK' && data.predictions) {
        return data.predictions.map((p: any) => ({
          id: p.place_id,
          name: p.structured_formatting?.main_text || p.description,
          address: p.structured_formatting?.secondary_text || '',
          area: p.structured_formatting?.main_text || '',
          city: '',
          placeId: p.place_id,
        }));
      }
    } catch (error) {
      console.error('Error fetching from Google Places API, falling back...', error);
    }
  }

  // Fallback: Use Photon (OpenStreetMap geocoding autocomplete API)
  try {
    // Bias results close to Bengaluru (lat=12.9716, lon=77.5946) to prioritize local results
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=10&lat=12.9716&lon=77.5946`;
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.features) {
      return data.features.map((feature: any, idx: number) => {
        const props = feature.properties;
        const coords = feature.geometry.coordinates; // [longitude, latitude]

        const name = props.name || props.street || 'Location';

        // Format detailed address components
        const addressParts = [];
        if (props.street && props.street !== name) {
          if (props.housenumber) {
            addressParts.push(`${props.housenumber} ${props.street}`);
          } else {
            addressParts.push(props.street);
          }
        }
        if (props.district || props.suburb) {
          addressParts.push(props.district || props.suburb);
        }

        const address = addressParts.join(', ') || props.city || props.state || '';
        const area = props.district || props.suburb || props.city || '';
        const city = props.city || props.state || '';

        return {
          id: `photon-${idx}-${props.osm_id || Math.random()}`,
          name,
          address,
          area,
          city,
          latitude: coords[1],
          longitude: coords[0],
        };
      });
    }
  } catch (error) {
    console.error('Error fetching from Photon API, falling back to mock places...', error);
  }

  // Last-resort fallback: Use static mockPlaces
  const lower = query.toLowerCase();
  return mockPlaces.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.address.toLowerCase().includes(lower) ||
      p.area.toLowerCase().includes(lower) ||
      p.city.toLowerCase().includes(lower)
  );
};

export const saveAddress = async (address: any): Promise<void> => {
  console.log('saveAddress called with:', address);
};

export const getSavedAddresses = async (): Promise<any[]> => {
  return [];
};

export const deleteAddress = async (id: string): Promise<void> => {
  console.log('deleteAddress called with:', id);
};
