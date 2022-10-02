import { useSelector } from 'react-redux';
import { useGetContactsQuery } from '../../store/contacts-api/contacts-api';
import useDebounce from '../../hooks/use-debounce';
import { ReducerName, ReducerType } from '../../store/store';
import ContactCard from '../contact-card/contact-card';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AppPath, StatusCode } from '../../const';


const ContactsSection = () => {

  const search = useSelector((state: ReducerType) => state[ReducerName.Search].search);
  const navigate = useNavigate();

  const debounceSearch = useDebounce(search);


  const { data, isError, isFetching, error} = useGetContactsQuery(debounceSearch);


  useEffect(() => {
    if (isError) {
      if((error as {status: number}).status === StatusCode.NotAuth) {
        navigate(AppPath.Auth);
      }
    }
  }, [isError, error, navigate]);


  if (isError) {
    return <main><h1>Error!</h1></main>;
  }

  if (isFetching || !data) {
    return <main><h1>Loading</h1></main>;
  }


  const cardElements = data.map((item) => <ContactCard key={item.id} contact={item}/>);

  return (
    <Grid container justifyContent={'start'} spacing={2}>
      {cardElements}
    </Grid>
  );
};

export default ContactsSection;
