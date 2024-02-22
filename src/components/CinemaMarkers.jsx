import { useMemo } from "react";
import { useParams } from "react-router-dom";
import allCinemas from "../data/cinemas";
import { useMapContext } from './Map/context';

const CinemaMarkers = () => {
  const { Marker } = useMapContext();
  const params = useParams();
  const cinemas = useMemo(() => {
    if (params.franchiseId || params.countryCode) {
      const { franchiseId, countryCode } = params;
      return allCinemas.filter(cinema => {
        return (
          franchiseId === 'all-cinemas' ||
          cinema.franchise === franchiseId
        ) && cinema.countryCode === countryCode;
      })
    }

    return allCinemas;
  }, [params]);

  return cinemas.map((cinema, idx) => {
    return (
      <Marker lat={cinema.lat} lon={cinema.lng} key={idx} />
    )
  })
};

export default CinemaMarkers;