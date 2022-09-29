import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../header/header';
import AuthPage from '../../pages/auth-page/auth-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import RegistrationPage from '../../pages/registration-page/registration-page';
import Private from '../../pages/private/private';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const enum AppPath {
  Auth = '/auth',
  Registration = '/registration',
  Contacts = '/',
}


function App(): JSX.Element {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <BrowserRouter>
          <ToastContainer/>
          <Header/>

          <Routes>
            <Route path={AppPath.Auth} element={<AuthPage/>} />
            <Route path={AppPath.Registration} element={<RegistrationPage/>} />
            <Route path={AppPath.Contacts} element={<Private><ContactsPage/></Private>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>

  );
}

export default App;
