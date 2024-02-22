import useNearbyCinemas from "../data/nearbyCinemas";
import { useMapContext } from './Map/context';

const NearbyCinemaMarkers = () => {
  const { Marker } = useMapContext();
  const { cinemas } = useNearbyCinemas();

  return cinemas.map((cinema, idx) => {
    return (
      <Marker lat={cinema.lat} lon={cinema.lng} key={idx} />
    )
  })
};

export default NearbyCinemaMarkers;