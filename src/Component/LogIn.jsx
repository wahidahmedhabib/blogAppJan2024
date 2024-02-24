import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { authService } from '../FireBAse/auth';
import { logInAccount } from '../FireBAse/auth';
import { useDispatch } from 'react-redux';
import { logInAcc } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';

function LogIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logIn = () => {
        logInAccount(email, password, navigate)
    }
    return (
        <div className='h-[80vh] w-80   flex items-center '>
            <div className=' h-64  flex  flex-col gap-2 items-center border-4 bg-white  shadow-2xl shadow-blue-500/40 max-w-2xl w-screen min-w-80 '>
                <h1 className='font-bold text-2xl m-4'>LogIn </h1>
                <div>
                    <input type="email" className='border-2 px-1' placeholder='Email' onChange={e => setEmail(e.target.value)} />
                </div>
                <input type="password" className='border-2 px-1' placeholder='Passsword' onChange={e => setPassword(e.target.value)} />
                <div className='flex  gap-2 '>
                    <button
                        className='bg-blue-400 w-20  rounded-lg h-8 font-semibold'
                        onClick={logIn}
                    >
                        LogIn
                    </button>
                    <button className='text-blue-500' >
                        <Link to={'/signup'}>
                            Sign Up ?
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default LogIn