import { Grid, Paper, Typography } from "@mui/material";
import Layout from "./components/Layout";
import Map from "./components/Map";
import AsideIndex from "./components/AsideIndex";
import {
  FranchiseCinemasList,
  NearbyCinemasList
} from "./components/CinemaList";
import { Switch, Route } from "react-router-dom";
import Provider from "./components/Provider";
import loadable from "@loadable/component";

// Minimal react component for page not found aside.
// Could be extracted to a different file if it was more complicated.
const NotFound = () => (
  <Typography variant="h6">404, Page Not Found!</Typography>
);

// Use @loadable/component to dynamic import the CinemaMarkers & NearbyCinemaMarkes
// this will make the application utilise code splitting to decrease the total initial code file size.
const CinemaMarkers = loadable(() => import("./components/CinemaMarkers"));
const NearbyCinemaMarkers = loadable(() =>
  import("./components/NearbyCinemaMarkers")
);
// This isn't required for the CinemasLists as they already loadable components [in ./components/CinemaList/index.jsx]

// Our root component containing our map and info panel
const App = () => (
  <Provider>
    <Layout>
      <Grid item xs={12} md={8} sx={{ minHeight: 400 }}>
        <Map>
          <Switch>
            <Route exact path="/">
              <CinemaMarkers />
            </Route>
            <Route path="/nearby" component={NearbyCinemaMarkers} />
            <Route
              path="/:franchiseId/:countryCode"
              component={CinemaMarkers}
            />
          </Switch>
        </Map>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 1 }}>
          <Switch>
            <Route exact path="/" component={AsideIndex} />
            <Route path="/nearby" component={NearbyCinemasList} />
            <Route
              path="/:franchiseId/:countryCode"
              component={FranchiseCinemasList}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </Paper>
      </Grid>
    </Layout>
  </Provider>
);

export default App;
