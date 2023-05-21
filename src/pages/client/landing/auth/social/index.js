import { ButtonGroup } from '@mui/material';
import GoogleLogin from './google';
import FacebookLogin from './facebook';

export default function SocialList() {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <GoogleLogin />
      <FacebookLogin />
    </ButtonGroup>
  );
}
