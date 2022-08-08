import Layout from '../components/Layout';
import DataArticle from '../data/article';
import { ChangeEvent, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { changePaperValue, selectPaperValue } from '../redux/paperSlice';
import axios from 'axios';
import * as https from 'https';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Card from '../components/Card';
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Cookies from 'universal-cookie';
import { changePdfData, selectPdfValue } from '@/redux/pdfSlice';
import { toast } from 'react-toastify';

const Annotation = () => {
  const router = useRouter();
  const cookie = new Cookies();
  const token = cookie.get('token');
  const dispatch = useDispatch();
  const [file, setFile] = useState<File>();
  const fileTypes = ['CSV', 'PDF'];
  const [category, setCategory] = useState('');
  const [domain, setDomain] = useState('');
  const [isSetFile, SetIsSetFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pdfValue = useSelector(selectPdfValue);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleChange = (file: any) => {
    SetIsSetFile(true);
    setFile(file);
    dispatch(changePdfData(URL.createObjectURL(file)));
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      var bodyFormData = new FormData();
      bodyFormData.append('paper_id', 'paper_identifier');
      bodyFormData.append('pdf_article', file!);

      const res = await toast.promise(
        axios({
          method: 'POST',
          url: 'https://riset.fanzru.dev/api/tuwien/artu-az',
          data: bodyFormData,
          headers: { Authorization: `Bearer ${token}` },
        }),
        {
          pending: 'Loading..',
          success: 'Upload Success!',
          error: 'Upload Failed!',
        }
      );

      if (res.data.status) {
        dispatch(changePaperValue(res.data.value));
        router.push('/paper-anotation');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Layout>
        <div className='flex justify-center h-screen'>
          <div className='mt-24 flex flex-col md:flex-row max-width-component w-full px-5'>
            {/* PDF Viewer */}
            <div className='md:w-1/2 w-full border-2 border-gray-300 rounded-lg mb-6 md:mr-4 overflow-hidden'>
              <div className='w-full h-[50px] bg-gray-100 flex items-center px-5 rounded-t-lg font-medium'>
                PDF Viewer
              </div>
              <div className='p-5 h-full'>
                {pdfValue ? (
                  <Viewer
                    // fileUrl={'/dummyExample.pdf'}
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

            <div className='md:w-1/2 w-full'>
              {/* Card Article Info */}
              <Card title={'Article Info'}>
                <p className='mb-1'>
                  From the below categories, choose which type this article
                  belongs to:
                </p>
                {DataArticle.map((data, idx) => {
                  return (
                    <div key={idx} className='form-check'>
                      <input
                        className='form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                        type='radio'
                        name='flexRadioDefault'
                        onClick={() => setCategory(data.value)}
                      />
                      <label className='form-check-label inline-block text-gray-800'>
                        {data.value}
                      </label>
                    </div>
                  );
                })}
              </Card>

              {/* Card Domain Info */}
              <Card title={'Domain Info'}>
                <p className='mb-2'>
                  Please write which domain the article belongs to:
                </p>
                <input
                  type='text'
                  placeholder='Enter Domain'
                  className='input input-bordered w-full'
                  onChange={(e) => {
                    setDomain(e.target.value);
                  }}
                />
                <p className='text-xs mt-2 text-gray-400'>
                  Example: Computational linguistics, Bioinformatics, etc..
                </p>
              </Card>

              {/* Card Upload Article */}
              <Card title={'Upload article'}>
                <p className='mb-2'>
                  Choose CSV file of annotation progress or pdf article
                </p>
                <FileUploader
                  handleChange={handleChange}
                  name='file'
                  types={fileTypes}
                >
                  <button
                    onClick={(e) => e.preventDefault()}
                    className='h-[200px] border-2 w-[100%] rounded-md border-dashed opacity-60'
                  >
                    {isSetFile ? (
                      <p>File Berhasil Di Tambahkan</p>
                    ) : (
                      <p>Upload Disini</p>
                    )}
                  </button>
                </FileUploader>
              </Card>

              <div className='mb-5'>
                <button className='btn w-full  mt-6' onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Annotation;
