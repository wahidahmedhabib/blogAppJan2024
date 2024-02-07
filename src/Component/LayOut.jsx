import React from 'react'
import NavBar from './NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
function LayOut() {
    return (
        <main className='h-full '>
            <NavBar />

            <div className=' w-full flex items-center justify-center border-2 bg-p ink-400 mb-[9vh]   '>

                <Outlet />

            </div>
            <Footer />
        </main>
    )
}

export default LayOut