import { Container, Grid } from '@mui/material';
import TopBar from "./TopBar";

const Layout = ({ children }) => (
  <>
    <TopBar />
    <Container maxWidth="xl" sx={{ mt: 2, height: 'calc(100vh - 96px)' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {children}
      </Grid>
    </Container>
  </>
)
export default Layout;