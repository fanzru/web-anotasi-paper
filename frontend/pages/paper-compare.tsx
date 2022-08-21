import Card from '@/components/Card';
import CardCollapse from '@/components/CardCollapse';
import Layout from '@/components/Layout';
import React from 'react';
import { useForm } from 'react-hook-form';

const Compare = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <Layout>
      <div className='mt-24 px-5'>
        <div className='flex w-3/5 mx-auto flex-col'>
          <Card title={'Summary Rating'}>
            <form onSubmit={onSubmit}>
              <h3 className='text-lg font-medium mb-2'>
                After reading the generated summaries, please choose which
                summary gives a better overview of the article and write down
                any comments you have. Then submit your answer.
              </h3>
              <div className='form-control items-start'>
                <label className='label cursor-pointer'>
                  <input
                    type='radio'
                    className={`radio`}
                    value={'longsumm'}
                    {...register('summary')}
                  />
                  <span className='label-text ml-2'>Summary with Longsumm</span>
                </label>
              </div>
              <div className='form-control items-start mb-2'>
                <label className='label cursor-pointer'>
                  <input
                    type='radio'
                    className={`radio`}
                    value={'user'}
                    {...register('summary')}
                  />
                  <span className='label-text ml-2'>Summary with User</span>
                </label>
              </div>
              <div className='form-control mb-2'>
                <textarea
                  className='textarea textarea-bordered'
                  placeholder='Write your comment here'
                  {...register('comment')}
                />
              </div>
              <button className='btn btn-primary'>Submit</button>
            </form>
          </Card>
          <CardCollapse title={'Summary With Longsumm'}>
            Summary with Longsumm
          </CardCollapse>
          <CardCollapse title={'Summary With User'}>
            Summary With User
          </CardCollapse>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
