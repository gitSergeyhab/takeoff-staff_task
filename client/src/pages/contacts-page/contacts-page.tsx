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
    <main>
      <SearchPanel/>
      <Container>
        <div style={{display:'flex', justifyContent:'center', paddingTop: '20px'}}>
          <NewContactBtn handleOpen={handleModalOpen}/>
          <ContactModal handleClose={handleModalClose} handleOpen={handleModalOpen} open={isModalOpened} contact={null}/>
        </div>
        <ContactsSection/>
      </Container>
    </main>
  );};

export default ContactsPage;
