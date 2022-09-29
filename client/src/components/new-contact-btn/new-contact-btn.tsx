import { Button } from '@mui/material';


const NewContactBtn = ({handleOpen} : {handleOpen : () => void}) => <Button variant='outlined' onClick={handleOpen}>New Contact</Button>;

export default NewContactBtn;
