import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { authService } from '../FireBAse/auth';
import { logInAccount } from '../FireBAse/auth';
import { useDispatch } from 'react-redux';
import { logInAcc } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function LogIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // console.log(authService)
    // console.log(logInAccount)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logIn = () => {
        console.log("LogInnnn...")

        logInAccount(email, password, navigate)
        // dispatch(logInAcc({ email, password }))

    }
    const signUp = () => {
        console.log(email, password)
    }
    return (
        <div>
            <div className=' h-64  flex justify-center flex-col gap-2 items-center border-4 bg-blue-700 m-4 w-80 '>
                <h1 className='font-bold text-2xl m-4'>LogIn </h1>

                <div>
                    <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />

                </div>
                <input type="password" placeholder='Passsword' onChange={e => setPassword(e.target.value)} />
                <div className='gap-2'>
                    <button onClick={logIn}>
                        LogIn
                    </button>
                    <div>

                    </div>
                    <button onClick={signUp}>
                        SignUp?
                    </button>
                </div>

            </div>
        </div>
    )
}

export default LogIn