import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';

const EndSection = () => {
  return (
    <Layout>
      <div className='flex flex-col items-center justify-center h-screen w-full'>
        <Image
          alt='doodle'
          src='/vector.svg'
          priority
          width={300}
          height={300}
        />
        <p className='text-xl font-medium'>Thanks For Your Contribute</p>
        <div className='flex mt-4 gap-3'>
          <Link href={'/anotation'}>
            <a className='btn'>back to anotate paper</a>
          </Link>
          <Link href={'/anotation'}>
            <a className='btn btn-primary'>go to profile</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default EndSection;
