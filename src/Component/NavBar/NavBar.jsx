import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { ImCross } from "react-icons/im";

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, NavLink } from "react-router-dom";
import { auth } from '../../FireBAse/fireBase';
import { db } from '../Blogs';
import { doc, getDoc } from 'firebase/firestore';
import { logInAcc } from '../../store/authSlice';



function NavBar() {
    const active = useSelector(state => state.auth.currentUser)
    // const [userLogin, setUserLogin] = useState(false)
    const [resp, setResp] = useState(true)

    // console.log(active) 
    // const navigate = useNavigate()
    // console.log(navigate())
    const dispatch = useDispatch()
    // const [navItems, setNavItems] = useState([
    //     {
    //         name: 'Home',
    //         slug: '/',
    //         active: active
    //     },
    //     {
    //         name: 'blogs',
    //         slug: '/blogs',
    //         active: active
    //     },

    //     {
    //         name: "AllPosts",
    //         slug: "/all-post",
    //         active: active,
    //     },
    //     {
    //         name: "AddPost",
    //         slug: "/add-post",
    //         active: !active,
    //     },
    //     {
    //         name: 'Login',
    //         slug: '/login',
    //         active: !active
    //     },
    //     {
    //         name: 'SignUp',
    //         slug: '/signup',
    //         active: !active
    //     },
    // ])

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
                // console.log(user)
            } else {
                // console.log('user is not login!')
                alert('please logIn or Sign Up')
            }
        });
    }, []);

    const menuBtn = () => {
        // console.log("mnBtnnn...")
        // console.log(resp)
        setResp(perv => perv = !perv)
        // console.log(resp)

    }

    // console.log(navItems)

    return (
        // <nav className='bg-blue-500 h-[10vh] w-full flex items-center justify-between px-2   fixed top-0'>
        <nav className="bg-white w-full border-gray-200 dark:bg-blue-500 text-white fixed z-10 ">
            <div className
                ="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <figure className='text-white text-xl h-10 w-32 bord er flex items-center justify-center '>
                    <img src="/src/assets/logoo.png" className='' alt="" />
                </figure>
                {/* <div> */}
                <button
                    // data-collapse-toggle="navbar-default"
                    type="button"
                    className='w-9 h-9 flex justify-center items-center text-2xl   md:hidden md:w-auto border-2  '

                    onClick={menuBtn}
                //  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  hover:bg-blue-400 " 
                //  class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                // aria-controls="navbar-default" 
                // aria-expanded="false"
                >
                    {
                        resp ?
                            <TiThMenu />
                            :
                            <ImCross />
                    }
                </button>
                {/* // ya copyyy hyy */}
                <div className
                    ={` ${resp ? 'hidden ' : ''}  w-full md:block md:w-auto `}
                // id="navbar-default"
                >

                    {/* <ul className='flex gap-3 font-semibold text-lg text-white ' > */}
                    <ul className="font-medium text-xl flex flex-col gap-3 items-center p-4 md:p-0  
                     md:flex-row  md:m t-0 md:b order-0 
                     
                      ">

                        <NavLink to={'/'}
                            style={({ isActive }) => {
                                return isActive ? { color: "black" } : {};
                            }} 
                            // onClick={setResp(false)}
                        // className={`${resp ?'': 'border- 4 text-center' } `}
                        // className={`${(isactive)=> isactive? 'bg-slate-400' : ""}`}
                        >
                            {/* className={({ isactive }) => { isactive ? "bg-slate-800 font-light" : '' }}> */}
                            Home
                        </NavLink>

                        <NavLink to={'/all-post'}
                            style={({ isActive }) => {
                                return isActive ? { color: "black" } : {};
                            }}
                        // className={`border-4 text-center h-10 `}
                        >

                            AllPost
                        </NavLink>
                        {active.active && active.active ?
                            <>
                                <NavLink to={'/add-post'}
                                    style={({ isActive }) => {
                                        return isActive ? { color: "black" } : {};
                                    }}
                                    className={({ isactive }) => { isactive ? "bg-slate-800 font-light" : '' }}>
                                    addPost
                                </NavLink>
                                <NavLink to={'/your-posts'}
                                    style={({ isActive }) => {
                                        return isActive ? { color: "black" } : {};
                                    }}
                                    className={({ isactive }) => { isactive ? "bg-slate-800 font-light" : '' }}>
                                    {/* {active.name} */}
                                    YourPost
                                </NavLink>
                                <NavLink to={'/logout'}
                                    style={({ isActive }) => {
                                        return isActive ? { color: "black" } : {};
                                    }}
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
                                    className={({ isactive }) => { isactive ? "bg-slate-800 font-light" : '' }}>
                                    logIn
                                </NavLink>
                                <NavLink to={'/signup'}
                                    style={({ isActive }) => {
                                        return isActive ? { color: "black" } : {};
                                    }}
                                    className={({ isactive }) => { isactive ? "bg-slate-800 font-light" : '' }}>
                                    signUp
                                </NavLink>
                            </>
                        }



                        {/* {navItems.map((link, i) => {
                        return (
                        link.active ?  (
                            <Link key={i} to={link.slug} >
                                {link.name}
                            </Link>) : null
                        )
                    }
                    )}
                    {console.log(active)}
                    {!active && (<li>LogOut </li>)} */}
                    </ul>
                </div>

            </div>

        </nav>
    )
}

export default NavBar