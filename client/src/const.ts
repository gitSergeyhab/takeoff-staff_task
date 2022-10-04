const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_PATTERN = /^((\+7|7|8)+([0-9]){10})$/;

const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 3;

const AUTH_TOKEN = 'auth-token';

const enum StatusCode {
  NotAuth = 401,
  NotFound = 404.
}

const enum ServerRoute {
  Registration = '/users/registration',
  Login = '/users/login',
  Auth = '/users/auth',
}

const enum AppPath {
  Auth = '/auth',
  Registration = '/registration',
  Contacts = '/',
}

const enum Message {
  DefaultError = 'something is wrong...',
  AuthError = 'you are not logged in',
  AuthSuccess = 'you are logged',
  SignUpSuccess = 'you are registered',
  DeleteSuccess = 'this contact was deleted',
  DeleteError = 'cannot delete this contact'
}

const enum HelperText {
  Email = 'it is not email',
  Password = 'at least 6 characters'
}


export {
  EMAIL_PATTERN, MIN_PASSWORD_LENGTH, PHONE_PATTERN, MIN_NAME_LENGTH, AUTH_TOKEN,
  ServerRoute, Message, AppPath, StatusCode, HelperText
};
