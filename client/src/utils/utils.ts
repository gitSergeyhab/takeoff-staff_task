import { toast } from 'react-toastify';
import { EMAIL_PATTERN, MIN_PASSWORD_LENGTH, PHONE_PATTERN } from '../const';

const checkEmail = (email: string): boolean => EMAIL_PATTERN.test(String(email).toLowerCase());
const checkPassword = (password: string): boolean => password.length >= MIN_PASSWORD_LENGTH;
const checkPhone = (phone: string): boolean => PHONE_PATTERN.test(String(phone));

const onSuccessResponse = ({message} : {message : string}, close: () => void) => {
  toast.success(message);
  close();
};

const onErrorResponse = ({data} : {data: {message : string}}, close: () => void) => {
  toast.error(data.message);
  close();
};


export {
  checkEmail, checkPassword, checkPhone,
  onErrorResponse, onSuccessResponse
};
