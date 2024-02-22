import loadable from '@loadable/component';
import createPersistedState from 'use-persisted-state';

const usePersistedMapTypeState = createPersistedState('app.mapType');

const Maps = {
  maplibre: loadable(() => import('./MaplibreMap')),
  leaflet: loadable(() => import('./LeafletMap')),
}

export const mapTypes = Object.keys(Maps);
export const useMapType = () => {
  const [mapType, setMapType] = usePersistedMapTypeState(mapTypes[0]);
  return [mapType, setMapType];
}

const Map = (props) => {
  // Returns either a MaplibreMap or a LeafletMap component depending on 
  // what has been set via the settings cog in the nav (default: maplibre)
  const [mapType] = useMapType();
  const Component = Maps[mapType];
  return <Component {...props} />
}
export default Map;