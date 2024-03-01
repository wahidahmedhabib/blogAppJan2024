import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../FireBAse/fireBase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './Blogs';
import homeimag from '../assets/homeimag.webp'
// import AllPost from './AllPost'

function Home() {

    const [name, setname] = useState('')
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {

                // console.log(user)

                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // console.log(docSnap.data())
                    setname(docSnap.data().name)
                    // dispatch(logInAcc(docSnap.data()));
                } else {
                    alert("no Such Document Here...")
                }

            } else {
            }
        });
    }, []);


    return (
        <div className=' h-full w-full  px-2  mt-4'>
            <div className='min-h-80  flex flex-wrap tab:flex-row  flex-col my-2 '>
                <div className='  tab:w-[50%] w-full flex   flex-col   p-5'>
                    <div className='font-bold text-[40px] text-blue-500   '>
                        Have A Nice Day {name ? name : ''}
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
                        {/* <img src="/src/assets/homeimag.webp" className='h-full w-full rounde d-full round ed-[100%+30%+30%+100%] ' alt="iiii" /> */}
                        <img src={homeimag} className='h-full w-full rounde d-full round ed-[100%+30%+30%+100%] ' alt="iiii" />
                    </figure>
                </div>

            </div>

        </div>
    )
}

export default Home