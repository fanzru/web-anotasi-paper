import { FC } from 'react';
import { Field, FieldValue, useFormContext, UseFormSetValue } from 'react-hook-form';
import { tagColor } from '../data/tag';
import { Sentence } from '../types/paper';
import { useState, useEffect} from 'react';

interface Radio {
  data: tagColor;
  sentence: Sentence;
  dataRegister: string;
}

const Radio: FC<Radio> = ({data, sentence, dataRegister }) => {
  const methods = useFormContext();
  const {getValues}= methods;
 
  useEffect(() => {

    console.log("----",getValues(`${dataRegister}`))
    console.log(`${dataRegister}.tag`)
    console.log("======================================= ")
    console.log(`#data.tag     : ${data.tag}`)
    console.log(`#sentance.tag : ${sentence.tag}`)
  })
  return (
    <div className='form-control'>
      <label className='label cursor-pointer'>
        <input
          type='radio'
          className={`radio`}
          {...methods.register(dataRegister)}
          // onChange={handler}
          value={data.tag}
          defaultChecked={getValues(`${dataRegister}`)== undefined ? data.tag === sentence.tag : data.tag == getValues(`${dataRegister}.tag`)}
        />
        <span className='label-text ml-2'>
          <div className={`badge badge-${data.color}`}>{data.tag}</div>
        </span>
      </label>
    </div>
  );
};

export default Radio;
