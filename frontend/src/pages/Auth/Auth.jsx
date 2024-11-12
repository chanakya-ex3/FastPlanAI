import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
    setRole('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || (!isLogin && (!name || !role))) {
      setError('Please fill in all fields');
      return;
    }
    console.log(JSON.stringify({ 'email':email, 'password':password }));
    if (isLogin) {
      // send login request
      await fetch(BASE_URL + 'auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Add this header
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Invalid email or password');
        })
        .then((data) => {
          console.log(data)
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.user.role);
          window.location.reload();
          setEmail('');
          setPassword('');
          setName('');
          setRole('');
          setError('');
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      await fetch(BASE_URL + 'auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Add this header
        },
        body: JSON.stringify({ email, password , name, role }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Something went wrong');
        })
        .then((data) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          window.location.reload();
          setError('');
          setEmail('');
          setPassword('');
          setName('');
          setRole('');
        });
    }
  };

  return (
    <div className=' bg-red-400 w-[100%] h-[100%] flex items-center justify-center'>
    <div className='dark:bg-blue-300 bg-white p-10 rounded-lg'>
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant='h3' component='h2' gutterBottom>
          FastPlanAI
        </Typography>
        <Typography variant='h4' component='h2' gutterBottom>
          {isLogin ? 'Login' : 'Register'}
        </Typography>

        <form onSubmit={handleSubmit}>
          {error && <Alert severity='error'>{error}</Alert>}
          <TextField
            label='Email'
            type='email'
            fullWidth
            margin='normal'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!isLogin && (
            <>
              <TextField
                label='Name'
                type='text'
                fullWidth
                margin='normal'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <FormControl fullWidth margin='normal'>
                <InputLabel>Role</InputLabel>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <MenuItem value='TM'>Team Member</MenuItem>
                  <MenuItem value='PM'>Project Manager</MenuItem>
                </Select>
              </FormControl>
            </>
          )}

          <TextField
            label='Password'
            type='password'
            fullWidth
            margin='normal'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2 }}
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>

        <p
          className='bg-transparent text-blue-800 hover:text-blue-500'
          onClick={handleToggle}
        >
          {setIsLogin ? 'Create an account' : 'Already have an account?'}
        </p>
      </Box>
    </div>
    </div>
  );
}

export default Auth;
