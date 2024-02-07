import React, { useEffect } from 'react'
import AllPost from './AllPost'
// import { getAllData } from '../FireBAse/db'

// import Loader from './Loader'
function Home() {
    return (
        <div className='h-full   bg-b lue-200 w-[95%]'>
            {/* <Loader /> */}
            <AllPost />
        </div>
    )
}

export default Home