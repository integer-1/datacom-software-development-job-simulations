import "maplibre-gl/dist/maplibre-gl.css";
import Map, { Marker, useMap } from "react-map-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from "maplibre-gl";
import useEventListener from "@use-it/event-listener";
import { useSnackbar } from "notistack";
import { MapContextProvider } from "./context";
import { totalBounds } from "../../data/bounds";
import maplibreglWorker from "maplibre-gl/dist/maplibre-gl-csp-worker";
maplibregl.workerClass = maplibreglWorker;

const MaplibreMarker = ({ lat, lon }) => (
  <Marker longitude={lon} latitude={lat} anchor="bottom" />
);

const convertBounds = ([w, s, e, n]) => [
  // MapLibre expects bounds to be [LngLatBoundsLike](https://maplibre.org/maplibre-gl-js-docs/api/geography/#lnglatboundslike)
  // as such the are either LngLat objects in [sw, ne] order or an array of numbers in [w, s, e, n] order.
  [w, s],
  [e, n],
];

const MapSnappingEventListener = () => {
  const { enqueueSnackbar } = useSnackbar();
  const map = useMap().current;
  useEventListener("map.snapTo", ({ detail: { lat, lng } }) => {
    // This hook sets up an event listener for the map.snapTo event which
    // is currently dispatched be an onClick function in CinemaListItem
    console.log("executing `map.snapTo` event with maplibre");

    try {
      // [Docs](https://maplibre.org/maplibre-gl-js-docs/api/map/#map#flyto)
      map.flyTo({
        center: [lng, lat],
        zoom: 14,
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar(
        "We are sorry, but map navigation is currently unavailable.",
        { variant: "error" }
      );
    }
  });
  return null;
};

const MaplibreMap = ({ children }) => {
  console.log("render Maplibre map");
  return (
    <Map
      mapLib={maplibregl}
      mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=46DCXvzkGNIvqAgCljGV"
      initialViewState={{
        bounds: convertBounds(totalBounds),
      }}
      padding={24}
    >
      <MapSnappingEventListener />
      <MapContextProvider value={{ Marker: MaplibreMarker }}>
        {children}
      </MapContextProvider>
    </Map>
  );
};
export default MaplibreMap;
