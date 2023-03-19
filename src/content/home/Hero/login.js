import {
  Container,
  Button,
  styled,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useGoogle from 'src/utilities/firebase/google';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(5)};
      height: ${theme.spacing(5)};
  `
);
function GoogleLogin() {
  const { signInGoogle } = useGoogle();
  const _user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Container>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemAvatar sx={{ pr: 2 }}>
                <AvatarWrapper
                  src={_user ? _user.avatar : '/static/images/logo/google.svg'}
                />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary={_user ? `Welcome ${_user.name}` : 'Google'}
                secondary={
                  _user
                    ? 'Your account is now set up and you’ve successfully reserved your spot.'
                    : 'A Google account hasn’t been yet added to your account'
                }
              />
              {!_user && (
                <Button
                  color="secondary"
                  size="large"
                  variant="contained"
                  onClick={() => signInGoogle()}
                >
                  Connect
                </Button>
              )}
              {_user && (
                <Button
                  component={RouterLink}
                  to="/go"
                  size="large"
                  variant="contained"
                >
                  Open Portal
                </Button>
              )}
            </ListItem>
          </List>
        </Card>
      </Container>
    </>
  );
}

export default GoogleLogin;
