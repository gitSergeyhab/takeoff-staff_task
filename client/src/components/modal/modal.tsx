import { FormEventHandler, useRef, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions } from '@mui/material';
import { toast } from 'react-toastify';
import { usePostContactMutation, usePutContactMutation } from '../../store/contacts-api/contacts-api';
import { ContactType } from '../../types/types';
import { checkEmail, checkPhone, onErrorResponse, onSuccessResponse } from '../../utils/utils';
import { MIN_NAME_LENGTH } from '../../const';


type ContactModalProps = {
  handleClose: () => void,
  open: boolean,
  contact: ContactType | null
}

const getValueFromInput = (ref: React.RefObject<HTMLInputElement>): string => ref.current?.querySelector('input')?.value || '';


const ContactModal = ({ contact, handleClose, open}: ContactModalProps) => {

  const [postContact] = usePostContactMutation();
  const [putContact] = usePutContactMutation();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const getFomValues = () => ({name: getValueFromInput(nameRef), email: getValueFromInput(emailRef), phone: getValueFromInput(phoneRef)});

  const [isSubmitDisable, setSubmitDisable] = useState(true);


  const handleSubmit:FormEventHandler = async (evt) => {
    evt.preventDefault();

    const {email, name, phone} = getFomValues();

    if (!checkPhone(phone) || !checkEmail(email) || name.length < MIN_NAME_LENGTH) {
      if (!checkPhone(phone)) {
        toast.warn(`incorrect number: ${phone}`);
      }

      if (!checkEmail(email)) {
        toast.warn(`incorrect email: ${email}`);
      }

      if (name.length < MIN_NAME_LENGTH) {
        toast.warn(`incorrect name: ${name}`);
      }
      return;
    }

    if (contact) {
      await putContact({body: {email, name, phone}, id: contact.id })
        .unwrap()
        .then((data) => onSuccessResponse(data, handleClose))
        .catch((data) => onErrorResponse(data, handleClose));
    } else {
      await postContact({name, email, phone})
        .unwrap()
        .then((data) => onSuccessResponse(data, handleClose))
        .catch((data) => onErrorResponse(data, handleClose));
    }
  };

  const handleFormChange = () => {
    const {email, name, phone} = getFomValues();
    if (email && name && phone) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  };


  const defaultName = contact ? contact.name : '';
  const defaultEmail = contact ? contact.email : '';
  const defaultPhone = contact ? contact.phone : '';

  const buttonText = contact ? 'change contact' : 'add contact';


  return (
    <Dialog open={open} onClose={handleClose} aria-describedby={'contact-modal'} >
      <DialogTitle textAlign={'center'} id='contact-modal'>Required name, email and phone</DialogTitle>
      <DialogContent onChange={handleFormChange}>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            id="name"
            placeholder='name'
            type='text'
            ref={nameRef}
            fullWidth
            defaultValue={defaultName}
          />
          <TextField
            required
            id="email"
            placeholder='email'
            type='email'
            ref={emailRef}
            fullWidth
            defaultValue={defaultEmail}

          />
          <TextField
            id="phone"
            placeholder='phone (with code)'
            type='tel'
            ref={phoneRef}
            fullWidth
            defaultValue={defaultPhone}

          />
          <DialogActions>
            <Button

              variant="contained" size="large"
              type='submit'
              fullWidth
              disabled={isSubmitDisable}
            >
              {buttonText}
            </Button>

          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>


  );
};
export default ContactModal;
