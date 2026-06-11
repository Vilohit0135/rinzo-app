import * as Location from 'expo-location';

export interface PlaceResult {
  id: string;
  name: string;
  address: string;
  area: string;
  city: string;
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

export const searchPlaces = async (query: string): Promise<PlaceResult[]> => {
  if (!query.trim()) return [];
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
