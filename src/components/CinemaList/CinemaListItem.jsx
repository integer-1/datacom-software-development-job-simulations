import { useState } from "react";
import { Chip, IconButton, ListItem, ListItemText } from "@mui/material";
import { MdCall, MdOutlineLocationOn } from "react-icons/md";
import { format } from "d3-format";

const dispatchMapSnapTo = (lat, lng) => {
  // This will dispatch the `map.snapTo` event which will trigger a listener on the
  // respective active map component to zoom to the latitude and longitude passed
  console.log(
    "triggering `map.snapTo` event with args: ",
    `lat: ${lat}, lng: ${lng}`
  );
  dispatchEvent(new CustomEvent("map.snapTo", { detail: { lat, lng } }));
};

const CinemaListItem = ({
  name,
  lat,
  lng,
  phoneNumber,
  distance,
  ...otherProps
}) => {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  return (
    <ListItem>
      <ListItemText>
        {name}
        {distance && (
          <Chip
            size="small"
            sx={{ ml: 1 }}
            label={`${format(",.1f")(distance)} km`}
          />
        )}
      </ListItemText>
      {phoneNumber && (
        <IconButton
          onMouseEnter={() => setShowPhoneNumber(true)}
          onMouseLeave={() => setShowPhoneNumber(false)}
          component="a"
          href={`tel:${phoneNumber}`}
        >
          <MdCall />
          {showPhoneNumber && (
            <span
              style={{
                position: "absolute",
                marginBottom: "40px",
                width: "300px",
                fontSize: "13px",
              }}
            >
              {phoneNumber}
            </span>
          )}
        </IconButton>
      )}
      <IconButton onClick={() => dispatchMapSnapTo(lat, lng)}>
        <MdOutlineLocationOn />
      </IconButton>
    </ListItem>
  );
};
export default CinemaListItem;
