import Card from '@/components/Card';
import CardCollapse from '@/components/CardCollapse';
import Layout from '@/components/Layout';
import { axiosInstance } from '@/lib/axios';
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
import Cookies from 'universal-cookie';

const Compare = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [random, setRandom] = useState<number>(0);
  const userSumValue: dataExport[] = useSelector(selectUserSumValue);
  const longSumValue: dataExport[] = useSelector(selectLongSumValue);
  const cookie = new Cookies();
  const authToken = cookie.get('token');
  const dispatch = useDispatch();

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
        console.log(res);
        router.push('/artuz-az-end');
        dispatch(changeUserSummValue([]));
        dispatch(changeLongSumValue([]));
      }
    } catch (err) {
      console.log(err);
    }
  });

  const UserData = [
    {
      user_paper_id: 4,
      paper_name: 'avc',
      section_name: 'Abstract',
      par_id: 0,
      sent_id: 'sent_0_0',
      automatic_label: 'Claim',
      manual_label: 'Claim',
      checked: true,
      correct_section_head: true,
      sent: 'In this paper, three methods of extracting single document summary by combining supervised learning with unsupervised learning are proposed.',
    },
    {
      user_paper_id: 4,
      paper_name: 'avc',
      section_name: 'Abstract',
      par_id: 0,
      sent_id: 'sent_0_1',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: true,
      correct_section_head: true,
      sent: 'The purpose of these three methods is to measure the importance of sentences by combining the statistical features of sentences and the relationship between sentences at the same time.',
    },
    {
      user_paper_id: 4,
      paper_name: 'avc',
      section_name: 'Abstract',
      par_id: 0,
      sent_id: 'sent_0_2',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: true,
      correct_section_head: true,
      sent: 'The first method uses supervised model and graph model to score sentences separately, and then linear combination of scores is used as the final score of sentences.',
    },
  ];

  const LongData = [
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 0,
      sent_id: 'sent_0_0',
      automatic_label: 'Claim',
      manual_label: 'Claim',
      checked: false,
      correct_section_head: false,
      sent: 'Nowadays, it is common to use Google for retrieving a list of thousands of web pages, but the user has to decide if a document is interesting only with the extracted text where the words of the request query appears.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 0,
      sent_id: 'sent_0_1',
      automatic_label: 'Claim',
      manual_label: 'Claim',
      checked: false,
      correct_section_head: false,
      sent: 'Therefore, it is necessary download and read each document until the user finds satisfactory information.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 0,
      sent_id: 'sent_0_2',
      automatic_label: 'Claim',
      manual_label: 'Claim',
      checked: false,
      correct_section_head: false,
      sent: 'It was unnecessary and time-consuming routine.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 0,
      sent_id: 'sent_0_3',
      automatic_label: 'Claim',
      manual_label: 'Claim',
      checked: false,
      correct_section_head: false,
      sent: 'In addition, there are a number of scenarios where automatic construction of such summaries is useful.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 0,
      sent_id: 'sent_0_4',
      automatic_label: 'Claim',
      manual_label: 'Claim',
      checked: false,
      correct_section_head: false,
      sent: 'These examples show that it is desirable that text summarization approaches work more in language and dominion independent way.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 0,
      sent_id: 'sent_0_5',
      automatic_label: 'Claim',
      manual_label: 'Claim',
      checked: false,
      correct_section_head: false,
      sent: 'An extractive summarization method only decides, for each sentence, whether or not it will be included in the summary.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 0,
      sent_id: 'sent_0_6',
      automatic_label: 'Claim',
      manual_label: 'Claim',
      checked: false,
      correct_section_head: false,
      sent: 'The main problem for generating an extractive automatic text summary is to detect the most relevant information in the source document.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 0,
      sent_id: 'sent_0_7',
      automatic_label: 'Claim',
      manual_label: 'Claim',
      checked: false,
      correct_section_head: false,
      sent: 'Although, some approaches claim being domain and language independent, they use some degree of language knowledge like lexical information [2], key-phrases [3] or golden samples for supervised learning approaches [4][5][6].',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 0,
      sent_id: 'sent_0_8',
      automatic_label: 'Claim',
      manual_label: 'Claim',
      checked: false,
      correct_section_head: false,
      sent: 'Furthermore, training on a specific domain tends to customize the extraction process to that domain, so the resulting classifier is not necessarily portable.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 0,
      sent_id: 'sent_0_9',
      automatic_label: 'Claim',
      manual_label: 'Claim',
      checked: false,
      correct_section_head: false,
      sent: 'In our opinion, these works present a high dominion and language dependence degree.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_0',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'In the last two decades, we have experienced an exponential increase in the electronic text information available for being query.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_1',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'The best example of the hugest and everincreased collection of documents most frequently querying is Internet, with millions of web documents.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_2',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'Thus, it is indispensable to develop automatic methods for detecting the most relevant content from a source document in order to show it as a summary.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_3',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'Other examples include automatic construction of summaries of news articles or email messages for sending them to mobile devices as SMS; summarization of information for government officials, businesspersons, researches, etc, and summarization of web pages to be shown on the screen of a mobile device, among many others.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_4',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'Automatic Text Summarization (ATS) is an active research area that deals with single-and multi-document summarization tasks.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_5',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: "In single-document summarization, the summary of only one document is built, while in multi-document summarization the summary of a whole collection of documents (such as all today's news or all search results for a query) is built.",
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_6',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'While we believe that our ideas apply to either case, in this work we have experimented only with single-document summaries.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_7',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'An extractive summary, in contrast, is composed with a selection of sentences (or phrases, paragraphs, etc) from the original text, usually presented to the user in the same order-ie, a copy of the source text with most sentences omitted.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_8',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'The resulting summary reads rather awkward; however, simplicity of the underlying statistical techniques makes extractive summarization an attractive, robust, language-independent alternative to more "intelligent" abstractive methods.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_9',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'In this paper, we consider extractive summarization.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_10',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'In this work, we propose a language-and domain-independent automatic text summarization approach by sentence extraction using an unsupervised learning algorithm.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_11',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'Our hypothesis is that an unsupervised algorithm can help for clustering similar ideas (sentences).',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_12',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'Then, for composing the summary, the most representative sentence is selected from each cluster.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_13',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'In addition, this approach lets to control in some degree the number of words in the generated summary.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_14',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'In this work, we proposed an extractive automatic text summarization approach by sentence extraction using an unsupervised learning algorithm.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_15',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'In particular, the Kmeans algorithm for creating groups of similar sentences was used.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_16',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'Then, from the groups of sentences, the most representative sentence was selected for composing the summary.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_17',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'Normally, the definition of the number of groups to form and the initial seeds of the groups are considered as disadvantages of K-means.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_18',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'The proposed approach, in contrast to supervised methods, does not need large amount of golden samples for training.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_19',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'Therefore, our proposed approach is more independent from language and dominion.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_20',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'According to experimental results we demonstrate that the proposed approach obtains more favorable results than others state-of-the-art approaches; ranking our proposed approach in second place, very close to the first place.',
    },
    {
      user_paper_id: 32,
      user_id: 6,
      paper_name: 'fdghdgasdasd',
      section_name: '',
      par_id: 1,
      sent_id: 'sent_1_21',
      automatic_label: 'Method',
      manual_label: 'Method',
      checked: false,
      correct_section_head: false,
      sent: 'In addition, our proposed approach outperforms the Baseline (first) heuristic for F-measure results, except for 1gram and BOOL weighting.',
    },
  ];

  const UserSectionName = UserData.map((section) => {
    return section.manual_label;
  });

  const LongSectionName = LongData.map((section) => {
    return section.manual_label;
  });

  console.log(LongSectionName);

  type DummyProps = {
    type: string;
    text: string;
    value: dataExport[];
    sections: string[];
  };

  const Dummy: DummyProps[] = [
    {
      type: 'user',
      text: 'Ini data user',
      value: UserData,
      sections: UserSectionName,
    },
    {
      type: 'longsumm',
      text: 'Ini data longsumm',
      value: LongData,
      sections: LongSectionName,
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
          <CardCollapse title={`Summary A`}>
            {UserSectionName.map((section) => {
              return (
                <div className='mb-5'>
                  <p className='font-semibold text-lg'>{section}</p>
                  <ul className='list-disc px-2 ml-3'>
                    {Dummy[random].value.map((DataSum) => {
                      if (section === DataSum.manual_label)
                        return <li>{DataSum.sent}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
          </CardCollapse>

          <CardCollapse title={'Summary B'}>
            {random === 0
              ? UserSectionName.map((section) => {
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
              : UserSectionName.map((section) => {
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
