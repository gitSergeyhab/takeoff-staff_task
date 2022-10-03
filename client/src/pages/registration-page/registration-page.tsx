
import { useState, ChangeEventHandler, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TextField, Typography, Button, Box } from '@mui/material';
import { checkEmail, checkPassword } from '../../utils/utils';
import { registration } from '../../store/api-actions';
import { createHandler } from '../../utils/handler-utils';
import { HelperText } from '../../const';


const RegistrationPage = () => {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailLabel, setEmailLabel] = useState('');
  const [emailHelper, setEmailHelper] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordLabel, setPasswordLabel] = useState('');
  const [passwordHelper, setPasswordHelper] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');


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
      const redirect = () => navigate('/auth');

      dispatch(registration({email, password}, redirect, setErrorMessage ));
    }
  };

  return (
    <main className={'main'}>

      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          '& .MuiTextField-root': { width: '100%', mb: 1 },
        }}
        boxSizing={'border-box'}
        noValidate

        autoComplete="off"
      >
        <Typography variant="h1" textAlign={'center'} gutterBottom fontSize={50}>
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
        <div className='.auth-btn-block'>
          <Button type='submit' variant="outlined" fullWidth>
            register
          </Button>
          <Typography variant='subtitle1' textAlign={'center'} width={'100%'} color='red' margin={'auto'}>
            {errorMessage}
          </Typography>
        </div>

      </Box>
    </main>
  );
};

export default RegistrationPage;
