import Card from '@/components/Card';
import CardCollapse from '@/components/CardCollapse';
import Layout from '@/components/Layout';
import { axiosInstance } from '@/lib/axios';
import { selectLongSumValue } from '@/redux/longSummarizeSlice';
import { selectUserSumValue } from '@/redux/userSummarizeSlice';
import { dataExport } from '@/types/paper';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

const Compare = () => {
  const { register, handleSubmit } = useForm();
  const [random, setRandom] = useState<number>(0);
  const userSumValue: dataExport[] = useSelector(selectUserSumValue);
  const longSumValue: dataExport[] = useSelector(selectLongSumValue);
  const cookie = new Cookies();
  const authToken = cookie.get('token');

  const onSubmit = handleSubmit(async (data) => {
    // console.log(userSumValue);
    // console.log(longSumValue);
    
    const ReqBody = {
      user_paper_id: userSumValue[0].user_paper_id,
      selected_summary: data.summary,
      comment_selected_summary: data.comment,
      user_summary: userSumValue,
      longsumm_summary: longSumValue,
    };
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    console.log(ReqBody);
    

    const res = await toast.promise(
      axiosInstance.post(`/api/tuwien/user-longsumm/submit`, ReqBody, config),
      {
        pending: 'Loading..',
        success: 'Upload Success!',
        error: 'Upload Failed!',
      }
    );

    if (res.data.status) {
      console.log(res.data.value);

      // dispatch(changeLongSumValue(res.data.value));
      // router.push('/paper-compare');
    }
  });

  type DummyProps = {
    data: number;
    type: string;
    text: string;
    value: dataExport[];
  };

  const Dummy: DummyProps[] = [
    { data: 0, type: 'user', text: 'Ini data user', value: userSumValue },
    {
      data: 1,
      type: 'longsumm',
      text: 'Ini data longsumm',
      value: longSumValue,
    },
  ];

  useEffect(() => {
    setRandom(Math.random() >= 0.5 ? 1 : 0);
  }, []);

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
                    value={Dummy[random].type}
                    defaultChecked
                    {...register('summary')}
                  />
                  <span className='label-text ml-2'>Summary A</span>
                </label>
              </div>
              <div className='form-control items-start mb-2'>
                <label className='label cursor-pointer'>
                  <input
                    type='radio'
                    className={`radio`}
                    value={random === 0 ? Dummy[1].type : Dummy[0].type}
                    {...register('summary')}
                  />
                  <span className='label-text ml-2'>Summary B</span>
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
          <CardCollapse title={`Summary A`}>{Dummy[random].text}</CardCollapse>

          <CardCollapse title={'Summary B'}>
            {random === 0 ? Dummy[1].text : Dummy[0].text}
          </CardCollapse>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
