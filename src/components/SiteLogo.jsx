import { SvgIcon } from '@mui/material';
import { GiFilmProjector } from 'react-icons/gi';


// Manually extract out viewBox and path from svg import
const splitSourceStrs = GiFilmProjector.toString().split(/[()]/);
const jsonStr = splitSourceStrs.filter(str => str[0] === '{' && str.slice(-1)[0] === '}')[0];
// In production the json is minified to js (and stops being able to be parsed by JSON.parse)
const correctedJsonStr = jsonStr.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');

const jsxEl = JSON.parse(correctedJsonStr);
const viewBox = jsxEl.attr.viewBox;
const d = jsxEl.child[0].attr.d;

const SiteLogo = (props) => {
  return (
    <SvgIcon {...{ viewBox }} fontSize='large' sx={{ mr: 1 }} {...props}>
      <path {...{ d }} />
    </SvgIcon>
  )
}
export default SiteLogo;