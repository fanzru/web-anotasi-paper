import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

import { Tag } from '@/data/tag';
import Card from '@/components/Card';
import Radio from '@/components/Radio';
import { selectedSentence } from '@/types/paper';
import Layout from '@/components/Layout';
import Sentence from '@/components/Sentence';
import { isTokenValid } from '@/lib/tokenValidate';
import CardCollapse from '@/components/CardCollapse';
import DataPaper from '@/data/dummy_az_identification';
import DataPaper2 from '@/data/dummy_az_paper2';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectPaperValue } from '@/redux/paperSlice';
import { dataPaper } from '@/types/paper';
import { selectPdfValue } from '@/redux/pdfSlice';

const PaperAnotation: NextPage = () => {
  const [numberSection, setNumberSection] = useState<number>(0);
  const router = useRouter();
  const cookie = new Cookies();
  const authToken = cookie.get('token');
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const paperValue = useSelector(selectPaperValue);

  const pdfValue = useSelector(selectPdfValue);
  const DataSections: dataPaper = JSON.parse(paperValue);

  const Sections = DataSections.sections.filter(
    (section) => section.selected_sentences.length > 0
  );

  type TesSentences = {
    sentence: string[];
  };

  type TesSelectedSentences = {
    selected_sentences: TesSentences[];
  };

  type TesForm = {
    section_name: {
      Abstract?: TesSelectedSentences;
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const TesSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  const tes = async () => {
    if (!authToken) return router.push('/login');
    if (await isTokenValid()) return router.push('/paper-anotation');
  };

  useEffect(() => {
    tes();
  }, []);

  return (
    <>
      <Layout>
        <div className='flex justify-center h-screen'>
          <div className='mt-24 flex flex-col md:flex-row max-width-component w-full px-5'>
            <div className='md:w-1/2 w-full max-h-[880px] border-2 border-gray-300 rounded-lg mb-6 md:mr-4 overflow-hidden'>
              <div className='w-full h-[50px] bg-gray-100 flex items-center px-5 rounded-t-lg font-medium'>
                PDF Viewer
              </div>
              <div className='p-5 h-full'>
                <Viewer
                  fileUrl={pdfValue}
                  plugins={[defaultLayoutPluginInstance]}
                  defaultScale={SpecialZoomLevel.PageFit}
                />
              </div>
            </div>
            <div className='md:w-1/2 w-full overflow-auto'>
              {/* Colapse Quick To How*/}
              <CardCollapse title={'Quick How To'}>
                Ini Merupakan Sebuah Deskripsi
              </CardCollapse>

              {/*  Guidelines*/}
              <CardCollapse title={'Guidelines'}>
                Ini Merupakan Sebuah Deskripsi
              </CardCollapse>

              {/* Paper Data */}
              <form onSubmit={TesSubmit}>
                <Card title={Sections[numberSection].section_name}>
                  {Sections[numberSection].selected_sentences.map(
                    (selected: selectedSentence, indexSelected) => {
                      return selected.sentences.map((item, index, element) => {
                        if (index == 0) {
                          return (
                            <>
                              <div key={index}>
                                <Sentence data={item} colored />
                                {element.length > 1 ? (
                                  <Sentence data={element[index + 1]} />
                                ) : (
                                  ''
                                )}
                                <div className='flex flex-wrap'>
                                  {Tag.map((tag, idx) => {
                                    let badgeColor;

                                    if (tag.color == 'warning') {
                                      badgeColor = 'badge-warning';
                                    } else if (tag.color == 'info') {
                                      badgeColor = 'badge-info';
                                    } else if (tag.color == 'primary') {
                                      badgeColor = 'badge-primary';
                                    } else if (tag.color == 'success') {
                                      badgeColor = 'badge-success';
                                    } else if (tag.color == 'accent') {
                                      badgeColor = 'badge-accent';
                                    } else if (tag.color == 'neutral') {
                                      badgeColor = 'badge-neutral';
                                    } else {
                                      badgeColor = 'badge-error';
                                    }
                                    return (
                                      <div className='form-control' key={idx}>
                                        <label className='label cursor-pointer'>
                                          <input
                                            type='radio'
                                            className={`radio`}
                                            value={tag.tag}
                                            defaultChecked={tag.tag == item.tag}
                                            {...register(
                                              `section_name.${Sections[numberSection].section_name}.selected_sentences.${indexSelected}.sentences${selected.par_id}.${index}`
                                            )}
                                          />
                                          <span className='label-text ml-2'>
                                            <div
                                              className={`badge badge-${tag.color}`}
                                            >
                                              {tag.tag}
                                            </div>
                                          </span>
                                        </label>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="divider"></div>
                            </>
                          );
                        } else if (index == selected.sentences.length - 1) {
                          return (
                            <div key={index}>
                              <Sentence data={element[index - 1]} />
                              <Sentence data={item} colored />
                              <div className='flex flex-wrap'>
                                {Tag.map((tag, idx) => {
                                  let badgeColor;

                                  if (tag.color == 'warning') {
                                    badgeColor = 'badge-warning';
                                  } else if (tag.color == 'info') {
                                    badgeColor = 'badge-info';
                                  } else if (tag.color == 'primary') {
                                    badgeColor = 'badge-primary';
                                  } else if (tag.color == 'success') {
                                    badgeColor = 'badge-success';
                                  } else if (tag.color == 'accent') {
                                    badgeColor = 'badge-accent';
                                  } else if (tag.color == 'neutral') {
                                    badgeColor = 'badge-neutral';
                                  } else {
                                    badgeColor = 'badge-error';
                                  }
                                  return (
                                    <div className='form-control' key={idx}>
                                      <label className='label cursor-pointer'>
                                        <input
                                          type='radio'
                                          className={`radio`}
                                          value={tag.tag}
                                          defaultChecked={tag.tag == item.tag}
                                          {...register(
                                            `section_name.${Sections[numberSection].section_name}.selected_sentences.${indexSelected}.sentences${selected.par_id}.${index}`
                                          )}
                                        />
                                        <span className='label-text ml-2'>
                                          <div
                                            className={`badge badge-${tag.color}`}
                                          >
                                            {tag.tag}
                                          </div>
                                        </span>
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <>
                              <div key={index}>
                                <Sentence data={element[index - 1]} />
                                <Sentence data={item} colored />
                                <Sentence data={element[index + 1]} />
                                <div className='flex flex-wrap'>
                                  {Tag.map((tag, idx) => {
                                    let badgeColor;

                                    if (tag.color == 'warning') {
                                      badgeColor = 'badge-warning';
                                    } else if (tag.color == 'info') {
                                      badgeColor = 'badge-info';
                                    } else if (tag.color == 'primary') {
                                      badgeColor = 'badge-primary';
                                    } else if (tag.color == 'success') {
                                      badgeColor = 'badge-success';
                                    } else if (tag.color == 'accent') {
                                      badgeColor = 'badge-accent';
                                    } else if (tag.color == 'neutral') {
                                      badgeColor = 'badge-neutral';
                                    } else {
                                      badgeColor = 'badge-error';
                                    }
                                    return (
                                      <div className='form-control' key={idx}>
                                        <label className='label cursor-pointer'>
                                          <input
                                            type='radio'
                                            className={`radio`}
                                            value={tag.tag}
                                            defaultChecked={tag.tag == item.tag}
                                            {...register(
                                              `section_name.${Sections[numberSection].section_name}.selected_sentences.${indexSelected}.sentences${selected.par_id}.${index}`
                                            )}
                                          />
                                          <span className='label-text ml-2'>
                                            <div
                                              className={`badge badge-${tag.color}`}
                                            >
                                              {tag.tag}
                                            </div>
                                          </span>
                                        </label>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="divider"></div>
                            </>
                          );
                        }
                      });
                    }
                  )}
                </Card>
                <button type='submit' className='btn'>
                  Submit
                </button>
              </form>

              <div className='flex justify-between my-10'>
                <button
                  className={`btn btn-primary ${
                    numberSection == 0 ? 'invisible' : ''
                  }`}
                  onClick={() => setNumberSection(numberSection - 1)}
                >
                  PREV
                </button>
                <button
                  className={`btn ${
                    numberSection == Sections.length - 1 ? 'invisible' : ''
                  }`}
                  onClick={() => setNumberSection(numberSection + 1)}
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PaperAnotation;
