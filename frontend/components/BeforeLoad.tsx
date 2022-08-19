import { selectPaperValue } from '@/redux/paperSlice';
import { Beforeunload } from 'react-beforeunload';
import { useSelector } from 'react-redux';

const BeforeLoad = () => {
  const paperValue = useSelector(selectPaperValue);

  if (Object.keys(paperValue).length === 0) return null;
  else return <Beforeunload onBeforeunload={(e) => e.preventDefault()} />;
};

export default BeforeLoad;
