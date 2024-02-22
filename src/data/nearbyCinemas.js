import { useEffect, useMemo } from "react";
import { useGeolocated } from "react-geolocated";
import { point } from "@turf/helpers";
import distance from "@turf/distance";
import { sortBy, memoize } from "lodash";
import allCinemas from "./cinemas";

// Manually add a point to each cinema this is to be used during comparisons later
// and will prevent this point needing to be regenerated every time we're recompute & sorting cinemas.
const cinemasWithPoints = allCinemas.map((cinema) => ({
  ...cinema,
  loc: point([cinema.lng, cinema.lat])
}));

const computeCinemaDistance = memoize((lat, lng) => {
  // Create this point to use later for the same reason as above.
  const location = point([lng, lat]);

  // Compute and add distance between point above and the cinema's point
  // then sortBy distance
  return sortBy(
    cinemasWithPoints.map((cinema) => ({
      ...cinema,
      distance: distance(location, cinema.loc)
    })),
    "distance"
  );
});

const useNearbyCinemas = () => {
  // Use library's hook to get coords of location
  const {
    coords,
    getPosition,
    isGeolocationAvailable,
    isGeolocationEnabled
  } = useGeolocated();
  useEffect(() => {
    if (!isGeolocationEnabled) {
      getPosition();
    }
    // Disabling eslint's warning as we want this to only occur onMount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cinemas = useMemo(() => {
    if (!coords) return [];

    // when we have coords, find nearest 15 cinemas
    return computeCinemaDistance(coords.latitude, coords.longitude).slice(
      0,
      15
    );
  }, [coords]);

  // return status of location api lookup and list of cinemas
  return {
    isGeolocationAvailable,
    isGeolocationEnabled,
    coords,
    cinemas
  };
};
export default useNearbyCinemas;
