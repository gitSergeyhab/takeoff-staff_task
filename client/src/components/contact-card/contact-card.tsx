import {Button, Grid, Typography} from '@mui/material';
import { useDeleteContactMutation } from '../../store/contacts-api/contacts-api';
import ContactModal from '../modal/modal';
import { useEffect, useState } from 'react';
import { ContactType } from '../../types/types';
import { toast } from 'react-toastify';


const ContactCard = ({contact} : {contact: ContactType}) => {


  const [isModalOpened, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const [deleteContact, {isSuccess, isError}] = useDeleteContactMutation();

  const { id, name, email, phone } = contact;

  const handleDeleteContactClick = async() => {
    await deleteContact(id);
  };

  useEffect(() => {
    if (isError) {
      toast.error('cannot delete this contact');
    }
    if (isSuccess) {
      toast.success('this contact was deleted');
    }
  }, [isError, isSuccess]);


  return (
    <Grid item sm={6} xs={12} md={4}>
      <Typography sx={{ fontSize: 20 }} gutterBottom>
        Name: <b>{name}</b>
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Email: <b>{email}</b>
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Phone number: <b>{phone}</b>
      </Typography>
      <Button variant="outlined" color="error" size='small' fullWidth onClick={handleDeleteContactClick}>
          Delete Contact
      </Button>
      <Typography sx={{ mb: 1.5 }}></Typography>

      <Button variant="outlined" color="success" size='small' fullWidth onClick={handleModalOpen}>
          Change Contact
      </Button>
      <ContactModal handleClose={handleModalClose} handleOpen={handleModalOpen} open={isModalOpened} contact={contact}/>
    </Grid>
  );
};

export default ContactCard;
