import { useContext, useState } from 'react';
import styles from './login.module.css';
import { Button, CircularProgress, TextField } from '@mui/material';
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { AuthContext } from 'src/contexts/authContext/authContext';
import logo from 'src/assets/images/userprofile.png';
import { UserContext, setAdmin } from 'src/contexts/UserContext';
import { useNavigate } from 'react-router';

const eyeStyles = {
  position: 'absolute',
  right: '5px',
  zIndex: '10',
  cursor: 'pointer'
};

function AdminAuthLogin() {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  // hooks
  const [isloading, setIsloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let [user, setUser] = useState({ username: '', password: '' });

  function login(user) {
    localStorage.setItem(
      'admin',
      JSON.stringify({
        username: user.username,
        token: user.token
      })
    );
    dispatch({
      type: setAdmin,
      payload: {
        username: user.username,
        token: user.token
      }
    });
  }

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      login(user);
      navigate('/admin');
      // await login(user, rememberMe);
    } catch (err) {
      if (err.request?.status === 400 || err.request?.status === 401) {
        // alert('Phone Number Or password not valid')
      } else if (err.request?.status === 500) {
        // alert('Internal server Error')
      } else {
        // alert('Something went wrong, please try again')
      }
    }
    setIsloading(false);
  };
  // toggle password eye icon
  const handleToggleEyeIcon = () => {
    setShowPassword((show) => !show);
  };
  // validate name password

  const passwordChange = (e) => {
    setUser((prev) => {
      setUser({ ...prev, password: e.target.value });
    });
  };
  // validate name input
  const formChange = (id, value) => {
    setUser((prev) => setUser({ ...prev, [id]: value }));
  };

  return (
    <div
      className={styles.login_wrapper}
      style={{ background: 'linear-gradient(to bottom, #2a9c7d, #25b675)' }}
    >
      <div className={`${styles.login_Card}`}>
        <div className={`${styles.logo_wrapper}`}>
          <img className="w-100" src={logo} alt="" />
        </div>
        <span className={`${styles.login_text}`}>
          Welcome To Empoweromics Admin Panel
        </span>
        {/* form */}
        <form onSubmit={handleSubmit}>
          <div className={styles.user_info_textField_wrapper}>
            <div className={styles.phone_number_wrapper}>
              <PermIdentityTwoToneIcon className={styles.icon} />
              <TextField
                size="small"
                id="username"
                placeholder="Username"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  inputProps: { maxLength: 13 }
                }}
                sx={{ input: { color: '#fff' } }}
                style={{ width: '100%', padding: '0 15px' }}
                value={user?.username}
                onChange={(e) => formChange(e.target.id, e.target.value)}
              />
            </div>

            {/* password */}
            <div className={styles.password_wrapper}>
              <LockIcon className={styles.icon} />
              <TextField
                size="small"
                sx={{ input: { color: '#000' } }}
                id="password"
                placeholder=" Password"
                type={showPassword ? 'text' : 'password'}
                variant="standard"
                InputProps={{
                  disableUnderline: true
                }}
                style={{ width: '100%', padding: '0 15px' }}
                value={user?.password}
                onChange={(e) => {
                  passwordChange(e);
                }}
              />
              {!showPassword ? (
                <VisibilityOff onClick={handleToggleEyeIcon} sx={eyeStyles} />
              ) : (
                <Visibility onClick={handleToggleEyeIcon} sx={eyeStyles} />
              )}
            </div>

            <div
              className="login_checkbox"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '10px',
                marginBottom: '13px'
              }}
            />

            <Button
              type="submit"
              //  disabled={disableSubmit || isloading}
              className={styles.login_button}
            >
              {isloading && (
                <CircularProgress
                  sx={{
                    color: 'white',
                    width: '20px !important',
                    height: '20px !important',
                    marginRight: '10px !important'
                  }}
                />
              )}{' '}
              Login{' '}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAuthLogin;
