import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { useGetContactsQuery } from '../../store/contacts-api/contacts-api';
import ContactCard from '../contact-card/contact-card';
import { useDebounce } from '../../hooks/use-debounce';
import { getSearchValue } from '../../store/store';
import { AppPath, StatusCode } from '../../const';
import { ScaleLoader } from 'react-spinners';


const ContactsSection = () => {

  const search = useSelector(getSearchValue);
  const navigate = useNavigate();

  const debounceSearch = useDebounce(search);

  const { data, isError, isLoading, error} = useGetContactsQuery(debounceSearch);

  useEffect(() => {
    if (isError) {
      if((error as {status: number}).status === StatusCode.NotAuth) {
        navigate(AppPath.Auth);
      }
    }
  }, [isError, error, navigate]);


  if (isError) {
    return (
      <main className='main'>
        <Typography sx={{ minWidth: 100, fontSize:'51px', textAlign: 'center' }}>
          Error !
        </Typography>
      </main>
    );
  }

  if (isLoading || !data) {
    return (
      <main className='main'>
        <Typography sx={{ minWidth: 100, fontSize:'51px', textAlign: 'center' }}>
          Loading ...
        </Typography>
        <ScaleLoader color='black' loading height={300} width={40} radius={5} margin={20} />
      </main>
    );
  }

  if (!data.length) {
    return (
      <main className='main'>
        <Typography sx={{ minWidth: 100, fontSize:'21px', textAlign: 'center' }}>
          Sorry... can not find contacts with: {debounceSearch}
        </Typography>
      </main>
    );
  }


  const cardElements = data.map((item) => <ContactCard key={item.id} contact={item}/>);

  return (
    <Grid container justifyContent={'start'} spacing={2} p={4}>
      {cardElements}
    </Grid>
  );
};

export default ContactsSection;
