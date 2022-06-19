import { FC, useState } from 'react';
import { tagColor } from '../data/tag';
import { Sentence } from '../types/paper';

interface Radio {
  data: tagColor;
  sentence: Sentence;
  dataName: string;
}

const Radio: FC<Radio> = ({ data, sentence, dataName }) => {
  const isChecked = data.tag == sentence.tag ? true : false;
  let badgeColor;

  if (data.color == 'warning') {
    badgeColor = 'badge-warning';
  } else if (data.color == 'info') {
    badgeColor = 'badge-info';
  } else if (data.color == 'primary') {
    badgeColor = 'badge-primary';
  } else if (data.color == 'success') {
    badgeColor = 'badge-success';
  } else if (data.color == 'accent') {
    badgeColor = 'badge-accent';
  } else if (data.color == 'neutral') {
    badgeColor = 'badge-neutral';
  } else {
    badgeColor = 'badge-error';
  }

  return (
    <div className='form-control'>
      <label className='label cursor-pointer'>
        <input
          type='radio'
          className={`radio`}
          checked={isChecked}
          name={dataName}
        />
        <span className='label-text ml-2'>
          <div className={`badge badge-${data.color}`}>{data.tag}</div>
        </span>
      </label>
    </div>
  );
};

export default Radio;
