import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ReducerName, ReducerType } from '../../store/store';

const Private = ({children} : {children: JSX.Element}) => {

  const user = useSelector((state: ReducerType) => state[ReducerName.User].user);

  return user ? children : <Navigate to={'/auth'}/>;
};

export default Private;
