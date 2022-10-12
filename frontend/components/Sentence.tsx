import { FC } from 'react';
import { Sentence } from '../types/paper';

interface SentenceInterface {
  data: Sentence;
  colored?: boolean;
}

const Sentence: FC<SentenceInterface> = ({ data, colored }) => {
  let textColor;

  if (data.tag == 'Claim') {
    textColor = 'bg-warning';
  } else if (data.tag == 'Method') {
    textColor = 'bg-info';
  } else if (data.tag == 'Result') {
    textColor = 'bg-primary text-white';
  } else if (data.tag == 'Conclusion') {
    textColor = 'bg-success';
  } else if (data.tag == 'Method/Result') {
    textColor = 'bg-accent';
  } else if (data.tag == 'Other') {
    textColor = 'bg-neutral text-white';
  } else {
    textColor = 'bg-error';
  }

  return (
    <span>
      <span className={colored ? textColor : ''}>{data.sent}</span>
      <span> </span>
    </span>
  );
};

export default Sentence;
