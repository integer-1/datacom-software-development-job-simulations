import {
  MapContainer,
  // Rectangle,
  TileLayer,
  Marker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import useEventListener from "@use-it/event-listener";
import { useSnackbar } from "notistack";
import { totalBounds } from "../../data/bounds";
import MapContext from "./context";
// Have to override these url's so that it finds the bundles the correct images
Icon.Default.imagePath =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/";

const MapSnappingEventListener = () => {
  const { enqueueSnackbar } = useSnackbar();
  const map = useMap();
  useEventListener("map.snapTo", ({ detail: { lat, lng } }) => {
    // This hook sets up an event listener for the map.snapTo event which
    // is currently dispatched be an onClick function in CinemaListItem
    console.log("executing `map.snapTo` event with leaflet");

    try {
      // [Docs](https://leafletjs.com/reference.html#map-flyto)
      map.flyTo([lat, lng], 14, { duration: 0.5, easeLinearity: 1 });
    } catch (e) {
      console.error(e);
      enqueueSnackbar(
        "We are sorry, but map navigation is currently unavailable.",
        {
          variant: "error",
        }
      );
    }
  });
  return null;
};

const convertBounds = ([w, s, e, n]) => [
  // Leaflet expects boundings boxes to be an array consisting of the corners of the box.
  // These corners are [lat, lon] [LatLng docs](https://leafletjs.com/reference.html#latlng)
  [s, w],
  [n, e],
];

const LeafletMarker = ({ lat, lon }) => <Marker position={[lat, lon]} />;

const LeafletMap = ({ children }) => {
  console.log("render Leaflet map");
  return (
    <>
      <MapContainer
        bounds={convertBounds(totalBounds)}
        style={{ height: "100%", backgroundColor: "#99b3cc" }}
        zoomSnap={0.5}
        zoomDelta={0.5}
      >
        <MapSnappingEventListener />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          subdomains="abcd"
          minZoom={0}
          maxZoom={18}
          ext="png"
        />
        <MapContext.Provider value={{ Marker: LeafletMarker }}>
          {children}
        </MapContext.Provider>
        {/* {[...allCountryBounds, totalBounds].map((bounds, idx) => (
          <Rectangle bounds={convertBounds(bounds)} key={idx} />
        ))} */}
      </MapContainer>
    </>
  );
};
export default LeafletMap;
