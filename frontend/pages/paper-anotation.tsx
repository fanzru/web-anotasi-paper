import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { selectNavbarUrlValue } from '../redux/paperSlice';
import DataPaper from '../data/dummy_az_identification';
import { useEffect, useState } from 'react';
import CardCollapse from '../components/CardCollapse';
import Card from '../components/Card';
import { Tag } from '../data/tag';
import Radio from '../components/Radio';
import { Section } from '../types/paper';
import Sentence from '../components/Sentence';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import { isTokenValid } from '../lib/tokenValidate';
import { axiosInstance } from '../lib/axios';
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PaperAnotation: NextPage = () => {
  const [numberSection, setNumberSection] = useState(0);
  const sections = DataPaper.sections;
  const router = useRouter();
  const cookie = new Cookies();
  const authToken = cookie.get('token');
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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
                {DataPaper.sections.map((data: Section, idx: number) => {
                  return (
                    <div key={idx} className=''>
                      {data.selected_sentences.length != 0 ? (
                        <Card title={data.section_name}>
                          {data.selected_sentences.map((sen) => {
                            return sen.sentences.map((item, idx) => {
                              return (
                                <>
                                  {idx == 0 ? (
                                    <>
                                      <Sentence data={sen.sentences[idx]} />
                                      <p>a</p>
                                      {/* <Sentence data={sen.sentences[idx + 1]} /> */}
                                      <div className='flex flex-wrap'>
                                        {Tag.map((tag, index) => {
                                          return (
                                            <Radio
                                              key={index}
                                              data={tag}
                                              sentence={item}
                                              dataName={sen.sentences[idx].sent}
                                            />
                                          );
                                        })}
                                      </div>
                                    </>
                                  ) : idx == sen.sentences.length - 1 ? (
                                    <>
                                      {/* <Sentence data={sen.sentences[idx - 1]} /> */}
                                      <Sentence data={sen.sentences[idx]} />
                                      <p>b</p>
                                      {/* <Sentence data={sen.sentences[idx + 1]} /> */}
                                      <div className='flex flex-wrap'>
                                        {Tag.map((tag, index) => {
                                          return (
                                            <Radio
                                              key={index}
                                              data={tag}
                                              sentence={item}
                                              dataName={sen.sentences[idx].sent}
                                            />
                                          );
                                        })}
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      {/* <Sentence data={sen.sentences[idx-1]} /> */}
                                      <Sentence data={sen.sentences[idx]} />
                                      <p>c</p>
                                      <div className='flex flex-wrap'>
                                        {Tag.map((tag, index) => {
                                          return (
                                            <Radio
                                              key={index}
                                              data={tag}
                                              sentence={item}
                                              dataName={sen.sentences[idx].sent}
                                            />
                                          );
                                        })}
                                      </div>
                                    </>
                                  )}
                                </>
                              );
                            });
                          })}
                        </Card>
                      ) : (
                        ''
                      )}
                    </div>
                  );
                })}

                <div className='flex justify-between my-10'>
                  <button className='btn btn-primary'>PREV</button>
                  <button className='btn'>NEXT</button>
                </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PaperAnotation;
