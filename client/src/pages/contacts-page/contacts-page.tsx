import SearchPanel from '../../components/search-panel/search-panel';
import ContactsSection from '../../components/contacts-section/contacts-section';
import { Container } from '@mui/material';
import ContactModal from '../../components/modal/modal';
import { useState } from 'react';
import NewContactBtn from '../../components/new-contact-btn/new-contact-btn';


const ContactsPage = () => {

  const [isModalOpened, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <SearchPanel/>
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2}}>
        <NewContactBtn handleOpen={handleModalOpen}/>
        <ContactModal handleClose={handleModalClose} open={isModalOpened} contact={null}/>
        <ContactsSection/>
      </Container>
    </>
  );};

export default ContactsPage;
