import "./App.css";

import SignUp from "./Component/SignUp";
import LogIn from "./Component/LogIn";
// import NavBar from "./Component/NavBar/NavBar";
import AddPost from "./Component/AddPost";
import Blogs from "./Component/Blogs";
import AllPost from "./Component/AllPost";
// import { getAllData } from './FireBAse/db'
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FireBAse/fireBase";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayOut from "./Component/LayOut";
import Home from "./Component/Home";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./FireBAse/auth";
import { logInAcc } from "./store/authSlice";
import Logout from "./Component/Logout";
import YourPosts from "./Component/YourPosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/all-post",
        element: <AllPost />,
      },
      {
        path: "/add-post",
        element: <AddPost />,
      },
      {
        path: "/your-posts",
        element: <YourPosts />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          dispatch(logInAcc(docSnap.data()));
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
        // console.log(user)
      } else {
        console.log('user is not login!')
      }
    });
  }, []);

  return (
    <>
      <div className="min-h-64 borde r-2 borde r-red-800  b g-yellow-400  ">
        {/* <div className=' min-h-40 m-4  border-2 flex flex-wrap items-center justify-center'> */}
        {/* <div> */}

        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
