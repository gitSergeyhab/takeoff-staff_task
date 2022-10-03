import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthPage from '../../pages/auth-page/auth-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import Header from '../header/header';
import NotFoundPage from '../../pages/error-page/error-page';
import Private from '../../pages/private/private';
import RegistrationPage from '../../pages/registration-page/registration-page';
import { checkAuth } from '../../store/api-actions';
import { AppPath } from '../../const';

import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

function App(): JSX.Element {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);


  return (
    <BrowserRouter>
      <ToastContainer/>
      <Header/>
      <Routes>
        <Route path={AppPath.Auth} element={<AuthPage/>} />
        <Route path={AppPath.Registration} element={<RegistrationPage/>} />
        <Route path={AppPath.Contacts} element={<Private><ContactsPage/></Private>} />
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App ;
