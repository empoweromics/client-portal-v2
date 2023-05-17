import { useRef, useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  Popover,
  Typography,
  styled
} from '@mui/material';

import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { UserContext } from 'src/contexts/UserContext';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const { state, dispatch, removeUser } = useContext(UserContext);
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const signOutAdmin = () => {
    localStorage.removeItem('admin');
    dispatch({
      type: removeUser
    });
    navigate('/go');
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar
          variant="rounded"
          alt={state.admin?.username}
          src={state.user?.avatar}
        />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{state.admin?.username}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              administration role
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        TransitionProps={{ timeout: 0 }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar
            variant="rounded"
            alt={state.user?.name}
            src={state.user?.avatar}
          />
          <UserBoxText>
            <UserBoxLabel variant="body1">{state.user?.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {state.user?.name}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>

        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="error" fullWidth onClick={() => signOutAdmin()}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
