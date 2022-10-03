import { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useDeleteContactMutation } from '../../store/contacts-api/contacts-api';
import ContactModal from '../modal/modal';
import { ContactType } from '../../types/types';
import { Message } from '../../const';


const ContactCard = ({contact} : {contact: ContactType}) => {

  const [isModalOpened, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const [deleteContact] = useDeleteContactMutation();

  const { id, name, email, phone } = contact;

  const handleDeleteContactClick = async() => {
    await deleteContact(id).unwrap()
      .then(() => toast.success(Message.DeleteSuccess))
      .catch(() => toast.error(Message.DeleteError));
  };


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

      <Button variant="outlined" color="primary" size='small' fullWidth onClick={handleModalOpen}>
          Change Contact
      </Button>
      <ContactModal handleClose={handleModalClose} open={isModalOpened} contact={contact}/>
    </Grid>
  );
};

export default ContactCard;
