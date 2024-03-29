import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { axiosInstance } from '../lib/axios';
import { isTokenValid } from '../lib/tokenValidate';
import { useRouter } from 'next/router';

type LoginType = {
  name: string;
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      toast.dismiss();
      const auth = await toast.promise(
        axiosInstance.post('/api/user/login', {
          ...data,
        }),
        {
          pending: 'Loading..',
          success: 'Login Success!',
          error: 'Login Failed!',
        }
      );

      if (auth?.data.status) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', auth.data.value);
        }
        router.push('/anotation');
      }
    } catch (e) {
      console.log(e);
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('token');
      const checkValidate = async () => {
        if (!authToken) return router.push('/login');
        if (await isTokenValid()) return router.push('/anotation');
      };
      checkValidate();
    }
  }, []);

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title text-3xl mb-5'>Login</h2>
          <form onSubmit={onSubmit}>
            <div>
              <label className='label'>
                <span className='label-text'>Email</span>
                {errors.email && (
                  <span className='label-text-alt text-error'>
                    {errors.email?.message}
                  </span>
                )}
              </label>
              <input
                type='email'
                placeholder='Type here'
                className='input input-bordered w-full max-w-xs'
                {...register('email', {
                  required: 'Email is Required',
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>
            <div>
              <label className='label'>
                <span className='label-text'>Password</span>
                {errors.password && (
                  <span className='label-text-alt text-error'>
                    {errors.password?.message}
                  </span>
                )}
              </label>
              <input
                type='password'
                placeholder='Type here'
                className='input input-bordered w-full max-w-xs'
                {...register('password', {
                  required: 'Password is Required',
                  min: 8,
                })}
              />
            </div>
            <div className='mt-3 card-actions justify-end'>
              <button type='submit' className='btn btn-primary'>
                Login
              </button>
            </div>
          </form>
          <p>
            Don't have account?{' '}
            <Link href='/register' passHref>
              <span className='link'>Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
