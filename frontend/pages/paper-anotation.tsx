import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Tag } from '@/data/tag';
import Card from '@/components/Card';
import Radio from '@/components/Radio';
import {
  dataExport,
  selectedSentence,
  SelectedSentenceResult,
  SentencesResult,
  UserTag,
} from '@/types/paper';
import Layout from '@/components/Layout';
import Sentence from '@/components/Sentence';
import { isTokenValid } from '@/lib/tokenValidate';
import CardCollapse from '@/components/CardCollapse';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectPaperValue } from '@/redux/paperSlice';
import { selectPdfValue } from '@/redux/pdfSlice';
import BeforeLoad from '@/components/BeforeLoad';
import { toExportData } from '@/lib/toExportData';
import { axiosInstance } from '@/lib/axios';
import { exportData } from '@/lib/exportData';
import QuickTo from '@/components/QuickTo';
import Guidelines from '@/components/Guidelines';
import {
  changeUserSummValue,
  selectUserSumValue,
} from '@/redux/userSummarizeSlice';
import { Profile } from '@/types/profil';
import { toast } from 'react-toastify';
import { changeLongSumValue } from '@/redux/longSummarizeSlice';
import { changeProgressData } from '@/redux/progressSlice';
import CorrectLabel from '@/components/CorrectLabel';
import { Link } from 'react-scroll';

const PaperAnotation: NextPage = () => {
  const methods = useForm();
  const router = useRouter();
  const paperValue = useSelector(selectPaperValue);
  const pdfValue = useSelector(selectPdfValue);
  const userSumValue: dataExport[] = useSelector(selectUserSumValue);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { isDirty },
  } = methods;
  const [dataUser, setDataUser] = useState<Profile>();
  const [numberSection, setNumberSection] = useState<number>(0);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  if (typeof window !== 'undefined') {
    var authToken = localStorage.getItem('token');
  }

  const Sections =
    paperValue &&
    paperValue.sections?.filter(
      (section) => section.selected_sentences.length > 0
    );

  const getProfil = () => {
    axiosInstance
      .get('/api/user/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setDataUser(res.data.value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setUserSummaryTemp = () => {
    const formValues = getValues();
    const Data: dataExport[] = toExportData(Sections, paperValue);
    const tag: UserTag[] = [];

    formValues.section_name.map((section: SelectedSentenceResult) => {
      section.selected_sentences.map((sentences: SentencesResult) => {
        sentences.sentences.map((sentence: string, indexSentences) => {
          tag.push({
            tag: sentence,
            wrongextracted: section.wrongextracted,
            correct_label: sentences.correct_label[indexSentences],
          });
        });
      });
    });

    tag.map((data, index) => {
      Data[index].manual_label = data.tag;
      Data[index].checked = Data[index].automatic_label !== data.tag;
      Data[index].correct_section_head = !data.wrongextracted;
      Data[index].correct_label = data.correct_label;
    });

    dispatch(changeUserSummValue(Data));
  };

  const onSubmit = handleSubmit(async (data) => {
    setUserSummaryTemp();
    const Data: dataExport[] = userSumValue;

    if (data.withLongsum) {
      const res = await toast.promise(
        axiosInstance.post(
          `/api/tuwien/artu-summarize/${Data[0].user_paper_id}/${dataUser?.id}`
        ),
        {
          pending: 'Loading..',
          success: 'Upload Success!',
          error: 'Upload Failed!',
        }
      );
      if (res.data.status) {
        dispatch(changeLongSumValue(res.data.value));
        router.push('/paper-compare');
      }
    } else {
      const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };
      const result = await axiosInstance.post(
        '/api/tuwien/artu-az/saved',
        Data,
        config
      );
      if (result.data.status) {
        exportData(Data, Data[0].paper_name);
        router.push('/artu-az-end');
      }
    }
  });

  const Check = async () => {
    if (Object.keys(paperValue).length === 0) return router.push('/anotation');
    const user = await isTokenValid();
    if (!user) return router.push('/login');
  };

  const scrollToTop = () => {
    const element = document.getElementById('top-section');
    element!.scrollTop = 0;
  };

  useEffect(() => {
    getProfil();
    Check();
  }, []);

  useEffect(() => {
    dispatch(changeProgressData(isDirty));
    setUserSummaryTemp();
  }, [isDirty]);

  return (
    <>
      <BeforeLoad />
      <Layout>
        <div className='flex justify-center h-screen'>
          <div className='mt-24 flex flex-col md:flex-row max-width-component w-full px-5'>
            <div className='md:w-1/2 w-full max-h-[880px] border-2 border-gray-300 rounded-lg mb-6 md:mr-4 overflow-hidden'>
              <div className='w-full h-[50px] bg-gray-100 flex items-center px-5 rounded-t-lg font-medium'>
                PDF Viewer
              </div>
              <div className='p-5 h-full'>
                {pdfValue ? (
                  <Viewer
                    fileUrl={pdfValue}
                    plugins={[defaultLayoutPluginInstance]}
                    defaultScale={SpecialZoomLevel.PageFit}
                  />
                ) : (
                  <div className='flex justify-center items-center h-full'>
                    <p>Preview PDF</p>
                  </div>
                )}
              </div>
            </div>
            <div className='md:w-1/2 w-full overflow-auto' id='top-section'>
              {/* Colapse Quick To How*/}
              <CardCollapse title={'Quick How To'}>
                <QuickTo />
              </CardCollapse>

              {/*  Guidelines*/}
              <CardCollapse title={'Guidelines'}>
                <Guidelines />
              </CardCollapse>

              {/* Paper Data */}
              <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
                  <Card
                    title={Sections && Sections[numberSection].section_name}
                    numSection={numberSection}
                  >
                    {Sections &&
                      Sections.map((Section) => {
                        if (Sections.indexOf(Section) === numberSection) {
                          return Sections[numberSection].selected_sentences.map(
                            (selected: selectedSentence, indexSelected) => {
                              return selected.sentences.map(
                                (item, index, element) => {
                                  if (index == 0) {
                                    return (
                                      <div key={index}>
                                        <div>
                                          <Sentence data={item} colored />
                                          {element.length > 1 ? (
                                            <Sentence
                                              data={element[index + 1]}
                                            />
                                          ) : (
                                            ''
                                          )}
                                          <CorrectLabel
                                            dataRegister={`section_name.${numberSection}.selected_sentences.${indexSelected}.correct_label.${index}`}
                                          />
                                          <div className='flex flex-wrap'>
                                            {Tag.map((tag, idx) => {
                                              return (
                                                <div
                                                  className='form-control'
                                                  key={idx}
                                                >
                                                  <Radio
                                                    data={tag}
                                                    sentence={item}
                                                    dataRegister={`section_name.${numberSection}.selected_sentences.${indexSelected}.sentences.${index}`}
                                                  />
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                        <div className='divider'></div>
                                      </div>
                                    );
                                  } else if (
                                    index ==
                                    selected.sentences.length - 1
                                  ) {
                                    return (
                                      <div key={index}>
                                        <Sentence data={element[index - 1]} />
                                        <Sentence data={item} colored />
                                        <CorrectLabel
                                          dataRegister={`section_name.${numberSection}.selected_sentences.${indexSelected}.correct_label.${index}`}
                                        />

                                        <div className='flex flex-wrap'>
                                          {Tag.map((tag, idx) => {
                                            return (
                                              <div
                                                className='form-control'
                                                key={idx}
                                              >
                                                <Radio
                                                  data={tag}
                                                  sentence={item}
                                                  dataRegister={`section_name.${numberSection}.selected_sentences.${indexSelected}.sentences.${index}`}
                                                />
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div key={index}>
                                        <div>
                                          <Sentence data={element[index - 1]} />
                                          <Sentence data={item} colored />
                                          <Sentence data={element[index + 1]} />
                                          <CorrectLabel
                                            dataRegister={`section_name.${numberSection}.selected_sentences.${indexSelected}.correct_label.${index}`}
                                          />
                                          <div className='flex flex-wrap'>
                                            {Tag.map((tag, idx) => {
                                              return (
                                                <div className=''>
                                                  <Radio
                                                    data={tag}
                                                    sentence={item}
                                                    dataRegister={`section_name.${numberSection}.selected_sentences.${indexSelected}.sentences.${index}`}
                                                  />
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                        <div className='divider'></div>
                                      </div>
                                    );
                                  }
                                }
                              );
                            }
                          );
                        }
                      })}
                  </Card>
                  <progress
                    className='progress progress-primary w-full px-1'
                    value={numberSection + 1}
                    max={Sections?.length}
                  />

                  <div className='flex flex-col justify-center mb-10'>
                    <div className='flex flex-row justify-between items-center'>
                      <Link to='top' spy smooth>
                        <input
                          type='button'
                          value={'Previous Section'}
                          className={`btn ${
                            numberSection == 0 ? 'btn-disabled' : ''
                          }`}
                          onClick={() => {
                            setNumberSection(numberSection - 1);
                            scrollToTop();
                          }}
                        />
                      </Link>
                      <span>
                        {numberSection + 1} / {Sections?.length}
                      </span>
                      {numberSection == Sections?.length - 1 ? (
                        <button
                          className='btn btn-secondary'
                          type='submit'
                          onClick={() => {
                            setValue('withLongsum', true);
                          }}
                        >
                          submit
                        </button>
                      ) : (
                        <Link to='top' spy smooth>
                          <input
                            type='button'
                            value={'Next Section'}
                            className={`btn ${
                              numberSection == Sections?.length - 1
                                ? 'btn-disabled'
                                : ''
                            }`}
                            onClick={() => {
                              setNumberSection(numberSection + 1);
                              scrollToTop();
                            }}
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PaperAnotation;
