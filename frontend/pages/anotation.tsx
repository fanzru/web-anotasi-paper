
import Layout from "../components/Layout"
import DataArticle from "../data/article"
import { useState } from "react"
import { FileUploader } from "react-drag-drop-files";
import {changePaperData} from '../redux/paperSlice'
import axios from "axios";
import fs from 'fs';
import * as https from 'https';
// import { set } from "immer/dist/internal";
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

const Annotation = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const [file,setFile] = useState(null)
  const [category, setCategory] = useState("")
  const [domain,setDomain] = useState("")
  const fileTypes = ["CSV", "PDF"]
  const [isSetFile, SetIsSetFile] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [paperValue, setPaperValue] = useState({
    "paperId": "",
    "fileName": "",
 });

  const handleChange = (file: any) => {
    SetIsSetFile(true)
    setFile(file)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true)
    const agent = new https.Agent({
      rejectUnauthorized: false,
      minVersion: 'TLSv1',
    });

    var bodyFormData = new FormData();
    bodyFormData.append("paper_id", "cek");
    bodyFormData.append("pdf_article", file!)
    
    axios({
      method: "POST",
      url: 'https://ir-group.ec.tuwien.ac.at/artu_az_identification/identify_az',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data',"Access-Control-Allow-Origin": "*"},
      httpsAgent: agent 
    })
    .then((res)=> {
      dispatch(changePaperData(res.data))
      router.push('/paper-annotation')
      setIsLoading(false)

    })
    .catch((e) => {
      console.log("-------------------------------- cie error")
      console.log(e)
      setIsLoading(false)
    })

  }

  return (
    <>
      <Layout >
        {
          isLoading? 
          <>
            <div className="flex justify-center mt-[200px]">
              Loading....
            </div>
          </>
          :
          <div className=" flex justify-center">
          <div className=" mt-[100px] flex max-width-component w-[100%] px-5">
            <div className="w-1/2 border-2 border-gray-200 mr-5 p-10 rounded-lg">Pdf Viewer</div>
            <div className="w-1/2 ">
              {/* Card Article Info */}
              <div className="w-full border-black border-[2px] border-gray-300 rounded-lg">
                <div className="w-full h-[50px] bg-gray-100 flex items-center px-5 rounded-t-lg">
                  Article Info
                </div>
                <div className="px-5 mt-10 mb-10">
                  <h1 className="mb-2">From the below categories, choose which type this article belongs to:</h1>
                  {
                    DataArticle.map((data,idx)=> {
                      return (
                        <div key={idx} className="form-check">
                          <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" onClick={()=>setCategory(data.value)}/>
                          <label className="form-check-label inline-block text-gray-800">
                            {data.value}
                          </label>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              {/* Card Domain Info */}
              <div className="w-full border-black border-[2px] border-gray-300 rounded-lg mt-6">
                <div className="w-full h-[50px] bg-gray-100 flex items-center px-5 rounded-t-lg">
                  Domain Info
                </div>
                <div className="px-5 mt-10 mb-10">
                  <h1 className="mb-2 text">Please write which domain the article belongs to:</h1>
                  <input type="text" placeholder="Enter Domain" className="input input-bordered w-full" onChange={(e)=>{setDomain(e.target.value)}}/>
                  <p className="text-[12px] mt-2 text-gray-400">Example: Computational linguistics, Bioinformatics, etc..</p>
                </div>
              </div>
              {/* Card Upload Article */}
              <div className="w-full border-black border-[2px] border-gray-300 rounded-lg mt-6">
                <div className="w-full h-[50px] bg-gray-100 flex items-center px-5 rounded-t-lg">
                  Upload article
                </div>
                <div className="px-5 mt-10 mb-10">
                  <h1 className="mb-2 text">Choose CSV file of annotation progress or pdf article</h1>
                  <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
                    <button onClick={(e) => (e.preventDefault())} className="h-[200px] border-2 w-[100%] rounded-md border-dashed opacity-60">
                      {
                        isSetFile? <p>File Berhasil Di Tambahkan</p>:<p>Upload Disini</p>
                      }
                    </button>
                  </FileUploader>
                </div>
              </div>
              {/* Card Upload Article */}
              <div className="mb-10">
                <button className="btn w-full  mt-6" onClick={handleSubmit}>
                  Submit
              </button>
              </div>
            </div>
          </div>
        </div>
        }
          
      </Layout>
    </>
  )
}

export default Annotation
