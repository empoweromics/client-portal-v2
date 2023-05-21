import { Box, Button, Card, Container, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import UserPool from 'src/utilities/cognito/UserPool';

function Signup() {
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: ''
  });
  useEffect(() => {}, []);

  const onSubmit = () => {
    UserPool.signUp(
      signupForm.email,
      signupForm.password,
      [],
      null,
      (err, data) => {
        if (err) {
          console.err(err);
        } else {
          console.log(data);
        }
      }
    );
  };
  return (
    <Container>
      <Card>
        <Box p={2}>
          <form onSubmit={onSubmit}>
            <TextField
              sx={{ marginY: '5px' }}
              id="email"
              label="email"
              variant="outlined"
              required
              value={signupForm.email}
              onChange={(e) =>
                setSignupForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <TextField
              sx={{ marginY: '5px' }}
              id="password"
              label="password"
              variant="outlined"
              required
              type="password"
              value={signupForm.password}
              onChange={(e) =>
                setSignupForm((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <Button
              color="secondary"
              size="large"
              variant="contained"
              onClick={() => onSubmit()}
            >
              Register
            </Button>
          </form>
        </Box>
      </Card>
    </Container>
  );
}

export default Signup;
