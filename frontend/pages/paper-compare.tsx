import Card from '@/components/Card';
import CardCollapse from '@/components/CardCollapse';
import Layout from '@/components/Layout';
import { axiosInstance } from '@/lib/axios';
import { isTokenValid } from '@/lib/tokenValidate';
import {
  changeLongSumValue,
  selectLongSumValue,
} from '@/redux/longSummarizeSlice';
import {
  changeUserSummValue,
  selectUserSumValue,
} from '@/redux/userSummarizeSlice';
import { dataExport } from '@/types/paper';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Compare = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [random, setRandom] = useState<number>(0);
  const userSumValue: dataExport[] = useSelector(selectUserSumValue);
  const longSumValue: dataExport[] = useSelector(selectLongSumValue);

  const dispatch = useDispatch();
  if (typeof window !== 'undefined') {
    var authToken = localStorage.getItem('token');
  }
  const onSubmit = handleSubmit(async (data) => {
    try {
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

      const res = await toast.promise(
        axiosInstance.post(`/api/tuwien/user-longsumm/submit`, ReqBody, config),
        {
          pending: 'Loading..',
          success: 'Upload Success!',
          error: 'Upload Failed!',
        }
      );

      if (res.data.status) {
        dispatch(changeUserSummValue([]));
        dispatch(changeLongSumValue([]));
        router.push('/artu-az-end');
      }
    } catch (err) {
      console.log(err);
    }
  });

  const UserManualDummy = userSumValue.map((section) => {
    return section.manual_label;
  });

  const LongManualDummy = longSumValue.map((section) => {
    return section.manual_label;
  });

  const UserManualName = UserManualDummy.filter((data, index) => {
    return UserManualDummy.indexOf(data) === index;
  });

  const LongManualName = LongManualDummy.filter((data, index) => {
    return LongManualDummy.indexOf(data) === index;
  });

  type DummyProps = {
    type: string;
    text: string;
    value: dataExport[];
    manual: string[];
  };

  const Dummy: DummyProps[] = [
    {
      type: 'user',
      text: 'Ini data user',
      value: userSumValue,
      manual: UserManualName,
    },
    {
      type: 'longsumm',
      text: 'Ini data longsumm',
      value: longSumValue,
      manual: LongManualName,
    },
  ];

  useEffect(() => {
    const Check = async () => {
      const user = await isTokenValid();
      if (!user) return router.push('/login');
    };
    Check();
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
          <CardCollapse title={`Summary A`}>
            {Dummy[random].manual.map((manual) => {
              return (
                <div className='mb-5'>
                  <p className='font-semibold text-lg'>{manual}</p>
                  <ul className='list-disc px-2 ml-3'>
                    {Dummy[random].value.map((DataSum) => {
                      if (manual === DataSum.manual_label)
                        return <li>{DataSum.sent}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
          </CardCollapse>

          <CardCollapse title={'Summary B'}>
            {random === 0
              ? Dummy[1].manual.map((section) => {
                  return (
                    <div className='mb-5'>
                      <p className='font-semibold text-lg'>{section}</p>
                      <ul className='list-disc px-2 ml-3'>
                        {Dummy[1].value.map((DataSum) => {
                          if (section === DataSum.manual_label)
                            return <li>{DataSum.sent}</li>;
                        })}
                      </ul>
                    </div>
                  );
                })
              : Dummy[0].manual.map((section) => {
                  return (
                    <div className='mb-5'>
                      <p className='font-semibold text-lg'>{section}</p>
                      <ul className='list-disc px-2 ml-3'>
                        {Dummy[0].value.map((DataSum) => {
                          if (section === DataSum.manual_label)
                            return <li>{DataSum.sent}</li>;
                        })}
                      </ul>
                    </div>
                  );
                })}
          </CardCollapse>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
