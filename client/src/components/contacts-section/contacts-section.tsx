import { useSelector } from 'react-redux';
import { useGetContactsQuery } from '../../store/contacts-api/contacts-api';
import useDebounce from '../../hooks/use-debounce';
import { ReducerName, ReducerType } from '../../store/store';
import ContactCard from '../contact-card/contact-card';
import { Grid } from '@mui/material';


const ContactsSection = () => {
  // console.log('ContactsSection');

  const search = useSelector((state: ReducerType) => state[ReducerName.Search].search);

  const debounceSearch = useDebounce(search);


  const { data, isError, isFetching } = useGetContactsQuery(debounceSearch);


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
