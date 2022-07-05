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
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

const PaperAnotation: NextPage = () => {
  const [numberSection, setNumberSection] = useState<number>(0);
  const router = useRouter();
  const cookie = new Cookies();
  const authToken = cookie.get('token');
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const Sections = DataPaper.sections.filter(
    (section) => section.selected_sentences.length > 0
  );

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
          <div className='flex max-width-component mt-24 w-full px-5'>
            <div className='md:w-1/2 w-full max-h-[880px] border-2 border-gray-300 rounded-lg mb-6 md:mr-4 overflow-hidden'>
              <div className='w-full h-[50px] bg-gray-100 flex items-center px-5 rounded-t-lg font-medium'>
                PDF Viewer
              </div>
              <div className='p-5 h-full'>
                <Viewer
                  fileUrl={'/dummyExample.pdf'}
                  plugins={[defaultLayoutPluginInstance]}
                  defaultScale={SpecialZoomLevel.PageFit}
                />
              </div>
            </div>
            <div className='w-1/2 overflow-auto'>
              {/* Colapse Quick To How*/}
              <CardCollapse title={'Quick How To'}>
                Ini Merupakan Sebuah Deskripsi
              </CardCollapse>

              {/*  Guidelines*/}
              <CardCollapse title={'Guidelines'}>
                Ini Merupakan Sebuah Deskripsi
              </CardCollapse>

              {/* Paper Data */}
              <Card title={Sections[numberSection].section_name}>
                {Sections[numberSection].selected_sentences.map(
                  (selected: selectedSentence) => {
                    return selected.sentences.map((item, index, element) => {
                      if (index == 0) {
                        return (
                          <>
                            <Sentence data={item} />
                            {element.length > 1 ? (
                              <Sentence data={element[index + 1]} />
                            ) : (
                              ''
                            )}
                            <div className='flex flex-wrap'>
                              {Tag.map((tag, index) => {
                                return (
                                  <Radio
                                    key={index}
                                    data={tag}
                                    sentence={item}
                                    dataName={item.sent}
                                  />
                                );
                              })}
                            </div>
                          </>
                        );
                      } else if (index == selected.sentences.length - 1) {
                        return (
                          <>
                            <Sentence data={element[index - 1]} />
                            <Sentence data={item} />
                            <div className='flex flex-wrap'>
                              {Tag.map((tag, index) => {
                                return (
                                  <Radio
                                    key={index}
                                    data={tag}
                                    sentence={item}
                                    dataName={item.sent}
                                  />
                                );
                              })}
                            </div>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <Sentence data={element[index - 1]} />
                            <Sentence data={item} />
                            <Sentence data={element[index + 1]} />
                            <div className='flex flex-wrap'>
                              {Tag.map((tag, index) => {
                                return (
                                  <Radio
                                    key={index}
                                    data={tag}
                                    sentence={item}
                                    dataName={item.sent}
                                  />
                                );
                              })}
                            </div>
                          </>
                        );
                      }
                    });
                  }
                )}
              </Card>

              <div className='flex justify-between my-10'>
                <button
                  className='btn btn-primary'
                  onClick={() => setNumberSection(numberSection - 1)}
                >
                  PREV
                </button>
                <button
                  className='btn'
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
