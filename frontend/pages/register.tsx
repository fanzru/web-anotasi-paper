const Register = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title text-3xl mb-5'>Register</h2>
          <form>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Nama</span>
              </label>
              <input
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full max-w-xs'
              />
            </div>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                placeholder='Type here'
                className='input input-bordered w-full max-w-xs'
              />
            </div>
            <div className='form-control w-full max-w-xs'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type='password'
                placeholder='Type here'
                className='input input-bordered w-full max-w-xs'
              />
            </div>
            <div className='mt-3 card-actions justify-end'>
              <button className='btn btn-primary'>Register</button>
            </div>
          </form>
          <p>
            Sudah punya akun? <a className='link'>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
