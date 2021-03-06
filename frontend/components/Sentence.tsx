import { FC } from 'react';
import { Tag } from '../data/tag';
import { Sentence } from '../types/paper';

interface Sen {
  data: Sentence;
}

const Sentence: FC<Sen> = ({ data }) => {
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

  return <p className={textColor}>{data.sent}</p>;
};

export default Sentence;
