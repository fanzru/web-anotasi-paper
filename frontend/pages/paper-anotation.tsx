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
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectPaperValue } from '@/redux/paperSlice';
import { selectPdfValue } from '@/redux/pdfSlice';
import { Beforeunload, useBeforeunload } from 'react-beforeunload';
import BeforeLoad from '@/components/BeforeLoad';

const PaperAnotation: NextPage = () => {
  const [numberSection, setNumberSection] = useState<number>(0);
  const router = useRouter();
  const cookie = new Cookies();
  const authToken = cookie.get('token');
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const paperValue = useSelector(selectPaperValue);

  const pdfValue = useSelector(selectPdfValue);

  const Sections =
    paperValue &&
    paperValue.sections?.filter(
      (section) => section.selected_sentences.length > 0
    );

  const methods = useForm();
  const { handleSubmit } = methods;

  const TesSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  const Check = async () => {
    if (Object.keys(paperValue).length === 0) return router.push('/anotation');
    if (!authToken) return router.push('/login');
    if (await isTokenValid()) return router.push('/paper-anotation');
  };

  useEffect(() => {
    Check();
  }, []);

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
              <FormProvider {...methods}>
                <form onSubmit={TesSubmit}>
                  <Card
                    title={Sections && Sections[numberSection].section_name}
                  >
                    {Sections &&
                      Sections[numberSection].selected_sentences.map(
                        (selected: selectedSentence, indexSelected) => {
                          return selected.sentences.map(
                            (item, index, element) => {
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
                                          return (
                                            <div
                                              className='form-control'
                                              key={idx}
                                            >
                                              <Radio
                                                data={tag}
                                                sentence={item}
                                                dataRegister={`section_name.${Sections[numberSection].section_name}.selected_sentences.${indexSelected}.sentences${selected.par_id}.${index}`}
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                    <div className='divider'></div>
                                  </>
                                );
                              } else if (
                                index ==
                                selected.sentences.length - 1
                              ) {
                                return (
                                  <div key={index}>
                                    <Sentence data={element[index - 1]} />
                                    <Sentence data={item} colored />
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
                                              dataRegister={`section_name.${Sections[numberSection].section_name}.selected_sentences.${indexSelected}.sentences${selected.par_id}.${index}`}
                                            />
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
                                          return (
                                            <div
                                              className='form-control'
                                              key={idx}
                                            >
                                              <Radio
                                                data={tag}
                                                sentence={item}
                                                dataRegister={`section_name.${Sections[numberSection].section_name}.selected_sentences.${indexSelected}.sentences${selected.par_id}.${index}`}
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                    <div className='divider'></div>
                                  </>
                                );
                              }
                            }
                          );
                        }
                      )}
                  </Card>
                  <button type='submit' className='btn'>
                    Submit
                  </button>
                </form>
              </FormProvider>

              <div className='flex justify-center my-10'>
                <div className='btn-group grid grid-cols-3'>
                  <button
                    className={`btn ${
                      numberSection == 0 ? 'btn-disabled' : ''
                    }`}
                    onClick={() => setNumberSection(numberSection - 1)}
                  >
                    Previous section
                  </button>
                  <button className='btn btn-primary'>
                    {numberSection + 1} / {Sections?.length}
                  </button>
                  <button
                    className={`btn ${
                      numberSection == Sections?.length - 1
                        ? 'btn-disabled'
                        : ''
                    }`}
                    onClick={() => setNumberSection(numberSection + 1)}
                  >
                    Next section
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PaperAnotation;
