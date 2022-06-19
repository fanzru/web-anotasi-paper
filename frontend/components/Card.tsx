import { FC, ReactNode } from 'react';

interface Card {
  title: String;
  children: ReactNode;
}

const Card: FC<Card> = ({ title, children }) => {
  return (
    <div className='w-full border-2 border-gray-300 rounded-lg mt-6'>
      <div className='w-full h-[50px] bg-gray-100 flex items-center px-5 rounded-t-lg font-medium'>
        {title}
      </div>
      <div className='p-5'>{children}</div>
    </div>
  );
};

export default Card;
