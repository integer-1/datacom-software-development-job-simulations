import { List, Typography, Grid, Chip, Card, CardActions, CardMedia, ListItem, ListItemText, Stack, Button, ListItemIcon, Icon } from '@mui/material';
import { GiAustralia, GiFern, } from 'react-icons/gi';
import { MdLocationSearching, MdOutlineLocationOn, MdSettings } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';
import { breakdown } from '../data/cinemas';
import franchises from '../data/franchises';

const FranchiseCard = ({ id, identifier, name, logoUrl, breakdown, ...props }) => (
  <Grid item sx={{ width: '22.5ex' }}>
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} variant="outlined">
      {
        logoUrl !== undefined ? (
          <CardMedia sx={{ flex: 1, p: 1, objectFit: 'contain' }} component="img" image={logoUrl} />
        ) : (
          <CardMedia sx={{ flex: 1, p: 1 }}>{name || identifier || id}</CardMedia>
        )
      }
      <CardActions>
        <Stack direction="row" justifyContent="space-around" spacing={1} sx={{ width: '100%' }}>
          {Object.entries(breakdown).map(([countryCode, count]) => (
            <Button
              size="small"
              sx={{
                borderRadius: 16,
                opacity: 0.8,
                "&:hover": {
                  opacity: 1,
                  outline: '1px solid',
                }
              }}
              startIcon={
                countryCode === 'au' ? <GiAustralia /> : <GiFern />
              }
              variant="contained"
              disableElevation
              color="grey"
              component={RouterLink}
              to={`/${id}/${countryCode}`}
              key={countryCode}
            >
              {count}
            </Button>
          ))}
        </Stack>
      </CardActions>
    </Card>
  </Grid>
)

const AsideIndex = () => (
  <>
    <Typography variant='h5'>
      Cinemas
    </Typography>
    <Typography sx={{ p: 1 }}>
      Welcome to <strong>Cinema Finder</strong>, an application to allow you to browse for Cinemas throughout Australia and New Zealand.
    </Typography>
    {/* <Divider sx={{ mb: 1 }} /> */}
    <Typography variant='h5' sx={{ mt: 1, pt: 1, borderTop: 1, borderColor: 'divider' }}>
      Countries
    </Typography>
    <List>
      <ListItem button component={RouterLink} to='/all-cinemas/au'>
        <ListItemIcon>
          <Icon><GiAustralia /></Icon>
        </ListItemIcon>
        <ListItemText>
          Australia
        </ListItemText>
        <Chip label={breakdown.au} />
      </ListItem>
      <ListItem button component={RouterLink} to='/all-cinemas/nz'>
        <ListItemIcon>
          <Icon><GiFern /></Icon>
        </ListItemIcon>
        <ListItemText>
          New Zealand
        </ListItemText>
        <Chip label={breakdown.nz} />
      </ListItem>
    </List>
    <Typography variant='h6' sx={{ mb: 1, pt: 1, borderTop: 1, borderColor: 'divider' }}>
      Franchises
    </Typography>
    <Grid container spacing={2} justifyContent="space-around">
      {
        Object.values(franchises).map((franchise) => (
          franchise.id !== 'unknown' && <FranchiseCard key={franchise.id} {...franchise} />
        ))
      }
    </Grid>
    <List sx={{ mt: 2, pt: 1, borderTop: 1, borderColor: 'divider' }}>
      <ListItem button component={RouterLink} to='/nearby'>
        <ListItemIcon>
          <Icon><MdLocationSearching /></Icon>
        </ListItemIcon>
        <ListItemText>
          Nearby Cinemas
        </ListItemText>
      </ListItem>
    </List>
    <Typography variant='h5' sx={{ pt: 1, borderTop: 1, borderColor: 'divider' }}>
      Help
    </Typography>
    <Typography sx={{ p: 1 }}>
      Use the <MdSettings style={{ verticalAlign: 'text-top' }} /> menu in the top navigation bar to switch between mapping libraries.
      <br /><br />
      When viewing a list of cinemas, you can click <MdOutlineLocationOn style={{ verticalAlign: 'text-top' }} /> to fly to that cinema on the map.
    </Typography>
  </>
)
export default AsideIndex;