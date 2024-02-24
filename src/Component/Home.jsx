import React, { useEffect } from 'react'
// import AllPost from './AllPost'
function Home() {
    return (
        <div className=' h-full w-full  px-2  mt-4'>
            <div className='min-h-80  flex flex-wrap tab:flex-row  flex-col my-2 '>
                <div className='  tab:w-[50%] w-full flex   flex-col   p-5'>
                    <div className='font-bold text-[40px] text-blue-500   '>
                        Have A Nice Day Bloger
                    </div>
                    <div className="my-4 text-xl">

                        We have observed in our long journey of installing
                        solar panel systems that whenever people plan to
                        install solar panels at their homes, they often
                        have two main reasons. The first and most important
                        reason is to get rid of electricity bills, and the
                        second reason is to somehow mitigate frequent
                    </div>
                </div>
                <div className=' tab:flex w-full  justify-center h-80 tab:w-[50%]  '>
                    <figure className=' h-80 w-full round ed-full  round ed-[90%+40%+30%+90%]'>
                        <img src="/src/assets/dac55fd0c0dd5cbe7a836d6274e681e8.gif" className='h-full w-full rounde d-full round ed-[100%+30%+30%+100%] ' alt="iiii" />
                    </figure>
                </div>

            </div>
         
        </div>
    )
}

export default Home