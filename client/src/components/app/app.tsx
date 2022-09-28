import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../header/header';
import AuthPage from '../../pages/auth-page/auth-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import OneContactPage from '../../pages/one-contact-page/one-contact-page';
import RegistrationPage from '../../pages/registration-page/registration-page';


const enum AppPath {
  Auth = '/auth',
  Registration = '/registration',
  Contacts = '/',
  Contact = '/:id'
}


function App(): JSX.Element {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path={AppPath.Auth} element={<AuthPage/>} />
            <Route path={AppPath.Registration} element={<RegistrationPage/>} />
            <Route path={AppPath.Contacts} element={<ContactsPage/>} />
            <Route path={AppPath.Contact} element={<OneContactPage/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>

  );
}

export default App;
