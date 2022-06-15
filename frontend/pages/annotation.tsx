
import Layout from "../components/Layout"
import DataArticle from "../data/article"
import { useState } from "react"
import { FileUploader } from "react-drag-drop-files";
const Annotation = () => {
  const [file,setFile] = useState(null)
  const [category, setCategory] = useState("")
  const [domain,setDomain] = useState("")
  const fileTypes = ["CSV", "PDF"]
  const handleChange = (file: any) => {
    setFile(file)
  }

  return (
    <>
      <Layout >
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
                      <p>Upload Disini</p>
                    </button>
                  </FileUploader>
                </div>
              </div>
              {/* Card Upload Article */}
              <div className="mb-10">
                <button className="btn w-full  mt-6">
                  Submit
              </button>
              </div>
            </div>
          </div>
        </div>
          
      </Layout>
    </>
  )
}

export default Annotation
