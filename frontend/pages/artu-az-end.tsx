import Layout from '@/components/Layout';
import { isTokenValid } from '@/lib/tokenValidate';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const EndSection = () => {
  const router = useRouter();

  useEffect(() => {
    const Check = async () => {
      const user = await isTokenValid();
      if (!user) return router.push('/login');
    };
    Check();
  }, []);
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
          <Link href={'/profile'}>
            <a className='btn btn-primary'>go to profile</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default EndSection;
