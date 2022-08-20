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
import Link from 'next/link';

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
      // todo
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
                <ul className='list-decimal px-2 ml-2'>
                  <li>
                    The first step:{' '}
                    <span className='font-semibold'>
                      check if the section heading doesn't belong to one of the
                      paper sections or subsections
                    </span>
                    : mark the checkbox{' '}
                    <span className='font-semibold'>
                      "Wrong extracted heading"
                    </span>
                    . If the section is wrong one, you can choose whether to
                    complete annotation or jump directly to step 3.
                  </li>
                  <li>
                    For each sentence selected (highlighled) from the paper
                    section below, choose one action of the following:
                    <ul className='list-decimal ml-5'>
                      <li>
                        <span className='font-semibold'>
                          If the label/annotation of the sentence marked by the
                          bullet point is correct
                        </span>
                        : mark the checkbox{' '}
                        <span className='font-semibold'>"Correct label"</span>
                      </li>
                      <li>
                        <span className='font-semibold'>
                          If there is something wrong with the extraction of the
                          sentence (for example: the sentence doesn't belong to
                          the context of the section):
                        </span>
                        select the radio button{' '}
                        <span className='font-semibold'>
                          "Wrong extraction"
                        </span>{' '}
                      </li>
                      <li>
                        <span className='font-semibold'>
                          If the label/annotation of the sentence marked by the
                          bullet point is not correct:
                        </span>{' '}
                        choose the collect label from the bullet points
                      </li>
                    </ul>
                  </li>
                  <li>
                    Press "Next section" to proceed in the next section with
                    selected sentences from the paper
                  </li>
                  <li>
                    Repeat the process until sections with selected sentences
                    are done.
                  </li>
                </ul>
                <ul className='list-disc mt-4 px-2 ml-2'>
                  <li>
                    The description of the sentences labels and guidelines are
                    described in the "Guidelines section" below
                  </li>
                  <li>
                    You can download the sentences selected with there
                    annotation and your correct annotation using the "Download
                    progress" button in the top left corner
                  </li>
                  <li>
                    If you left the session the progress will not be recorded
                    and you will need to upload the paper from the start.
                  </li>
                </ul>
              </CardCollapse>

              {/*  Guidelines*/}
              <CardCollapse title={'Guidelines'}>
                <div className='space-y-2'>
                  <p className='text-2xl font-medium'>
                    Argumentative Zoning annotation
                  </p>
                  <p className='text-xl font-medium'>Introduction</p>
                  <p>
                    Argumentative Zoning (AZ) is the analysis of the
                    argumentative and rhetorical structure of a scientific
                    paper. The basic idea of AZ is to assign each sentence in
                    the scientific article to a specific category (known as
                    zone). Each zone represents one of the article's component
                    (e.g. the hypothesis, the background, the method, .. etc).
                  </p>
                  <p className='text-xl font-medium'>The task</p>
                  <p>
                    Given a scientific article and a sub set of sentences from
                    the article, it’s required to identify the category of each
                    sentence from the articles’ main components.
                  </p>
                  <p>
                    In this work, we define a simplified schema of 4 categories
                    that cover the articles main components. These categories
                    are defined in the following table:
                  </p>
                </div>
                <div className='mt-4'>
                  <table className='table-auto'>
                    <thead className='border-y-2'>
                      <tr>
                        <th>Argumentative zone</th>
                        <th>Definition</th>
                        <th>Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='border-b'>
                        <th>claim</th>
                        <td>
                          Sentence describing the research goal or the
                          hypothesis behind research work
                        </td>
                        <td>
                          This paper investigates the incorporation of diverse
                          lexical, syntactic and semantic knowledge in
                          feature-based relation extraction using SVM (P05-1053)
                        </td>
                      </tr>
                      <tr className='border-b'>
                        <th>method</th>
                        <td>
                          Sentence describing the research goal or the
                          hypothesis behind research work
                        </td>
                        <td>
                          This paper investigates the incorporation of diverse
                          lexical, syntactic and semantic knowledge in
                          feature-based relation extraction using SVM (P05-1053)
                        </td>
                      </tr>
                      <tr className='border-b'>
                        <th>result</th>
                        <td>
                          Sentence describing the research goal or the
                          hypothesis behind research work
                        </td>
                        <td>
                          This paper investigates the incorporation of diverse
                          lexical, syntactic and semantic knowledge in
                          feature-based relation extraction using SVM (P05-1053)
                        </td>
                      </tr>
                      <tr className='border-b'>
                        <th>conclusion</th>
                        <td>
                          Sentence describing the research goal or the
                          hypothesis behind research work
                        </td>
                        <td>
                          This paper investigates the incorporation of diverse
                          lexical, syntactic and semantic knowledge in
                          feature-based relation extraction using SVM (P05-1053)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className='text-xl font-medium mt-3'>Detailed guidelines</p>
                <p>
                  For more detailed explaination for the task, the categories
                  and the user guide, please refer to the full{' '}
                  <span>
                    <Link
                      href={
                        'https://owncloud.tuwien.ac.at/index.php/s/lqyUgQmAbZg2cf3'
                      }
                    >
                      <a className='link' target={'_blank'}>
                        guidelines
                      </a>
                    </Link>
                  </span>
                </p>
              </CardCollapse>

              {/* Paper Data */}
              <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
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
                      )}
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
                          Compare with Longsum
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
