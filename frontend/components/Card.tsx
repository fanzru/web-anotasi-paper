import { selectPaperValue } from '@/redux/paperSlice';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

interface CardInterface {
  title: string;
  children: ReactNode;
  numSection?: number;
}

const Card: FC<CardInterface> = ({ title, children, numSection }) => {
  const methods = useFormContext();
  const { pathname } = useRouter();

  const paperValue = useSelector(selectPaperValue);
  const Sections =
    paperValue &&
    paperValue.sections?.filter(
      (section) => section.selected_sentences.length > 0
    );

  return (
    <div className='w-full border-2 border-gray-300 rounded-lg mb-6'>
      <div className='w-full min-h-[50px] items-center flex h-full bg-gray-100 px-5 rounded-t-lg font-medium'>
        <div className='flex flex-col items-start py-1'>
          <p className='ml-1'>{title}</p>
          {pathname === '/paper-anotation' ? (
            <div className='form-control'>
              {Sections &&
                Sections.map((section) => {
                  if (numSection === Sections.indexOf(section)) {
                    return (
                      <label
                        className='cursor-pointer label'
                        key={Sections.indexOf(section)}
                      >
                        <input
                          type='checkbox'
                          className='checkbox checkbox-sm mr-2'
                          {...methods.register(
                            `section_name.${numSection}.wrongextracted`
                          )}
                        />
                        <span className='label-text badge badge-error'>
                          Wrong extracted heading
                        </span>
                      </label>
                    );
                  }
                })}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className='p-5'>{children}</div>
    </div>
  );
};

export default Card;
