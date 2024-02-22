import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SiteLogo from './SiteLogo';
import MapTypeMenu from './MapTypeMenu';

const TopBar = () => (
  <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <SiteLogo />
        <Typography
          variant="h6"
          noWrap
          component={RouterLink}
          to="/"
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Cinema Finder
        </Typography>
        <MapTypeMenu />
      </Toolbar>
    </Container>
  </AppBar>
);
export default TopBar;