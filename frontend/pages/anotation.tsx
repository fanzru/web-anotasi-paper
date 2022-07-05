import Layout from '../components/Layout';
import DataArticle from '../data/article';
import { ChangeEvent, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { changePaperData } from '../redux/paperSlice';
import axios from 'axios';
import * as https from 'https';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Card from '../components/Card';
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const Annotation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [domain, setDomain] = useState('');
  const fileTypes = ['CSV', 'PDF'];
  const [isSetFile, SetIsSetFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paperValue, setPaperValue] = useState({
    paperId: '',
    fileName: '',
  });

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleChange = (file: any) => {
    SetIsSetFile(true);
    setFile(file);
    setUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const agent = new https.Agent({
      rejectUnauthorized: false,
      minVersion: 'TLSv1',
    });

    var bodyFormData = new FormData();
    bodyFormData.append('paper_id', 'paper_identifier');
    bodyFormData.append('pdf_article', file!);

    axios({
      method: 'POST',
      url: 'https://ir-group.ec.tuwien.ac.at/artu_az_identification/identify_az',
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
      httpsAgent: agent,
    })
      .then((res) => {
        dispatch(changePaperData(res.data));
        router.push('/paper-annotation');
        setIsLoading(false);
      })
      .catch((e) => {
        console.log('cie error');
        console.log(e);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Layout>
        {isLoading ? (
          <>
            <div className='flex justify-center mt-[200px]'>Loading....</div>
          </>
        ) : (
          <div className='flex justify-center h-screen'>
            <div className='mt-24 flex flex-col md:flex-row max-width-component w-full px-5'>
              {/* PDF Viewer */}
              <div className='md:w-1/2 w-full border-2 border-gray-300 rounded-lg mb-6 md:mr-4 overflow-hidden'>
                <div className='w-full h-[50px] bg-gray-100 flex items-center px-5 rounded-t-lg font-medium'>
                  PDF Viewer
                </div>
                <div className='p-5 h-full'>
                  {url ? (
                    <Viewer
                      // fileUrl={'/dummyExample.pdf'}
                      fileUrl={url}
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
        )}
      </Layout>
    </>
  );
};

export default Annotation;
