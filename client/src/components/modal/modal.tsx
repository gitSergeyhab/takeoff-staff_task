import { Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions } from '@mui/material';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { usePostContactMutation, usePutContactMutation } from '../../store/contacts-api/contacts-api';
import { ContactType } from '../../types/types';


const getValueFromInput = (ref: React.RefObject<HTMLInputElement>): string => ref.current?.querySelector('input')?.value || '';

type ContactModalProps = {
  handleOpen: () => void,
  handleClose: () => void,
  open: boolean,
  contact: ContactType | null
}


const ContactModal = ({handleOpen, contact, handleClose, open}: ContactModalProps) => {

  const [postContact, {isError: postError, isSuccess: postSuccess}] = usePostContactMutation();
  const [putContact, {isError: putError, isSuccess: putSuccess}] = usePutContactMutation();


  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const getFomValues = () => ({name: getValueFromInput(nameRef), email: getValueFromInput(emailRef), phone: getValueFromInput(phoneRef)});

  // const [errorMessage, setErrorMessage] = useState('errorMessage');
  const [isSubmitDisable, setSubmitDisable] = useState(true);

  const handleSubmit:FormEventHandler = async (evt) => {
    evt.preventDefault();
    const {email, name, phone} = getFomValues();
    if (contact) {
      await putContact({body: {email, name, phone}, id: contact.id });
    } else {
      await postContact({name, email, phone});
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

  useEffect(() => {
    if (postError) {toast.error('cannot add this contact');}
    if (postSuccess) {toast.success('this contact was added');}
    if (putError) {toast.error('cannot change this contact');}
    if (putSuccess) {toast.success('this contact was changed');}

  }, [postError, postSuccess, putError, putSuccess]);

  useEffect(() => {
    if (postSuccess || putSuccess) {
      handleClose();
    }
  });


  return (
    <Dialog open={open} onClose={handleClose} aria-describedby={'contact-modal'}>
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
            placeholder='phone'
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

        {/* <Typography textAlign={'center'} color='red' paddingTop={2}>{errorMessage}</Typography> */}

      </DialogContent>
    </Dialog>


  );
};
export default ContactModal;
