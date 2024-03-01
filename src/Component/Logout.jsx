import React, { useEffect, useState } from 'react'


import { signOutBtn, updateEmailAddress, updateUserData } from '../FireBAse/auth'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../FireBAse/auth'
import { useDispatch, useSelector } from 'react-redux'

import { MdDelete } from "react-icons/md";
import { MdDoneOutline } from "react-icons/md";
import { IoCamera } from "react-icons/io5";
import { IoMdReturnLeft } from "react-icons/io";

import { FaEdit } from "react-icons/fa";
// import { uploade } from '../FireBAse/fireBase'
// import { RiImageEditFill } from "react-icons/ri";
// import { uploadeFile } from '../FireBAse/auth'
import Loader from './Loader'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { collection, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from './Blogs'
import { logInAcc, userDataUpdate } from '../store/authSlice'

const storage = getStorage();

function Logout() {
    const { id, name, email, image } = useSelector((state) => state.auth.currentUser)
    const [edit, setEdit] = useState(false)
    const [emailEdit, setEmailEdit] = useState(false)
    const [imgEdit, setImgEdit] = useState(false)
    const [editVal, setEditVal] = useState(name)
    const [emailval, setEmailVal] = useState(email)
    const [uid, setuid] = useState(id)
    const [downloadimg, setdownloadimg] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        setEditVal(name)
        setEmailVal(email)
        setuid(id)
    }, [name, email, id])

    const editAble = () => {
     
        setEdit(prev => prev = !prev)
        console.log(edit)
        if (edit) {
            updateUserData(uid, editVal, emailval)
        }
    }
    const emailEditAble = () => {
        setEmailEdit(prev => prev = !prev)
        if (emailEdit) {
            updateEmailAddress(emailval)
        }
    }
    const updateimg = () => {

        setImgEdit(perv => perv = !perv)
    }

    const logOut = () => {
        signOutBtn(navigate, dispatch)

    }
    const urlImg = (e) => {
        let fileName = e.target.files[0]
        setImgUrl(fileName)
    }
    const updateImage = () => {
        setLoading(true)
        if (imgUrl) {
            const storageRef = ref(storage, `images/${id}`);
            const uploadTask = uploadBytesResumable(storageRef, imgUrl);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    console.log("nahii uplode hue---->>>", error);
                    // reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const unsub = onSnapshot(doc(db, "users", id), (doc) => {
                            let data = doc.data()
                            const users = {
                                ...data,
                                image: downloadURL
                            }

                        })

                        setLoading(false)

                        setdownloadimg(downloadURL)
                        if (downloadURL) {
                            async function abc() {
                                const usersData = doc(db, 'users', id)
                                await updateDoc(usersData, {
                                    image: downloadURL
                                })
                                    .then(() => {
                                        dispatch(
                                            logInAcc({ image: downloadURL })
                                        )
                                        window.location.reload(false);

                                    })
                            }
                            abc()
                        }
                    });
                }
            );
        }
        else {
            console.log('nahii hy imagess...')
        }
    }

    return (
        <div className=' flex flex-col  h-[80vh] w-full justify-center items-center mt-10'>
            {imgEdit ?
                <div className='bg-sla te-400 h-[290px] w-[250px] flex flex-col gap-2'>
                    <div className='shadow-2xl shadow-blue-300 bg-white'>

                        <div className='  h-28 w-28 flex items-center justify-center border-2 border-black  rounded-full mx-auto mt-4  '>
                            {
                                loading ?
                                    <>
                                        <Loader />
                                    </>
                                    :
                                    <img
                                        src={`${image ? image : "src/assets/imgAvetar22.png"}`}
                                        className=' h-28 w-28 rounded-full ' alt="pro PIC" />
                            }
                        </div>

                        <div
                            className=' flex  justify-center gap-8   h-9 font-bold my-4  text-white cursor-pointer'>
                            <button onClick={() => updateImage()} className='w-[100px] relative top-5 bg-blue-400'>update Img</button>
                        </div>
                        <button
                            onClick={updateimg}
                            className=' h-8 w-8 drop-shadow-lg shadow-2xl  shadow-blue-400 flex items-center justify-center rounded-full text-xl border-2 
                             relative bottom-[70%] left-[85%]   ' >
                            <label htmlFor={''}
                            >
                                <IoMdReturnLeft />
                            </label>
                        </button>
                        <button
                            className=' h-8 w-8 drop-shadow-lg shadow-2xl shadow-blue-400 flex  items-center justify-center rounded-full text-xl border-2  
                            relative bottom-[55%] left-[60%]   ' >
                            <label htmlFor={"img"}
                            >
                                <IoCamera />
                            </label>
                        </button>

                        <input type="file"
                            className='hidden'
                            onChange={urlImg}
                            id="img" />

                    </div>
                </div>
                :
                <>
                    <div className='bg-white py-2 rounded-lg shadow-2xl shadow-blue-400 min-h-[290px] w-[250px] flex flex-col gap-2'>
                        <div className=' '>
                            <div className='  h-24 w-28 flex items-center justify-center   rounded-full mx-auto mt-4  '>
                                <img src={`${image ? image : "src/assets/imgAvetar22.png"}`}
                                    className=' h-28 w-28 rounded-full border border-black' alt="pro PIC" />
                            </div>

                            <button
                                onClick={updateimg}
                                className=' h-8 w-8 drop-shadow-lg flex
                                            items-center justify-center rounded-full
                                            text-xl border-2  relative bottom-[80%] left-[85%]   ' >
                                <FaEdit />
                            </button>
                        </div>
                        <div className='border- flex mx-1'>

                            {
                                loading ?
                                    <>
                                        <Loader size={17} />
                                    </>
                                    :
                                    <>
                                        <input type="text"
                                            className={` w-full bg-transparent ${edit ? 'bg-gray-500 outline-none' : ''}`}
                                            value={editVal ? editVal : "nam"}
                                            onChange={e => setEditVal(e.target.value)}
                                            id="name"
                                            disabled={edit ? false : true} />
                                        <label htmlFor="name"
                                            className='cursor-pointer'
                                            onClick={editAble} >
                                            {edit ?
                                                <MdDoneOutline className='text-xl' />
                                                : <FaEdit className='text-2xl' />
                                            }
                                        </label>
                                    </>
                            }
                        </div>
                        <div
                            className='border- flex mx-1'>

                            {loading ?
                                <div className='my-2' > <Loader size={17} /></div>
                                :
                                <>
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
                                </>
                            }
                        </div>
                        <button className='w-[250px] flex items-center justify-center bg-blue-400 h-9 font-bold my-2  text-white cursor-pointer'>
                            <MdDelete className='text-xl' />  Delete Account
                        </button>
                        <button onClick={logOut}
                            className='w-[250px] bg-blue-400 h-9 font-bold  text-white cursor-pointer'>
                            LogOut
                        </button>
                    </div>
                </>
            }
        </div>
    )
}

export default Logout

