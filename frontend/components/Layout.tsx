import Head from 'next/head'
import Navbar from "./Navbar"
import {FC} from 'react'
type Props = {
  children: React.ReactNode
}
const Layout: FC<Props> = ({ children,...props}) => {
  return (
    <div>
        <Head >
          <meta
            name="keywords"
            content=""
          />
          <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <div className=" w-full">
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default Layout;