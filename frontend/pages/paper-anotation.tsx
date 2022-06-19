import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { selectNavbarUrlValue } from '../redux/paperSlice';
import DataAx from '../data/dummy_az_paper2';
import { useState } from 'react';
import CardCollapse from '../components/CardCollapse';
import Card from '../components/Card';

const PaperAnotation: NextPage = () => {
  const [numberSection, setNumberSection] = useState(0);
  const sections = DataAx.sections;
  // const dataPaper = useSelector(selectNavbarUrlValue);
  // console.log("Alhamdulillah bisa fetch api : ",dataPaper);
  return (
    <>
      <Layout>
        <div className=' flex justify-center'>
          <div className=' mt-[100px] flex max-width-component w-[100%] px-5'>
            <div className='w-1/2 border-2 border-gray-200 mr-5 p-10 rounded-lg'>
              Pdf Viewer
            </div>
            <div className='w-1/2 '>
              <div className='w-full h-full'>
                {/* Colapse Quick To How*/}
                <CardCollapse title={'Quick How To'}>
                  Ini Merupakan Sebuah Deskripsi
                </CardCollapse>

                {/*  Guidelines*/}
                <CardCollapse title={'Guidelines'}>
                  Ini Merupakan Sebuah Deskripsi
                </CardCollapse>

                {/* Paper Data */}
                {DataAx.sections.map((data, idx) => {
                  return (
                    <div key={idx} className=''>
                      {data.selected_sentences.length != 0 ? (
                          <Card title={data.section_name}>
                            {data.selected_sentences.map((x, idx) => {
                              for (let i = 0; i < x.sentences.length; i++) {
                                console.log(
                                  '--------------------------------------------------------',
                                  x.sentences.length
                                );
                                return (
                                  <div key={idx} className='mt-4'>
                                    {i == 0 ? (
                                      <p>
                                        {x.sentences[i]?.sent +
                                          x.sentences[i + 1]?.sent}
                                      </p>
                                    ) : (
                                      <p>
                                        {x.sentences[i - 1]?.sent +
                                          x.sentences[i]?.sent +
                                          x.sentences[i + 1]?.sent}
                                      </p>
                                    )}
                                  </div>
                                );
                              }
                            })}
                          </Card>
                      ) : (
                        ''
                      )}
                    </div>
                  );
                })}
                <div className='flex justify-between mt-10'>
                  <button className='btn'>PREV</button>
                  <button className='btn'>NEXT</button>
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
