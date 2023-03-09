import * as Location from "expo-location";
import { useState, useEffect } from "react";

export default function useLocations(params) {
  const [location, setLocation] = useState({});

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;

      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
}
