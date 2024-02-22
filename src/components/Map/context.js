import { createContext, useContext } from 'react';

const MapContext = createContext(null);
export const useMapContext = () => useContext(MapContext);

export const MapContextProvider = MapContext.Provider;
export default MapContext;