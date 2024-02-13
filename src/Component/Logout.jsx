import React, { useEffect, useState } from 'react'


import { signOutBtn, updateEmailAddress } from '../FireBAse/auth'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../FireBAse/auth'
import { useDispatch, useSelector } from 'react-redux'

import { MdDelete } from "react-icons/md";
import { MdDoneOutline } from "react-icons/md";
import { IoCamera } from "react-icons/io5";
import { IoMdReturnLeft } from "react-icons/io";

import { FaEdit } from "react-icons/fa";
// import { uploade } from '../FireBAse/fireBase'
import { RiImageEditFill } from "react-icons/ri";
import { uploadeFile } from '../FireBAse/auth'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { collection, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from './Blogs'
import { userDataUpdate } from '../store/authSlice'

const storage = getStorage();

function Logout() {

    // const image = useSelector(state => state.auth.currentUser.image)
    // console.log(image)

    const { id, name, email, image } = useSelector((state) => state.auth.currentUser)

    const [edit, setEdit] = useState(false)
    const [emailEdit, setEmailEdit] = useState(false)
    const [imgEdit, setImgEdit] = useState(false)
    const [editVal, setEditVal] = useState(name)
    const [emailval, setEmailVal] = useState(email)
    const [uid, setuid] = useState(id)

    const [downloadimg, setdownloadimg] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    console.log(image)
    console.log(id)
    // console.log(email)

    // console.log(editVal)
    // console.log(emailval)
    useEffect(() => {

        // if (name) {

        setEditVal(name)
        setEmailVal(email)
        setuid(id)
        // }

    }, [name, email, id])

    // useEffect(() => {

    //     // if (downloadimg) {
    //     try {

    //         async function abc() {
    //             let userArray = []
    //             const userss = await getDocs(collection(db, "blogs"))
    //             userss.forEach(doc => {
    //                 userArray.push(doc.data())
    //             })

    //             console.log(userss)
    //             console.log(userArray)
    //             dispatch(userDataUpdate(userArray))
    //         }
    //         abc()
    //     } catch (err) {
    //         console.log(err)
    //     }
    //     // }
    // }, [downloadimg])

    // console.log(emailval)
    // console.log(imgUrl)

    // console.log(id)

    // console.log(editVal)
    // console.log(emailval)
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
    const updateimg = () => {

        setImgEdit(perv => perv = !perv)
    }

    const logOut = () => {
        console.log('logOut ..,.')
        signOutBtn(navigate, dispatch)


    }
    // const uplodeImg = (e) => {
    //     console.log(e)
    //     console.log('imgg...')
    //     // uploade()
    // }
    const urlImg = (e) => {
        // console.log(e.target.files[0])
        let fileName = e.target.files[0]
        // let imageurl = URL.createObjectURL(fileName)
        setImgUrl(fileName)
        // console.log(imgUrl)
    }
    const updateImage = () => {
        if (imgUrl) {
            //  const uploadeFile = (file) => {
            //     console.log(file);
            //     return new Promise((resolve, reject) => {
            //     })
            // }
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
                        // resolve(downloadURL);
                        // imges.src = downloadURL
                        // setFile(downloadURL)
                        // const washingtonRef = doc(db, "users", id);
                        // updateDoc(washingtonRef, {
                        //     images: downloadURL
                        // });
                        const unsub = onSnapshot(doc(db, "users", id), (doc) => {
                            console.log("Current data: ", doc.data());
                        })

                        console.log(unsub)
                        setdownloadimg(downloadURL)
                        console.log("File available at", downloadURL);
                        if (downloadURL) {
                            async function abc() {
                                let userArray = []
                                const userss = await getDocs(collection(db, "blogs"))
                                userss.forEach(doc => {
                                    userArray.push(doc.data())
                                })
                                dispatch(userDataUpdate(userArray))
                                console.log(userss)
                                console.log(userArray)
                                window.location.reload(false);
                            }
                            abc()
                        }
                        // let userArry = []
                        //     .then(docs => {
                        //         docs.forEach(doc => {
                        //             userArry.push(doc.data())
                        //             // console.log(doc.data())
                        //         })
                        //         dispatch(updateUserData(userArry))
                        //         // console.log(doc)
                        //     })
                        // console.log(userss)
                        // userss.map((doc) => {
                        //     console.log(doc)
                        //     // let data = doc.data();
                        //     // let key = doc.id;
                        //     // data.key = key;
                        //     // userArray.push(data);
                        // });
                        // dispatch(updateUserData(washingtonRef))
                        // const data = creatAccount(name, email, password, downloadURL, dispatch, navigate, active, setActive)

                        // const data =  creatAccount(name, email, password, downloadURL, dispatch, navigate, active, setActive)
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
                <div className='bg-sla te-400 border- 2 border-blue-700 h-[290px] w-[250px] flex flex-col gap-2'>
                    <div className='border-yellow-600 border-2'>
                        <div className='  h-28 w-28 flex items-center justify-center   rounded-full mx-auto mt-4  '>
                            <img
                                src={`${image ? image : "/src/assets/imgAvetar22.png"}`}
                                className=' h-28 w-28 rounded-full' alt="pro PIC" />
                        </div>
                        <div
                            className=' flex  justify-center gap-8   h-9 font-bold my-4  text-white cursor-pointer'>
                            <button onClick={() => updateImage()} className='w-[100px] relative top-5 bg-blue-700'>update Img</button>
                        </div>
                        <button
                            onClick={updateimg}
                            className=' h-8 w-8 drop-shadow-lg shadow-2xl  shadow-blue-700 flex items-center justify-center rounded-full text-xl border-2 
                             relative bottom-[70%] left-[85%]   ' >
                            <label htmlFor={''}
                            >
                                <IoMdReturnLeft />
                            </label>
                        </button>
                        <button
                            className=' h-8 w-8 drop-shadow-lg shadow-2xl shadow-blue-700 flex  items-center justify-center rounded-full text-xl border-2  
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
                    <div className='bg-slat e-400 border-2 border-blue-700 min-h-[290px] w-[250px] flex flex-col gap-2'>
                        <div className='border-yellow-600 border-2'>

                            <div className='  h-28 w-28 flex items-center justify-center   rounded-full mx-auto mt-4  '>
                                <img src={`${image ? image : "/src/assets/imgAvetar22.png"}`}
                                    className=' h-28 w-28 rounded-full' alt="pro PIC" />
                            </div>
                            <div
                                className=' flex items-center justify-center gap-4   h-9 font-bold my-2  text-white cursor-pointer'>
                            </div>
                            <button
                                onClick={updateimg}
                                className=' h-8 w-8 drop-shadow-lg shadow-2xl
                        shadow-blue-700 flex
                        items-center justify-center rounded-full
                        text-xl border-2  relative bottom-[80%] left-[85%]   ' >
                                <FaEdit />
                            </button>
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
                        <button className='w-[250px] flex items-center justify-center bg-blue-600 h-9 font-bold my-2  text-white cursor-pointer'>
                            <MdDelete className='text-xl' />  Delete Account
                        </button>
                    </div>
                    <button onClick={logOut}
                        className='w-[250px] bg-blue-600 h-9 font-bold  text-white cursor-pointer'>
                        LogOut
                    </button>
                </>
            }

        </div>
    )
}

export default Logout

