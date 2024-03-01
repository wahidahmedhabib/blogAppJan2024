import React, { useState } from 'react'
import { creatAccount } from '../FireBAse/auth';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { IoCamera } from 'react-icons/io5';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
const storage = getStorage();
const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [active, setActive] = useState(false)
    const [imgUrl, setImgUrl] = useState('')
    const [file, setFile] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signUp = async () => {
        if (file) {
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    switch (snapshot.state) {
                        case "paused":
                            break;
                        case "running":
                            break;
                    }
                },
                (error) => {
                    console.log("nahii uplode hue---->>>", error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setFile(downloadURL)
                        const data = creatAccount(name, email, password, downloadURL, dispatch, navigate, active, setActive)
                    });
                }
            );
        }
        else {
            const data = await creatAccount(name, email, password, file, dispatch, navigate, active, setActive)
        }
    }
    const urlImg = (e) => {
        let fileName = e.target.files[0]
        let filee = e.target.files[0]
        setFile(filee)
        let imageurl = URL.createObjectURL(fileName)
        setImgUrl(imageurl)
    }

    return (
        <div className=' min-h-64 mt-20 py-2 rounded-lg shadow-2xl shadow-blue-500/40  flex justify-center flex-col gap-2 items-center border-4 bg-white  m-4 w-80 '>
            <h1 className='font-bold text-2xl m-4'>Sign-Up</h1>
            <div className=' h-32'>

                <div className=' h-28 w-28 flex items-center justify-center   rounded-full mx-auto mt-4  '>
                    <img
                        src={`${imgUrl ? imgUrl : "src/assets/imgAvetar22.png"}`}
                        className='border-black border  h-full w-full bg-no-repeat rounded-full ' alt="pro PIC" />
                </div>
                <div
                    className=' flex items-center justify-center gap-4   h-9 font-bold my-2  text-white cursor-pointer'>
          
                </div>
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
                <input type="text"
                    className='border-2'
                    placeholder='Name' onChange={e => setName(e.target.value)} />

            </div>
            <div>
                <input
                    type="email"
                    className='border-2'
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)} />

            </div>
            <input type="password"
                className='border-2'
                placeholder='Passsword' onChange={e => setPassword(e.target.value)} />
            <div className='flex  gap-2 '>
                <button className='bg-blue-400 w-20  rounded-lg h-8 font-semibold' onClick={signUp}>
                    Sign Up
                </button>
                <button className='text-blue-500' >
                    <Link to={'/login'}>
                        LogIn?
                    </Link>
                </button>

            </div>

        </div>
    )
}

export default SignUp