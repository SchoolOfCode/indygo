
import { useEffect, useState, useContext } from "react";
import React from "react";
import DemoModeContext from "../contexts/demoMode";


//Type for pos state
export interface position {
  lat: number;
  lng: number;
}

/**
 * A custom React hook that accesses the devices geolocation to find a users location
 * @returns pos {lat, lng} and err (error string)
 */
export function useLocation() {
  const [pos, setPos] = useState<position>(); //Position info
  const [err, setErr] = useState<string>(); //Error info
  const { demoModeActive } = useContext(DemoModeContext);

  useEffect(() => {

    if (demoModeActive == true) {
      setPos({ lat: 53.367459, lng: -1.501914 });
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }

    /**
     * Recives lat & lng from geolocal and assigns to state.
     */
    async function setPosition(position: any) {
      setPos({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }

    /**
     * Sets specific error if applicable, defaults to unknown error otherwise
     */
    async function showError(error: any) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setErr('User denied the request for Geolocation.');
          console.log(err);
          break;
        case error.POSITION_UNAVAILABLE:
          setErr('Location information is unavailable.');
          console.log(err);
          break;
        case error.TIMEOUT:
          setErr('The request to get user location timed out.');
          console.log(err);
          break;
        case error.UNKNOWN_ERROR:
          setErr('An unknown error occurred.');
          console.log(err);
          break;
        default:
          setErr('An unknown error occurred.');
          console.log(err);
      }
    }
  }, [demoModeActive, err]);

  return { pos, err };
}
