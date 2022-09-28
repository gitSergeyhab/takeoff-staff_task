import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useDebounce from '../../hooks/use-debounce';
import { ReducerName, ReducerType } from '../../store/store';
import { ContactType } from '../../types/types';
import {Button} from '@mui/material';
import ContactCard from '../../components/contact-card/contact-card';
import SearchPanel from '../../components/search-panel/search-panel';


const BASE_URL = 'http://localhost:5000/api/';


const createAPI = () => {
  const api = axios.create({baseURL: BASE_URL});
  return api;
};


const api = createAPI();


const fetchContacts = async(setResult: (data: ContactType[]) => void, search = '') => {
  try {
    const result = await api.get<ContactType[]>(`/contacts?q=${search}`);
    const {data} = result;
    setResult(data);
  } catch (err) {
    setResult([]);
  }

};

const addNewContact = async() => {
  try {
    await api.post<ContactType[]>('/contacts', {data: {name: 'new', email: 'new', phone: '33-33-33-33-33'}});

  } catch (err) {
    throw new Error('Error');
  }

};

const ContactsPage = () => {

  const search = useSelector((state: ReducerType) => state[ReducerName.Search].search);

  const debounceSearch = useDebounce(search);

  const [contacts, setContacts] = useState<ContactType[]>([]);

  useEffect(() => {
    fetchContacts(setContacts, debounceSearch);
  }, [debounceSearch]);

  const contactsElement = contacts.map((item) => <ContactCard key={item.id} card={item}/>);

  const searchElement = search || 'no search element';

  const handleBtnClick = () => addNewContact();


  return (
    <main>
      <SearchPanel/>
      Search Element: {searchElement}
      <Button color='secondary' variant="text" onClick={handleBtnClick}>Text</Button>
      <button type='button' onClick={handleBtnClick}> button </button>
      <section style={{display: 'flex', flexWrap:'wrap', justifyContent: 'start', padding: '5% 10%'}}>

        {contactsElement}

      </section>

    </main>
  );
};

export default ContactsPage;
