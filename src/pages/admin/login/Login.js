import { useContext, useState } from 'react';
import styles from './login.module.css';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography
} from '@mui/material';
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthContext } from 'src/contexts/authContext/authContext';
import logo from '../../assets/images/emp_logo.png';

const eyeStyles = {
  position: 'absolute',
  right: '5px',
  zIndex: '10',
  cursor: 'pointer'
};

function Login() {
  console.log('login');
  // hooks
  const [rememberMe, setRememberMe] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  let [user, setUser] = useState({ phoneNumber: '', password: '' });
  let [passwordErr, setPasswordErr] = useState('');
  let [phoneNumberErr, setPhoneNumberErr] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);

  // validation paterns
  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      await login(user, rememberMe);
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
    // if (e.target.value.length < 6) {
    //     setPasswordErr('password must be at least 6 characters')
    // } else {
    //     setPasswordErr('')
    // }
  };
  // validate name input
  const phoneNumberChange = (e) => {
    setUser((prev) => setUser({ ...prev, phoneNumber: e.target.value }));
  };

  // effect
  // useEffect(() => {
  //     setDisableSubmit(!!(passwordErr || phoneNumberErr || !user?.phoneNumber || !user?.password))
  // }, [passwordErr, phoneNumberErr, user?.phoneNumber, user?.password]);
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
                id="Phone-Number"
                placeholder="Username"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  inputProps: { maxLength: 13 }
                }}
                sx={{ input: { color: '#fff' } }}
                style={{ width: '100%', padding: '0 15px' }}
                value={user?.phoneNumber}
                onChange={(e) => {
                  phoneNumberChange(e);
                }}
              />

              {user?.phoneNumber && (
                <p
                  className="text-danger text-start p-0 m-0"
                  style={{
                    fontSize: '12px',
                    position: 'absolute',
                    bottom: '-18px'
                  }}
                >
                  {phoneNumberErr}
                </p>
              )}
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
              {user?.password && (
                <p
                  className="text-danger text-start p-0 m-0"
                  style={{
                    fontSize: '12px',
                    position: 'absolute',
                    bottom: '-18px'
                  }}
                >
                  {passwordErr}
                </p>
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
            >
              <FormControlLabel
                onChange={() => {
                  setRememberMe(!rememberMe);
                }}
                control={
                  <Checkbox checked={rememberMe} sx={{ color: '#6c7375' }} />
                }
                label={
                  <Typography className={styles.forget_pass_font}>
                    Remember Me
                  </Typography>
                }
              />

              {/* <span className={styles.forget_pass_font} style={{ marginTop: '9px', display: 'inline-block' }}>Forget password</span> */}
            </div>

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

export default Login;
