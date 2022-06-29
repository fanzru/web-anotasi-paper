import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../lib/axios';

type Register = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const result = await axiosInstance
      .post('/api/user/register', {
        ...data,
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(result?.data.status);
  });


  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title text-3xl mb-5'>Register</h2>
          <form onSubmit={onSubmit}>
            <div>
              <label className='label'>
                <span className='label-text'>Nama</span>
                {errors.name && (
                  <span className='label-text-alt text-error'>
                    {errors.name?.message}
                  </span>
                )}
              </label>
              <input
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full max-w-xs'
                {...register('name', { required: 'Name is Required' })}
              />
            </div>
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
                Register
              </button>
            </div>
          </form>
          <p>
            Sudah punya akun?{' '}
            <Link href='/login' passHref>
              <span className='link'>Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
