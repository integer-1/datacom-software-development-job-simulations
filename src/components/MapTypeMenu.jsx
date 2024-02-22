import { IconButton, Popover, Backdrop, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useRef, useState } from 'react';
import { MdSettings } from 'react-icons/md';
import { startCase } from 'lodash';
import { mapTypes, useMapType } from './Map';

const MapTypeMenu = () => {
  const [open, setOpen] = useState(false);
  const settingsButtonRef = useRef(null);

  const [mapType, setMapType] = useMapType();

  return (<>
    <IconButton ref={settingsButtonRef} sx={{ ml: 'auto' }} color={open ? 'grey' : 'initial'} onClick={() => setOpen(true)}>
      <MdSettings />
    </IconButton>
    <Backdrop
      open={open}
      sx={{ zIndex: 1000 }}
    />
    <Popover
      open={open}
      anchorEl={settingsButtonRef?.current}
      onClose={() => setOpen(false)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <FormControl sx={{ m: 2 }}>
        <FormLabel>Active map library</FormLabel>
        <RadioGroup value={mapType} onChange={(evt) => {
          setMapType(evt.target.value);
        }}>
          {mapTypes.map((type) => (
            <FormControlLabel key={type} value={type} control={<Radio />} label={startCase(type)} />
          ))}
        </RadioGroup>
      </FormControl>
    </Popover>
  </>)
}
export default MapTypeMenu;