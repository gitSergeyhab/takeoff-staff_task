import { useParams } from 'react-router-dom';

const OneContactPage = () => {
  const page = 'OneContactPage';

  const {id} = useParams();


  return (
    <main>{page} / {id}</main>
  );
};

export default OneContactPage;
