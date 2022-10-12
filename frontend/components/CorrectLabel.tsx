import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface CorrectLabelInterface {
  dataRegister: string;
}

const CorrectLabel: FC<CorrectLabelInterface> = ({ dataRegister }) => {
  const methods = useFormContext();

  return (
    <div className='my-2'>
      <label className='cursor-pointer flex items-center'>
        <input
          type='checkbox'
          className='checkbox checkbox-sm mr-2'
          {...methods.register(dataRegister)}
        />
        <p>Correct label</p>
      </label>
    </div>
  );
};

export default CorrectLabel;
