import { selectPaperValue } from '@/redux/paperSlice';
import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  const paperValue = useSelector(selectPaperValue);
  console.log(paperValue);

  return (
    <>
      <Layout>
        <div>tes</div>
      </Layout>
    </>
  );
};

export default Home;
