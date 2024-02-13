import React, { useState } from 'react'

// import { getAuth } from "firebase/auth";
import { creatAccount } from '../FireBAse/auth';

import { useDispatch, useSelector } from 'react-redux'
// const auth = getAuth(app)
// import { creatAccount } from '../FireBAse/auth';

import { createAcc, logInAcc } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { IoCamera } from 'react-icons/io5';

import { uploadeFile } from '../FireBAse/auth';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
// import { uploadeFile } from '../FireBAse/fireBase';

const storage = getStorage();

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [active, setActive] = useState(false)
    // const [edit, setEdit] = useState(false)
    const [imgUrl, setImgUrl] = useState('')
    const [file, setFile] = useState('')

    const getData = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    console.log(getData.userList)
    console.log(getData.currentUser)
    console.log(file)

    const signUp = async () => {
        if (file) {
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
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
                        setFile(downloadURL)
                        const data = creatAccount(name, email, password, downloadURL, dispatch, navigate, active, setActive)
                        // const data =  creatAccount(name, email, password, downloadURL, dispatch, navigate, active, setActive)
                        console.log("File available at", downloadURL);
                    });
                }
            );
        }
        else {
            const data = await creatAccount(name, email, password, file, dispatch, navigate, active, setActive)
        }
        // uploadeFile(imgUrl)
        // dispatch(logInAcc(data))
    }
    const urlImg = (e) => {
        // console.log(e.target.files[0])

        let fileName = e.target.files[0]
        let filee = e.target.files[0]
        //  (file) {
        setFile(filee)
        // console.log(file);
        // return new Promise((resolve, reject) => {

        // });
        //   },
        let imageurl = URL.createObjectURL(fileName)
        setImgUrl(imageurl)

        // console.log(imgUrl)
    }

    return (
        <div className=' min-h-64 mt-20  flex justify-center flex-col gap-2 items-center border-4 bg-blue-700 m-4 w-80 '>
            <h1 className='font-bold text-2xl m-4'>Sign-Up</h1>

            <div className='border-yellow-600 h-32 border-2'>

                <div className=' border-2 border-red-800 h-28 w-28 flex items-center justify-center   rounded-full mx-auto mt-4  '>

                    <img
                        // onChange={urlImg}
                        // onChange={}

                        src={`${imgUrl ? imgUrl : " /src/assets/imgAvetar22.png"}`}
                        // src={`${edit ? imgUrl : " /src/assets/imgAvetar22.png"}`}
                        className='border-black border-2  h-full w-full bg-no-repeat rounded-full ' alt="pro PIC" />
                </div>

                <div
                    className=' flex items-center justify-center gap-4   h-9 font-bold my-2  text-white cursor-pointer'>
                    {/* <button
                        onClick={() => uploadeFile(imgUrl)}
                        className='w-[100px] border bg-blue-900'>uploade</button> */}

                    {/* <button className='w-[100px] border bg-blue-900'>upDate</button> */}
                </div>
                {/* <RiImageEditFill className='relative top-5 left-5 ' /> */}
                <button
                    className=' h-8 w-8 drop-shadow-lg shadow-2xl
                         shadow-blue-700 flex
                          items-center justify-center rounded-full
                          text-xl border-2  relative bottom-24 left-[90px] ' >
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
            <div>
                <input type="text" placeholder='Name' onChange={e => setName(e.target.value)} />

            </div>
            <div>
                <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />

            </div>
            <input type="password" placeholder='Passsword' onChange={e => setPassword(e.target.value)} />
            <div className='gap-2'>
                <button>
                    LogIn?
                </button>
                <div>

                </div>
                <button onClick={signUp}>
                    SignUp
                </button>
            </div>

        </div>
    )
}

export default SignUp