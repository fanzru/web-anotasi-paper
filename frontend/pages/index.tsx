import type { NextPage } from 'next'
import Layout from "../components/Layout"
import { useSelector,  useDispatch } from "react-redux";
const Home: NextPage = () => {
  const dispatch = useDispatch(selectLoginData)
  const dataLogin = useSelector(selectLoginData);
  return (
    <>
      <Layout >
          <div>
            tes
          </div>
      </Layout>
    </>
  )
}

export default Home
