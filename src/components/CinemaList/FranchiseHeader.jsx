import { IconButton, ListSubheader, Typography, Stack } from "@mui/material";
import { GiAustralia, GiFern } from "react-icons/gi";
import { MdOutlineArrowBack } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from "react-router-dom";
import franchises from "../../data/franchises";

const FranchiseHeader = () => {
  const { franchiseId, countryCode } = useParams();
  const franchise = franchises[franchiseId];

  return (
    <ListSubheader sx={{ pb: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <IconButton component={RouterLink} to="/">
          <MdOutlineArrowBack />
        </IconButton>
        {franchise?.logoUrl ? (<div style={{ height: '3em' }}>
          <img src={franchise?.logoUrl} alt={`${franchise.identifier} logo`} height="100%" />
        </div>) : (
          <Typography sx={{ alignSelf: 'center' }}>
            {franchiseId === 'all-cinemas' ? 'All Cinemas' : (franchise?.name || franchise?.identifier || franchise?.id)}
          </Typography>
        )}
        <IconButton disabled>
          {countryCode === 'au' && <GiAustralia />}
          {countryCode === 'nz' && <GiFern />}
        </IconButton>
      </Stack>
    </ListSubheader>
  )
}
export default FranchiseHeader;