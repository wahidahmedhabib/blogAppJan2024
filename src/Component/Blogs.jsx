import React, { useEffect, useState } from "react";
// import require
// import { Firestore , firestore } from 'firebase/firestore'
// import Swal from "sweetalert2";
// import EditPage from "./EditPage";
import { Firestore, doc, getDoc } from "firebase/firestore";
import { deleteData, getAllData, getData, updateData } from "../FireBAse/auth";
import { useDispatch, useSelector } from "react-redux";
import { reciveData } from "../store/authSlice";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";

import {
  getDocs,
  collection,
  getFirestore,
  deleteDoc,
} from "firebase/firestore";
import { addBlog, deleteBlog } from "../store/authSlice";
import { app, auth } from "../FireBAse/fireBase";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";


// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'


export const db = getFirestore(app);

function Blogs({ blog }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editt, setEditt] = useState(false)
  const [titleVal, setTitleVal] = useState(blog.title)
  const [paraval, setParaVal] = useState(blog.para)
  const { pathname } = useLocation()
 
  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const docRef = doc(db, "users", user.uid);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         let userimg = docSnap.data().image
      
  //       } else {
  //         console.log("No such document!");
  //       }
  //     } else {
  //       console.log('user is not login!')
  //     }
  //   });

  const deleteBlogBtn = async (id) => {
    deleteData(id, dispatch)
  };
  const editBlogBtn = async (id) => {
    setEditt((prev) => prev = !prev)
  }
  const updateBtn = async (id) => {
    setEditt((prev) => prev = !prev)
    updateData(id, titleVal, paraval, blog, navigate)
  }

  return (
    <>
      <div
        className="min-h-40 bg-white max-w-3xl min-w-72  mob:w-full p-2 border-4 my-3 shadow-md rounded-2xl"
      >
        <div className="bg- white flex h-16 items-center px-1 border-b-2">
          <figure className="h-14 w-14 rounded-full border border-black flex items-center justify-center">
            <img className="h-full w-full bg-center rounded-full"
              src={blog.image ? blog.image : 'src/assets/imgAvetar22.png'}
              alt="" />
          </figure>
          <div className="px-2 w-[90%] ">
            {
              editt ?
                <div className="  ">
                  <input value={titleVal}
                    className="w-full px-1 h-full "
                    onChange={e => setTitleVal(e.target.value)}

                    type="text" placeholder="editt krlooo.." />
                </div>
                :
                <div className="font-bold   borde r-4    ">
                  {blog?.title ? blog.title : "blog titlee"}
                </div>
            }

            <p>
              {
                blog?.name ? blog.name : "blog name"
              }
            </p>
          </div>
        </div>
        {editt ?
          <textarea placeholder='blogss heree'
            value={paraval}
            onChange={e => setParaVal(e.target.value)}
            className=' min-h-28 my-2 max-w-3xl w-full
            resize-none
               text text-wrap text-center'
          >

          </textarea>
          :
          <div className=" min-h-28 my-2 max-w-3xl   text text-wrap   ">
            {blog?.para
              ? blog.para
              : " ara jsjwd ssd jas sjj djas raryt araty werar aa"}
          </div>
        }
        <div className="w-[180px] h-9 flex justify-between gap-2 my-3">
          {
            pathname == '/your-posts' ?
              <>
                <button
                  onClick={() => deleteBlogBtn(blog.key)}
                  className=" border-red-500 border   w-[50%] 
                  
                  flex justify-center items-center text-2xl
                  
                  text-red-500 hover:text-red-300
                  "
                >
                  <MdDelete />
                </button>
                {
                  editt ?
                    <button
                      onClick={() => updateBtn(blog.key)}
                      className=" border-green-400 border w-[50%]  
                      flex justify-center items-center text-2xl 
                      text-green-500 hover:text-green-300 ">
                      <MdDoneOutline />
                    </button>
                    : <button
                      onClick={() => editBlogBtn(blog.key)}
                      className=" border-green-500 border   w-[50%] 
                      flex justify-center items-center text-2xl 
                      text-green-500 hover:text-green-300"

                    >
                      <FaEdit />
                    </button>
                }
              </>
              : ''
          }
        </div>
      </div>

    </>
  );
}
export default Blogs;
