import {CardContent, Typography} from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Link } from 'react-router-dom';

type CardType = {
  id: string,
  name: string,
  email: string,
  phone: string
}

const ContactCard = ({card} : {card: CardType}) => {

  const { id, name, email, phone } = card;

  return (
    <CardContent>
      <Typography sx={{ fontSize: 20 }} gutterBottom>
        Name: <b>{name}</b>
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Email: <b>{email}</b>
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Phone number: <b>{phone}</b>
      </Typography>
      <Typography sx={{ mb: 1 }} color="text.secondary">
        <Link to={`/contacts/${id}`} style={{display: 'flex', color: '#1976d2', textDecoration: 'none'}}>to contact page <DoubleArrowIcon /></Link>

      </Typography>
    </CardContent>
  );
};

export default ContactCard;
