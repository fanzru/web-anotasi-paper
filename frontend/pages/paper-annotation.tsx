import type { NextPage } from 'next'
import Layout from "../components/Layout"
import { useSelector,  useDispatch } from "react-redux";
import {selectNavbarUrlValue} from '../redux/paperSlice';
import DataAx from "../data/dummy_az_identification"
import {useState} from 'react'
const Home: NextPage = () => {
  const [numberSection, setNumberSection] = useState(0)
  const sections = DataAx.sections
  // const dataPaper = useSelector(selectNavbarUrlValue);
  // console.log("Alhamdulillah bisa fetch api : ",dataPaper);
  return (
    <>
      <Layout >
      <div className=" flex justify-center">
          <div className=" mt-[100px] flex max-width-component w-[100%] px-5">
            <div className="w-1/2 border-2 border-gray-200 mr-5 p-10 rounded-lg">Pdf Viewer</div>
            <div className="w-1/2 ">

              <div className="w-full h-full">
                {/* Colapse Quick To How*/}
                <div className="my-w collapse w-full border rounded-md border-base-300 collapse-arrow">
                  <input type="checkbox"/> 
                  <div className="collapse-title text-xl font-medium font-bold">
                    Quick How To
                  </div> 
                  <div className="collapse-content"> 
                    Ini Merupakan Sebuah Deskripisi
                  </div>
                </div> 

                {/*  Guidelines*/}
                <div className="my-w collapse w-full border rounded-md border-base-300 collapse-arrow mt-6">
                  <input type="checkbox"/> 
                  <div className="collapse-title text-xl font-medium font-bold">
                   Guidelines
                  </div> 
                  <div className="collapse-content"> 
                    Ini Merupakan Sebuah Deskripisi
                  </div>
                </div> 

                {/* Paper Data */}
                {
                  DataAx.sections.map((data,idx)=> {
                    return (
                      <div key={idx} className="">
                        {
                          data.selected_sentences.length != 0? data.section_name : "" 
                        }
                      </div>
                    )
                  })
                }
                <div className="flex justify-between mt-10">
                  <button className="btn">
                    PREV
                  </button>
                  <button className="btn">
                    NEXT
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
        
      </Layout>
    </>
  )
}

export default Home
