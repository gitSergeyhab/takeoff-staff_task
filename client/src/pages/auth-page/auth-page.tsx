
import { useState, ChangeEventHandler, FormEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Typography, Button, Box } from '@mui/material';
import { login } from '../../store/api-actions';
import { AppPath } from '../../const';
import { checkEmail, checkPassword } from '../../utils/utils';
import { createHandler } from '../../utils/handler-utils';


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

  const dispatch = useDispatch();

  const navigate = useNavigate();


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
      dispatch(login({email, password}, redirect, setErrorMessage));
    }
  };

  return (
    <main className={'main'}>

      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          '& .MuiTextField-root': { mb: 1, width: '100%' },
        }}
        noValidate

        autoComplete="off"
      >
        <Typography variant="h1" textAlign={'center'} gutterBottom fontSize={50}>
          Authorization
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
        <div className='auth-btn-block'>

          <Button
            variant="outlined" type='submit' color='success' size='small' style={{width: '40%'}}
          >
          Sign In
          </Button>

          <Typography variant="subtitle1" gutterBottom>
        or
          </Typography>
          <Button
            variant="outlined" type='button' color='warning' size='small' style={{width: '40%'}}
            onClick={() => navigate(AppPath.Registration)}
          >
          Sign Up
          </Button>
          <Typography variant='subtitle1' textAlign={'center'} width={'100%'} color='red' margin={'auto'}>
            {errorMessage}
          </Typography>
        </div>

      </Box>
    </main>
  );
};

export default AuthPage;
