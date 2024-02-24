import React, { useEffect, useState } from 'react'

import { addData, deleteData, updateData, authService } from '../FireBAse/auth'
import { useSelector } from 'react-redux'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { db } from './Blogs'
import { auth } from '../FireBAse/fireBase'
import Swal from 'sweetalert2'
import Loader from './Loader'
function AddPost() {
    const [title, setTitle] = useState('')
    const [para, setPara] = useState('')
    const userData = useSelector((state) => {
        return state.auth.currentUser
    })
    const [loading, setLoading] = useState(false)
    const addPost = () => {
        setLoading(true)
        if (title.length > 0 && para.length > 0) {
            setLoading(true)
            if (userData) {

                addData(title, para, userData.id, userData.name , setLoading)
                setPara('')
                setTitle('')
            } else {
                Swal.fire({
                    text: "Please LogIn Or SignUpopp",
                });
            }
        } else {
            Swal.fire({
                text: "empty Not Allow",
            });
        }


    }
    return (
        <>
            {
                loading ?
                    <>
                        <Loader />
                    </>
                    :
                    <div className=' w-full   mx-auto  mt-20  min-h-[60vh] flex justify-center'>
                        <div className='w-full max-w-2xl bg-white  flex items-center justify-center flex-col gap-3 p-3 '>
                            <input value={title} onChange={e => setTitle(e.target.value)} className='w-full border-2 px-2 focus:outline-blue-400' placeholder='Title..' type="text" />
                            <textarea value={para} onChange={e => setPara(e.target.value)} className='w-full  border-2 focus:outline-blue-400 px-2 resize-none' placeholder='Enter Blogs....' cols="30" rows="10" >
                            </textarea>
                            <button onClick={addPost} className='bg-blue-400 text-white font-bold w-full h-10 duration-500 ease-in hover:bg-blue-500 '>AddPost</button>
                        </div>
                    </div>
            }
        </>

    )
}

export default AddPost