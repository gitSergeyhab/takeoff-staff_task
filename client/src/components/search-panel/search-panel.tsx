import { ChangeEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, InputBase, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getSearchValue } from '../../store/store';
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

  const defaultSearchValue = useSelector(getSearchValue);
  const dispatch = useDispatch();

  const setSearch = (value: string) => dispatch(addSearchAction( value || '' ));

  const handleSearchInput: ChangeEventHandler<HTMLInputElement> = (evt) => setSearch(evt.currentTarget.value);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Contact Search
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              autoFocus
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


export default SearchPanel ;
