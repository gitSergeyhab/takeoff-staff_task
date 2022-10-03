import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUser } from '../../store/store';

const Private = ({children} : {children: JSX.Element}) => {

  const user = useSelector(getUser);

  useEffect(() => {
    if (!user) {
      toast.warning('the page "contacts" is not available to unauthorized users');
    }

  });

  return user ? children : <Navigate to={'/auth'}/>;
};

export default Private;
