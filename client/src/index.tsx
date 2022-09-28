import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { setUserAction } from './store/actions';
import { store } from './store/store';
import { getUserFromStorage } from './utils/storage-utils';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const user = getUserFromStorage();

store.dispatch(setUserAction(user));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
);
