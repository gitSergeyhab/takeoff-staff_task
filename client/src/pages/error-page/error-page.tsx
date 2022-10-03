import { Link } from 'react-router-dom';
import { Typography} from '@mui/material';
import { AppPath } from '../../const';


const NotFoundPage = () => (
  <main className={'main'}>
    <Typography variant="h1" textAlign={'center'} gutterBottom fontSize={40}>
          Error 404
    </Typography>
    <Typography variant="h2" textAlign={'center'} gutterBottom fontSize={30}>
          Page Not Found
    </Typography>
    <Typography variant="h2" textAlign={'center'} gutterBottom fontSize={30}>
      <Link to={AppPath.Contacts}>To Contacts</Link>
    </Typography>
  </main>
);

export default NotFoundPage;
