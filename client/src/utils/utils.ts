import { EMAIL_PATTERN, MIN_PASSWORD_LENGTH } from '../const';

const checkEmail = (email: string): boolean => EMAIL_PATTERN.test(String(email).toLowerCase());
const checkPassword = (password: string): boolean => password.length >= MIN_PASSWORD_LENGTH;

export { checkEmail, checkPassword };
