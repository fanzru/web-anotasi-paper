import BeforeLoad from '@/components/BeforeLoad';
import Layout from '@/components/Layout';
import { axiosInstance } from '@/lib/axios';
import { removeStrip } from '@/lib/removeSpace';
import { selectPaperValue } from '@/redux/paperSlice';
import { PaperProfile, Profile } from '@/types/profil';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

const Profile = () => {
  const paperValue = useSelector(selectPaperValue);
  const [dataUser, setDataUser] = useState<Profile>();
  const backPath =
    Object.keys(paperValue).length === 0 ? '/anotation' : '/paper-anotation';
  const cookie = new Cookies();
  const token = cookie.get('token');

  const getProfil = () => {
    axiosInstance
      .get('/api/user/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataUser(res.data.value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProfil();
  }, []);

  console.log(dataUser);

  return (
    <Layout>
      <BeforeLoad />
      <div className='flex justify-center h-screen'>
        <div className='mt-24 flex flex-col md:flex-row max-width-component w-full px-5 gap-5'>
          <div className='w-full md:w-1/3 flex flex-col'>
            <div>
              <Link href={backPath}>
                <a className='btn btn-ghost group mb-5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 -translate-x-2 group-hover:-translate-x-1 transition'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11 17l-5-5m0 0l5-5m-5 5h12'
                    />
                  </svg>
                  <span>Kembali</span>
                </a>
              </Link>
            </div>
            <p className='text-4xl mb-10'>{dataUser?.name}</p>
            <div className='h-24 w-24 bg-green-800 flex items-center justify-center rounded-full mb-5'>
              <p className='text-white text-4xl'>{'AN'}</p>
            </div>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='text'
                value={dataUser?.email}
                className='input input-bordered w-full max-w-xs'
              />
            </div>
          </div>
          <div className='w-full md:w-2/3 flex flex-col'>
            <div className='overflow-x-auto'>
              <table className='table w-full'>
                <thead>
                  <tr>
                    <th></th>
                    <th>Nama Paper</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dataUser?.list_papers?.map((data: PaperProfile) => {
                    return (
                      <tr>
                        <th>1</th>
                        <td>{removeStrip(data.paper_name)}</td>
                        <td>
                          <div className='flex gap-2'>
                            <button className='btn btn-primary btn-xs gap-1 mr-2'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-4 w-4'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth='2'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                />
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                />
                              </svg>
                              Detail
                            </button>
                            <Link href={data.link_pdf}>
                              <a
                                className='btn btn-secondary btn-xs gap-1'
                                target={'_blank'}
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-4 w-4'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke='currentColor'
                                  strokeWidth='2'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                                  />
                                </svg>
                                show pdf
                              </a>
                            </Link>
                            <button className='btn btn-warning btn-xs gap-1'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-4 w-4'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                              >
                                <path
                                  fill-rule='evenodd'
                                  d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                                  clip-rule='evenodd'
                                />
                              </svg>
                              user summary
                            </button>
                            <button className='btn btn-warning btn-xs gap-1'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-4 w-4'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                              >
                                <path
                                  fill-rule='evenodd'
                                  d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                                  clip-rule='evenodd'
                                />
                              </svg>
                              long summary
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
