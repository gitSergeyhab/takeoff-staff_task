import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Toolbar, AppBar, Avatar, Menu, MenuItem, IconButton, Typography,Tooltip } from '@mui/material';
import { getUser } from '../../store/store';
import { removeUserAction } from '../../store/actions';
import { removeUserFromStorage } from '../../utils/storage-utils';
import { AppPath } from '../../const';

import './header.scss';


const Header = () => {
  const locate = useLocation();

  const user = useSelector(getUser);
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
    <header>
      <AppBar position="static" color={'transparent'}>
        <Toolbar sx={{ justifyContent: 'space-around' }}>

          <Typography sx={{ minWidth: 100, fontSize:'21px' }}>
            <Link className={`header__link ${locate.pathname === AppPath.Contacts ? 'header__link--active' : ''}`} to={AppPath.Contacts}>
              Contacts
            </Link>
          </Typography>
          <Typography sx={{ minWidth: 100, fontSize:'21px' }}>
            <Link className={`header__link ${locate.pathname === AppPath.Registration ? 'header__link--active' : ''}`} to={AppPath.Registration}>
              Registration
            </Link>
          </Typography>

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
                  <Typography sx={{ minWidth: 100, fontSize:'21px' }}>
                    <Link className={`header__link ${locate.pathname === AppPath.Auth ? 'header__link--active' : ''}`} to={AppPath.Auth}>
                      Login
                    </Link>
                  </Typography>
              }


            </IconButton>
          </Tooltip>
        </Toolbar>

      </AppBar>
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

