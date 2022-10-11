import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { tagColor } from '../data/tag';
import { Sentence } from '../types/paper';

interface Radio {
  data: tagColor;
  sentence: Sentence;
  dataRegister: string;
}

const Radio: FC<Radio> = ({ data, sentence, dataRegister }) => {
  const methods = useFormContext();

  return (
    <div className='form-control'>
      <label className='label cursor-pointer'>
        <input
          type='radio'
          className={`radio`}
          value={data.tag}
          defaultChecked={data.tag == sentence.tag}
          
          {...methods.register(dataRegister)}
        />
        <span className='label-text ml-2'>
          <div className={`badge badge-${data.color}`}>{data.tag}</div>
        </span>
      </label>
    </div>
  );
};

export default Radio;
