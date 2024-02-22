import { Alert, Box, CircularProgress } from "@mui/material";
import useNearbyCinemas from "../../data/nearbyCinemas";
import BaseCinemaList from "./BaseCinemaList";
import NearbyHeader from "./NearbyHeader";

const NearbyCinemasList = () => {
  const {
    isGeolocationAvailable,
    isGeolocationEnabled,
    cinemas,
  } = useNearbyCinemas();

  return (<>
    <BaseCinemaList {...{ cinemas }} Header={NearbyHeader} />
    {isGeolocationAvailable && isGeolocationEnabled && cinemas.length === 0 && (
      <Box sx={{ textAlign: 'center' }}><CircularProgress /></Box>
    )}
    {
      !isGeolocationAvailable && <Alert severity="error">Your browser does not support Geolocation</Alert>
    }
    {
      !isGeolocationEnabled && <Alert severity="error">Geolocation request was denied, or disabled.</Alert>
    }
  </>)
};
export default NearbyCinemasList;