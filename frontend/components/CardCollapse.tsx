import { FC, ReactNode } from 'react';

interface CardCollapse {
  title: String;
  children: ReactNode;
}

const CardCollapse: FC<CardCollapse> = ({ title, children }) => {
  return (
    <div className='my-w collapse w-full border rounded-md border-base-300 collapse-arrow mb-6'>
      <input type='checkbox' />
      <div className='collapse-title text-xl font-medium'>{title}</div>
      <div className='collapse-content'>{children}</div>
    </div>
  );
};

export default CardCollapse;
