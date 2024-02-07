import React, { useEffect, useState } from 'react'


import { signOutBtn, updateEmailAddress, updateUserData } from '../FireBAse/auth'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../FireBAse/auth'
import { useDispatch, useSelector } from 'react-redux'

import { MdDelete } from "react-icons/md";
import { MdDoneOutline } from "react-icons/md";
import { IoCamera } from "react-icons/io5";

import { FaEdit } from "react-icons/fa";
// import { uploade } from '../FireBAse/fireBase'
import { RiImageEditFill } from "react-icons/ri";
import { uploadeFile } from '../FireBAse/auth'

function Logout() {

    const { id, name, email } = useSelector((state) => state.auth.currentUser)


    // console.log(id)
    // console.log(name)
    // console.log(email)

    const [edit, setEdit] = useState(false)
    const [emailEdit, setEmailEdit] = useState(false)
    const [editVal, setEditVal] = useState(name)
    const [emailval, setEmailVal] = useState(email)
    const [uid, setuid] = useState(id)

    const [images, setImages] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    // console.log(editVal)
    // console.log(emailval)
    useEffect(() => {

        // if (name) {

        setEditVal(name)
        setEmailVal(email)
        setuid(id)
        // }

    }, [name, email, id])

    // console.log(emailval)

    // console.log(id)

    // console.log(editVal)
    // console.log(emailval)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const editAble = () => {
        console.log('name')
        console.log(edit)
        setEdit(prev => prev = !prev)
        console.log(edit)
        // getUserData(uid.id, dispatch)
        if (edit) {
            console.log('updateted......')

            updateUserData(uid, editVal, emailval)
        }

    }
    const emailEditAble = () => {
        console.log('email.,.')
        setEmailEdit(prev => prev = !prev)
        if (emailEdit) {
            updateEmailAddress(emailval)
        }
    }
    const logOut = () => {
        console.log('logOut ..,.')
        signOutBtn(navigate, dispatch)


    }

    const uplodeImg = (e) => {
        console.log(e)
        console.log('imgg...')
        // uploade()
    }
    const urlImg = (e) => {
        console.log(e.target.files[0])
        let fileName = e.target.files[0]
        // let imageurl = URL.createObjectURL(fileName)
        setImgUrl(fileName)
        // console.log(imgUrl)
    }
    // const uploadeFile = () => {

    // }

    return (
        <div className=' flex flex-col  h-[80vh] w-full justify-center items-center mt-10'>
            <div className='bg-sla te-400 border-2 border-blue-700 h-[290px] w-[250px] flex flex-col gap-2'>
                <div className='border-yellow-600 border-2'>

                    <div className=' border-2 border-red-800 h-28 w-28 flex items-center justify-center   rounded-full mx-auto mt-4  '>                 
                        <img
                            // onChange={urlImg}
                            // onChange={}
                            src={`${edit ? imgUrl : " /src/assets/imgAvetar22.png"}`}
                            className='border-black border-2' alt="pro PIC" />
                    </div>

                    <div
                        className=' flex items-center justify-center gap-4   h-9 font-bold my-2  text-white cursor-pointer'>
                        <button
                            onClick={() => uploadeFile(imgUrl)}
                            className='w-[100px] bg-blue-700'>uploade</button>

                        <button className='w-[100px] bg-blue-700'>upDate</button>
                    </div>
                    {/* <RiImageEditFill className='relative top-5 left-5 ' /> */}
                    <button
                        className=' h-8 w-8 drop-shadow-lg shadow-2xl
                        shadow-blue-700 flex
                        items-center justify-center rounded-full
                        text-xl border-2  relative bottom-[50%] left-[160px] ' >
                        <label htmlFor="img"
                        >
                            <IoCamera />
                        </label>
                    </button>
                    <input type="file"
                        className='hidden'
                        onChange={urlImg}
                        id="img" />

                </div>
                <div className='border- flex mx-1'>
                    <input type="text"
                        className={` w-full bg-transparent ${edit ? 'bg-gray-500 outline-none' : ''}`}
                        value={editVal ? editVal : "nam"}
                        onChange={e => setEditVal(e.target.value)}
                        id="name"
                        disabled={edit ? false : true} />
                    <label htmlFor="name"
                        className='cursor-pointer'
                        onClick={editAble} > {edit ?
                            <MdDoneOutline className='text-xl' />
                            : <FaEdit className='text-2xl' />
                        }</label>
                </div>
                <div
                    className='border- flex mx-1'>
                    <input type="text"
                        className={` w-full bg-transparent ${emailEdit ? 'bg-gray-500 outline-none' : ''}`}
                        value={emailval ? emailval : 'email'}
                        name="" id="email"
                        onChange={e => setEmailVal(e.target.value)}
                        disabled={emailEdit ? false : true} />
                    <label htmlFor="email"
                        className='cursor-pointer'
                        onClick={emailEditAble} >

                        {emailEdit ?
                            <MdDoneOutline className='text-xl' />
                            : <FaEdit className='text-2xl' />}
                    </label>
                </div>
            </div>
            {/* <button
                onClick={uplodeImg}
                className='w-[250px] flex items-center justify-center bg-blue-600 h-9 font-bold my-2  text-white cursor-pointer'>
                <FaEdit className='text-xl' />  update Image
            </button> */}
            <button className='w-[250px] flex items-center justify-center bg-blue-600 h-9 font-bold my-2  text-white cursor-pointer'>
                <MdDelete className='text-xl' />  Delete Account
            </button>
            <button onClick={logOut}
                className='w-[250px] bg-blue-600 h-9 font-bold  text-white cursor-pointer'>
                LogOut
            </button>
        </div>
    )
}

export default Logout