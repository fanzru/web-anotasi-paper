import Layout from '../components/Layout';
import DataArticle from '../data/article';
import { useState, useEffect } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { changePaperValue } from '../redux/paperSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Card from '../components/Card';
import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { changePdfData, selectPdfValue } from '@/redux/pdfSlice';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { removeSpace } from '@/lib/removeSpace';
import { isTokenValid } from '@/lib/tokenValidate';

type Annotaion = {
  articleInfo: string;
  domainInfo: string;
  paperName: string;
};

const Annotation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [file, setFile] = useState<File>();
  const fileTypes = ['CSV', 'PDF'];
  const [isSetFile, SetIsSetFile] = useState(false);
  const pdfValue = useSelector(selectPdfValue);
  if (typeof window !== 'undefined') {
    var token = localStorage.getItem('token');
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Annotaion>();

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleChange = (file: any) => {
    SetIsSetFile(true);
    setFile(file);
    dispatch(changePdfData(URL.createObjectURL(file)));
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      var bodyFormData = new FormData();
      bodyFormData.append('article_info', data.articleInfo);
      bodyFormData.append('domain_info', data.domainInfo);
      bodyFormData.append('paper_name', removeSpace(data.paperName));
      bodyFormData.append('pdf_article', file!);

      const newPromise = axios({
        method: 'POST',
        url: 'https://riset.fanzru.dev/api/tuwien/artu-az',
        data: bodyFormData,
        headers: { Authorization: `Bearer ${token}` },
      });

      const res = await toast.promise(newPromise, {
        pending: 'Loading..',
        success: 'Upload Success!',
        error: 'Upload Failed!',
      });

      if (res.data.status) {
        dispatch(changePaperValue(res.data.value));
        router.push('/paper-anotation');
      }
    } catch (err: any) {
      console.log(err);
      if (err.response.data.message === 'Unmarshal error') {
        toast.error('Parsing Paper Error!');
      }
    }
  });

  useEffect(() => {
    const Check = async () => {
      const user = await isTokenValid();
      if (!user) return router.push('/login');
    };
    Check();
  }, []);

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
              <form onSubmit={onSubmit}>
                <Card title={'Article Info'}>
                  <p className='mb-1'>
                    From the below categories, choose which type this article
                    belongs to :
                  </p>
                  {DataArticle.map((data, idx) => {
                    return (
                      <div className='form-control items-start' key={idx}>
                        <label className='label cursor-pointer gap-2'>
                          <input
                            type='radio'
                            className='radio'
                            {...register('articleInfo', {
                              required: 'Required',
                            })}
                            value={data.value}
                          />
                          <span>{data.value}</span>
                        </label>
                      </div>
                    );
                  })}
                  <label className='label'>
                    {errors.articleInfo && (
                      <span className='label-text-alt text-error font-semibold'>
                        {errors.articleInfo?.message}
                      </span>
                    )}
                  </label>
                </Card>

                <Card title={'Domain Info'}>
                  <p className='mb-2'>
                    Please write which domain the article belongs to :
                  </p>
                  <input
                    type='text'
                    placeholder='Enter Domain'
                    className='input input-bordered w-full'
                    {...register('domainInfo', { required: 'Required' })}
                  />
                  <label className='label'>
                    <span className='label-text-alt text-gray-400'>
                      Example: Computational linguistics, Bioinformatics, etc..
                    </span>
                    {errors.domainInfo && (
                      <span className='label-text-alt text-error font-semibold'>
                        {errors.domainInfo?.message}
                      </span>
                    )}
                  </label>
                </Card>

                <Card title={'Title'}>
                  <p className='mb-2'>Please enter your paper title :</p>
                  <input
                    type='text'
                    placeholder='Enter Title'
                    className='input input-bordered w-full'
                    {...register('paperName', { required: 'Required' })}
                  />
                  <label className='label'>
                    <span className='label-text-alt text-gray-400'>
                      Example: Sentiment Analysis Twitter Using IndoBert, etc..
                    </span>
                    {errors.paperName && (
                      <span className='label-text-alt text-error font-semibold'>
                        {errors.paperName?.message}
                      </span>
                    )}
                  </label>
                </Card>

                <Card title={'PDF'}>
                  <p className='mb-2'>Please choose PDF article</p>
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
                        <>
                          <p>File Berhasil Di Tambahkan</p>
                          <p className='font-medium'>{file?.name}</p>
                        </>
                      ) : (
                        <p>Upload Disini</p>
                      )}
                    </button>
                  </FileUploader>
                </Card>

                <button className='btn w-full mb-5'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Annotation;
