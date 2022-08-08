import Card from '@/components/Card';
import Layout from '@/components/Layout';

const Profile = () => {
  return (
    <Layout>
      <div className='flex justify-center h-screen'>
        <div className='mt-24 flex flex-col md:flex-row max-width-component w-full px-5 gap-5'>
          <div className='w-full md:w-1/3 flex flex-col'>
            <p className='text-4xl mb-10'>Reva Doni Aprilio</p>
            <div className='h-24 w-24 bg-green-800 flex items-center justify-center rounded-full mb-5'>
              <p className='text-white text-4xl'>RE</p>
            </div>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='text'
                value='aprilio842@gmail.com'
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
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>
                      <button className='btn btn-primary btn-xs gap-1 mr-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          stroke-width='2'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                          />
                        </svg>
                        Detail
                      </button>
                      <button className='btn btn-secondary btn-xs gap-1'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          stroke-width='2'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                          />
                        </svg>
                        show pdf
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>
                      <button className='btn btn-primary btn-xs gap-1 mr-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          stroke-width='2'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                          />
                        </svg>
                        Detail
                      </button>
                      <button className='btn btn-secondary btn-xs gap-1'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          stroke-width='2'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                          />
                        </svg>
                        show pdf
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>
                      <button className='btn btn-primary btn-xs gap-1 mr-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          stroke-width='2'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                          />
                        </svg>
                        Detail
                      </button>
                      <button className='btn btn-secondary btn-xs gap-1'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          stroke-width='2'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                          />
                        </svg>
                        show pdf
                      </button>
                    </td>
                  </tr>
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
