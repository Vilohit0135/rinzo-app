import { useState } from 'react';
import * as Location from 'expo-location';
import { reverseGeocode } from '../services/locationService';

export const useLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestAndGetLocation = async (): Promise<{
    address: string;
    coords: { latitude: number; longitude: number };
  } | null> => {
    setLoading(true);
    setError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied. Please enable it in settings.');
        return null;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };

      const address = await reverseGeocode(coords.latitude, coords.longitude);

      return { address, coords };
    } catch (e: any) {
      setError(e?.message || 'Failed to get current location.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, requestAndGetLocation };
};
