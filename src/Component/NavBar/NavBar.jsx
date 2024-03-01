import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import { auth } from '../../FireBAse/fireBase';
import { db } from '../Blogs';
import { doc, getDoc } from 'firebase/firestore';
import { logInAcc } from '../../store/authSlice';
import navlogo from '../../assets/navlogo.png'


function NavBar() {
    const active = useSelector(state => state.auth.currentUser)
    const [resp, setResp] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {

                    dispatch(logInAcc(docSnap.data()));
                } else {
                    alert("no Such Document Here...")
                }

            } else {
            }
        });
    }, []);

    const menuBtn = () => {
        setResp(perv => perv = !perv)
    }
    return (
        <nav className="bg-blue-400 w-full border-gray-200  text-white fixed z-10 ">
            <div className
                ="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <figure className='text-white text-xl h-7 w-32 bord er flex items-center justify-center '>
                    <img src={navlogo} className='' alt="" />
                </figure>
                <button
                    type="button"
                    className=' flex justify-center items-center text-2xl   md:hidden md:w-auto border-2  '

                    onClick={menuBtn}
                >
                    {
                        resp ?
                            <TiThMenu />
                            :
                            <ImCross />
                    }
                </button>
                <div className
                    ={` ${resp ? 'hidden ' : ''}   w-full md:block md:w-auto `}
                >
                    <ul className="font-medium text-xl flex flex-col gap-8 items-center p-4 md:p-0  
                     md:flex-row  
                      ">
                        <NavLink to={'/'}
                            style={({ isActive }) => {
                                return isActive ? { color: "black" } : {};
                            }}
                            onClick={() => setResp(true)}
                        >
                            Home
                        </NavLink>

                        <NavLink to={'/all-post'}
                            style={({ isActive }) => {
                                return isActive ? { color: "black" } : {};
                            }}
                            onClick={() => setResp(true)}

                        // className={`border-4 text-center h-10 `}
                        >

                            All Blogs
                        </NavLink>
                        {active.active && active.active ?
                            <>
                                <NavLink to={'/add-post'}
                                    style={({ isActive }) => {
                                        return isActive ? { color: "black" } : {};
                                    }}
                                    onClick={() => setResp(true)}

                                    className={({ isactive }) => { isactive ? "bg-slate-800 font-light" : '' }}>
                                    add Blog
                                </NavLink>
                                <NavLink to={'/your-posts'}
                                    style={({ isActive }) => {
                                        return isActive ? { color: "black" } : {};
                                    }}
                                    onClick={() => setResp(true)}

                                    className={({ isactive }) => { isactive ? "bg-slate-800 font-light" : '' }}>
                                    Your Blogs
                                </NavLink>
                                <NavLink to={'/logout'}
                                    style={({ isActive }) => {
                                        return isActive ? { color: "black" } : {};
                                    }}
                                    onClick={() => setResp(true)}

                                    className={({ isactive }) => { isactive ? "bg-slate-800 font-light" : '' }}>
                                    {active.name}
                                </NavLink>
                            </>
                            :
                            <>
                                <NavLink to={'/login'}
                                    style={({ isActive }) => {
                                        return isActive ? { color: "black" } : {};
                                    }}
                                    onClick={() => setResp(true)}
                                    className={' p '}
                                >
                                    logIn
                                </NavLink>
                                <NavLink to={'/signup'}
                                    style={({ isActive }) => {
                                        return isActive ? { color: "black" } : {};
                                    }}
                                    onClick={() => setResp(true)}
                                    className={''}
                                >
                                    signUp
                                </NavLink>
                            </>
                        }
                    </ul>
                </div>

            </div>

        </nav>
    )
}

export default NavBar