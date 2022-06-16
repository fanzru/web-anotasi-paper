import type { NextPage } from 'next'
import Layout from "../components/Layout"
import { useSelector,  useDispatch } from "react-redux";
import {selectNavbarUrlValue} from '../redux/paperSlice';
const Home: NextPage = () => {
  const dataPaper = useSelector(selectNavbarUrlValue);
  console.log("Alhamdulillah bisa fetch api : ",dataPaper);
  return (
    <>
      <Layout >
      <div className=" flex justify-center">
          <div className=" mt-[100px] flex max-width-component w-[100%] px-5">
            <div className="w-1/2 border-2 border-gray-200 mr-5 p-10 rounded-lg">Pdf Viewer</div>
            <div className="w-1/2 ">
              Halo
            </div>
          </div>
        </div>
        
      </Layout>
    </>
  )
}

export default Home
