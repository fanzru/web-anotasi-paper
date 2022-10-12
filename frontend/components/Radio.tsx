import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { TagColor } from '../data/tag';
import { Sentence } from '../types/paper';

interface RadioInterface {
  data: TagColor;
  sentence: Sentence;
  dataRegister: string;
}

const Radio: FC<RadioInterface> = ({ data, sentence, dataRegister }) => {
  const methods = useFormContext();
  const { getValues } = methods;

  return (
    <div className='form-control'>
      <label className='label cursor-pointer'>
        <input
          type='radio'
          className={`radio`}
          {...methods.register(dataRegister)}
          value={data.tag}
          defaultChecked={
            getValues(`${dataRegister}`) == undefined
              ? data.tag === sentence.tag
              : data.tag == getValues(`${dataRegister}.tag`)
          }
        />
        <span className='label-text ml-2'>
          <div className={`badge ${data.color}`}>{data.tag}</div>
        </span>
      </label>
    </div>
  );
};

export default Radio;
