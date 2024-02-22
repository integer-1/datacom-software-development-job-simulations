import { IconButton, ListSubheader, Typography, Stack, Chip } from "@mui/material";
import { MdOutlineArrowBack } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';

const NearbyHeader = ({ cinemas }) => {
  return (
    <ListSubheader sx={{ pb: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <IconButton component={RouterLink} to="/">
          <MdOutlineArrowBack />
        </IconButton>
        <Typography sx={{ alignSelf: 'center', flex: 1, textAlign: 'center' }}>
          Nearby Cinemas
        </Typography>
        {cinemas.length > 0 && (
          <Chip label={cinemas.length} />
        )}
      </Stack>
    </ListSubheader>
  )
}
export default NearbyHeader;