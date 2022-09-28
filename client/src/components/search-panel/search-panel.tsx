import { ChangeEventHandler } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ReducerName, ReducerType } from '../../store/store';
import { addSearchAction } from '../../store/actions';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '40ch',
      },
    },
    [theme.breakpoints.up('md')]: {
      width: '40ch',
      '&:focus': {
        width: '60ch',
      },
    },
  },
}));

const SearchPanel = () => {

  const defaultSearchValue = useSelector((state: ReducerType) => state[ReducerName.Search].search);
  const dispatch = useDispatch();


  const setSearch = (value: string) => {
    if (value) {
      dispatch(addSearchAction(value));
    } else {
      dispatch(addSearchAction(''));
    }
  };

  const handleSearchInput: ChangeEventHandler<HTMLInputElement> = (evt) => setSearch(evt.currentTarget.value);


  const x = 'x';
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Contact Search {x}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>


            <StyledInputBase
              placeholder="Search… name or email"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchInput}
              defaultValue={defaultSearchValue}
            />

          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};


export default SearchPanel;
