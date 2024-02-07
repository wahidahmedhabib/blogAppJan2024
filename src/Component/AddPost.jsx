import React, { useEffect, useState } from 'react'

import { addData, deleteData, updateData, authService } from '../FireBAse/auth'
import { useSelector } from 'react-redux'

function AddPost() {
    const [title, setTitle] = useState('')
    const [para, setPara] = useState('')
    const userData = useSelector((state) => {
        return state.auth.currentUser
    })

    console.log(userData)
    // const blogData = useSelector((state) => {
    //     return state.auth.userList
    // })
    // console.log(blogData)
    const AddPost = () => {
        if (userData) {
            addData(title, para, userData.id, userData.name )
            setPara('')
            setTitle('')
        } else {
            alert("Please LogIn Or SignUpopp")
        }
    }
    return (
        <div className='Border-4 border-black   mx-auto  mt-20  min-h-[60vh] flex justify-center'>
            <div className='w-80 bord er-4 bor der-red-600  flex items-center justify-center flex-col gap-3 py-2 '>

                <input value={title} onChange={e => setTitle(e.target.value)} className='w-full  border-gray-400 border-2' placeholder='Title..' type="text" />
                <textarea value={para} onChange={e => setPara(e.target.value)} className='w-full border-2 border-gray-400 resize-none' placeholder='Enter Blogs....' cols="30" rows="10" >
                </textarea>
                <button onClick={AddPost} className='bg-blue-800 text-white font-bold w-full h-10 '>AddPost</button>
            </div>
        </div>
    )
}

export default AddPost