import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { tagColor } from '../data/tag';
import { Sentence } from '../types/paper';
import { useState } from 'react';

interface Radio {
  data: tagColor;
  sentence: Sentence;
  dataRegister: string;
}

const Radio: FC<Radio> = ({ data, sentence, dataRegister }) => {
  const methods = useFormContext();
  const [tagValue, setTagValue] = useState(sentence.tag);
  const handler = (e: any) => {
    setTagValue(e.target.value);
  };
  /*
    1. bikin state buat simpen si perubahan input dari radio
    2. bikin onChange di input pake local state
    3. masukin ke useEffect untuk setValue si react hook form
  
  */
  return (
    <div className='form-control'>
      <label className='label cursor-pointer'>
        <input
          type='radio'
          className={`radio`}
          {...methods.register(dataRegister)}
          // onChange={handler}
          // defaultChecked={data.tag == sentence.tag}
          
        />
        <span className='label-text ml-2'>
          <div className={`badge badge-${data.color}`}>{data.tag}</div>
        </span>
      </label>
    </div>
  );
};

export default Radio;
