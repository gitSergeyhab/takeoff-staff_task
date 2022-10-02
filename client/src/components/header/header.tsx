import {useState} from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

import './header.scss';
import { useSelector } from 'react-redux';
import { ReducerName, ReducerType } from '../../store/store';
import { useDispatch } from 'react-redux';
import { removeUserAction } from '../../store/actions';
import { removeUserFromStorage } from '../../utils/storage-utils';
import { AppPath } from '../../const';


const Header = () => {

  const user = useSelector((state: ReducerType) => state[ReducerName.User].user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    removeUserFromStorage();
    dispatch(removeUserAction());
  };

  return (
    <header className='header'>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', gap: '14px' }}>

        <Typography sx={{ minWidth: 100, fontSize:'21px' }}><Link className='header__link' to={AppPath.Contacts}>Contacts</Link></Typography>
        <Typography sx={{ minWidth: 100, fontSize:'21px' }}><Link className='header__link' to={AppPath.Registration}>Registration</Link></Typography>


        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {
              user ?
                <Typography sx={{ minWidth: 100, fontWeight: 'bold', fontSize:'21px' }}> {user.email} </Typography> :
                <Typography sx={{ minWidth: 100, fontSize:'21px' }}><Link className='header__link' to={AppPath.Auth}>Login</Link></Typography>
            }


          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {
          user ? <MenuItem onClick={handleLogoutClick}> <Avatar /> Logout</MenuItem> : null
        }

      </Menu>
    </header>
  );
};

export default Header;

