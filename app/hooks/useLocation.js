import React from "react";
import * as Location from "expo-location";

function useLocation() {
  const [location, setLocation] = React.useState();

  React.useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) return;
    try {
      const location = await Location.getLastKnownPositionAsync();

      if (!location || !location.coords) {
        console.log("No last known location");
        return;
      }
      const { latitude, longitude } = location.coords;

      setLocation({ latitude, longitude });
    } catch (error) {
      console.log("Error", error);
    }
  };
  return location;
}

export default useLocation;
