import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

import { Tag } from '@/data/tag';
import Card from '@/components/Card';
import Radio from '@/components/Radio';
import { dataExport, selectedSentence } from '@/types/paper';
import Layout from '@/components/Layout';
import Sentence from '@/components/Sentence';
import { isTokenValid } from '@/lib/tokenValidate';
import CardCollapse from '@/components/CardCollapse';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectPaperValue } from '@/redux/paperSlice';
import { selectPdfValue } from '@/redux/pdfSlice';
import BeforeLoad from '@/components/BeforeLoad';
import { toExportData } from '@/lib/toExportData';
import { axiosInstance } from '@/lib/axios';
import { exportData } from '@/lib/exportData';
import QuickTo from '@/components/QuickTo';
import Guidelines from '@/components/Guidelines';

type SentencesResult = {
  sentences: string[];
};

type SelectedSentenceResult = {
  selected_sentences: SentencesResult[];
};

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

  const onSubmit = handleSubmit(async (data) => {
    const Data: dataExport[] = toExportData(Sections, paperValue);
    const tag: string[] = [];

    if (data.withLongsum) {
      console.log(data);
    } else {
      data.section_name.map((section: SelectedSentenceResult) => {
        section.selected_sentences.map((sentences: SentencesResult) => {
          sentences.sentences.map((sentence: string) => {
            tag.push(sentence);
          });
        });
      });

      Data.map((data, index) => {
        data.manual_label = tag[index];
        data.checked = data.automatic_label !== tag[index];
      });

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
                    {Sections.map((Section) => {
                      if (Sections.indexOf(Section) === numberSection) {
                        return Sections[numberSection].selected_sentences.map(
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
                                                  dataRegister={`section_name.${numberSection}.selected_sentences.${indexSelected}.sentences.${index}`}
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
                                                  dataRegister={`section_name.${numberSection}.selected_sentences.${indexSelected}.sentences.${index}`}
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
                        );
                      }
                    })}
                  </Card>
                  <progress
                    className='progress progress-primary w-full px-1'
                    value={numberSection + 1}
                    max={Sections?.length}
                  />
                  {numberSection == Sections?.length - 1 && (
                    <div className='form-control py-1 items-end'>
                      <label className='cursor-pointer label'>
                        <span className='label-text mr-3'>
                          Summary evaluation
                        </span>
                        <input
                          type='checkbox'
                          className='checkbox checkbox-accent'
                          {...methods.register('withLongsum')}
                        />
                      </label>
                    </div>
                  )}

                  <div className='flex flex-col justify-center mb-10'>
                    <div className='flex flex-row justify-between items-center'>
                      <input
                        type='button'
                        value='Previous Section'
                        className={`btn ${
                          numberSection == 0 ? 'btn-disabled' : ''
                        }`}
                        onClick={() => setNumberSection(numberSection - 1)}
                      />
                      <span>
                        {numberSection + 1} / {Sections?.length}
                      </span>
                      {numberSection == Sections?.length - 1 ? (
                        <button className='btn btn-secondary' type='submit'>
                          submit
                        </button>
                      ) : (
                        <input
                          type='button'
                          value='Next Section'
                          className={`btn ${
                            numberSection == Sections?.length - 1
                              ? 'btn-disabled'
                              : ''
                          }`}
                          onClick={() => setNumberSection(numberSection + 1)}
                        />
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
