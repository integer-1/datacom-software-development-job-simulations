import { List, Divider } from "@mui/material";
import CinemaListItem from "./CinemaListItem";

const CinemaListAside = ({ cinemas, Header = null }) => {
  return (
    <List sx={{ maxHeight: "calc(100vh - 112px)", overflowY: "auto" }}>
      <Header {...{ cinemas }} />
      {Header && <Divider />}
      {/* NOTE: potential future feature of adding frontend sorting */}
      {/* NOTE: this currently doesn't handle the case of cinemas array being empty
                (poential caused by manually manipulated url arguments) */}
      {cinemas.map((cinema, idx) => (
        <CinemaListItem {...cinema} key={idx} />
      ))}
    </List>
  );
};
export default CinemaListAside;
