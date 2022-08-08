import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { axiosInstance } from '../lib/axios';
import { isTokenValid } from '../lib/tokenValidate';

type Login = {
  name: string;
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const cookie = new Cookies();
  const authToken = cookie.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

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
        cookie.set('token', auth.data.value);
        router.push('/anotation');
      }
    } catch (e) {
      console.log(e);
    }
  });

  useEffect(() => {
    const checkValidate = async () => {
      if (!authToken) return router.push('/login');
      if (await isTokenValid()) return router.push('/paper-anotation');
    };
    checkValidate();
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
            Belum punya akun?{' '}
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
