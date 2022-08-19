import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

const Navbar = () => {
  const router = useRouter();
  const cookie = new Cookies();

  const Logout = async () => {
    cookie.remove('token');
    toast.success('Berhasil Logout!');
    router.push('/login');
  };

  return (
    <div className='navbar bg-base-300 px-5 fixed top-0'>
      <div className='flex-1'>
        <a className='btn btn-ghost normal-case text-lg'>Anotation Paper</a>
      </div>
      <div className='flex-none gap-4'>
        <button className='btn btn-primary'>Download Progress</button>

        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost rounded-btn'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              stroke-width='2'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4'
          >
            <li>
              <Link href={'/profile'}>
                <a>Profil</a>
              </Link>
            </li>
            <li onClick={Logout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
