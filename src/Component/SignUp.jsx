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
// import { uploadeFile } from '../FireBAse/fireBase';


const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [active, setActive] = useState(false)
    const [edit, setEdit] = useState(false)
    const [imgUrl, setImgUrl] = useState('')

    const getData = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log(getData)
    console.log(imgUrl)

    const signUp = async () => {

        const data = await creatAccount(name, email, password,imgUrl, dispatch, navigate, active, setActive)
        // console.log(data)
        // console.log(e.target.files[0])
        // uploadeFile(imgUrl)
        // dispatch(logInAcc(data))
    }
    const urlImg = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            uploadeFile(files[0])
                .then((downloadURL) => {
                    console.log("File uploaded successfully. Download URL:", downloadURL);
                    setImgUrl(downloadURL); // Assuming you have a state to store the URL
                })
                .catch((error) => {
                    console.error("Error uploading file:", error);
                });
        } else {
            console.error("No file selected.");
        }
    }
    

    return (
        <div className=' min-h-64 mt-20  flex justify-center flex-col gap-2 items-center border-4 bg-blue-700 m-4 w-80 '>
            <h1 className='font-bold text-2xl m-4'>Sign-Up</h1>

            <div className='border-yellow-600 h-32 border-2'>

                <div className=' border-2 border-red-800 h-28 w-28 flex items-center justify-center   rounded-full mx-auto mt-4  '>

                    <img
                        // onChange={urlImg}
                        // onChange={}
                        src={`${edit ? imgUrl : " /src/assets/imgAvetar22.png"}`}
                        className='border-black border-2' alt="pro PIC" />
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