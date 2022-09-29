
import { useState } from 'react';
import { ChangeEventHandler, FormEventHandler } from 'react';


import Box from '@mui/material/Box';
import {TextField, Typography, Button} from '@mui/material';
import { createHandler } from '../../utils/handler-utils';
import { checkEmail, checkPassword } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/api-actions';


const HelperText = {
  Email: 'it is not email',
  Password: 'at least 6 characters'
};

const AuthPage = () => {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailLabel, setEmailLabel] = useState('');
  const [emailHelper, setEmailHelper] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordLabel, setPasswordLabel] = useState('');
  const [passwordHelper, setPasswordHelper] = useState('');

  const [errorMessage, setErrorMessage] = useState('');


  const navigate = useNavigate();
  const dispatch = useDispatch();


  // const emailRef = useRef<React.LegacyRef<HTMLInputElement> | undefined>(undefined);

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (evt) =>
    createHandler( {evt, setValue: setEmail, setError: setEmailError, setLabel: setEmailLabel, setHelper: setEmailHelper, checkValue: checkEmail, helperText: HelperText.Email} );

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (evt) =>
    createHandler( {evt, setValue: setPassword, setError: setPasswordError, setLabel: setPasswordLabel, setHelper: setPasswordHelper, checkValue: checkPassword, helperText: HelperText.Password} );

  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();

    if (!checkEmail(email)) {
      setEmailError(true);
      setEmailLabel('Error');
      setEmailHelper(HelperText.Email);

    }
    if (!checkPassword(password)) {
      setPasswordError(true);
      setPasswordLabel('Error');
      setPasswordHelper(HelperText.Password);
    }
    if (checkEmail(email) && checkPassword(password)) {
      const redirect = () => navigate('/');

      dispatch(login({email, password}, redirect, setErrorMessage ));
    }
  };

  return (
    <main style={{display: 'flex', justifyContent: 'center', width: '100%', padding: '10% 0'}}>

      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate

        autoComplete="off"
      >
        <Typography variant="h1" gutterBottom>
        Registration
        </Typography>
        <div>
          <TextField
            error={emailError}
            id="outlined-error"
            label={emailLabel}
            placeholder='email'
            type={'email'}
            helperText={emailHelper}
            onChange={handleEmailChange}
            value={email}
            required
          />
          <TextField
            error={passwordError}
            id="outlined-error-helper-text"
            label={passwordLabel}
            placeholder='password'
            type='password'
            helperText={passwordHelper}
            onChange={handlePasswordChange}
            value={password}
            required
          />
        </div>


        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button type='submit' variant="contained" size="large" style={{margin: '15px'}}>
            login
          </Button>
          <p style={{width: '100%', textAlign: 'center', color: 'red', fontWeight: 'bold'}}>{errorMessage}</p>

        </div>

      </Box>
    </main>
  );
};

export default AuthPage;
