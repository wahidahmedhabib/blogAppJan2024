import React, { useEffect, useState } from "react";
// import require
// import { Firestore , firestore } from 'firebase/firestore'
// import Swal from "sweetalert2";
// import EditPage from "./EditPage";
import { Firestore } from "firebase/firestore";
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
import { app } from "../FireBAse/fireBase";
import { useLocation, useNavigate } from "react-router-dom";


// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'


export const db = getFirestore(app);

function Blogs({ blog }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const blogState = useSelector(state => state.blogs.blogsList)
  // const userState = useSelector((state) => state.auth.userList);


  

  console.log(blog.image)
  // console.log(userState);

  const [editt, setEditt] = useState(false)
  const [titleVal, setTitleVal] = useState(blog.title)
  const [paraval, setParaVal] = useState(blog.para)


  const { pathname } = useLocation()
  // console.log(pathname)
  // useEffect(() => {
  //   async function allData() {
  //     try {
  //       let userArray = [];
  //       const userss = await getDocs(collection(db, "blogs"));
  //       userss.forEach((doc) => {
  //         let data = doc.data();
  //         let key = doc.id;
  //         data.key = key;
  //         userArray.push(data);
  //       });
  //       console.log(userArray)
  //       dispatch(reciveData(userArray));
  //       // let users = userss.docs.map((doc) => dispatch(reciveData(doc.data())));
  //       // const blogss = await getDocs(collection(db, "blogs"));
  //       // blogss.forEach((doc) => dispatch(addBlog(doc.data())));
  //       // let blogs = blogss.docs.map((doc) => dispatch(addBlog(doc.data())));
  //       // return users
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   allData();
  // }, []);


  // let blogId = []
  // userState?.map((id) => { console.log(id.key) })
  const deleteBlogBtn = async (id) => {
    console.log("deleteBlog...");
    deleteData(id, dispatch)
  };
  // const showSwal = () => {
  //   withReactContent(Swal).fire({
  //     title: <i>Input something</i>,
  //     input: 'text',
  //     // input: 'text',
  //     // titleVal,
  //     // paraval,

  //     preConfirm: () => {
  //       setTitleVal(Swal.getInput()?.value || '')
  //       setParaVal(Swal.getInput()?.value || '')
  //     },
  //   })
  // }


  // console.log(blog.image)

  const editBlogBtn = async (id) => {
    console.log("edit.....")
    // console.log(id)
    // console.log(editt)
    setEditt((prev) => prev = !prev)
  }

  const updateBtn = async (id) => {
    console.log("update.....")
    // console.log(id)
    // console.log(editt)
    setEditt((prev) => prev = !prev)
    updateData(id, titleVal, paraval, blog, navigate)
  }
  // console.log(editt)

  return (
    <>


      <div
        // key={id}
        className="min-h-40 max-w-3xl min-w-72  mob:w-full p-1 border-4 my-3"
      >
        <div className="bg-slate-200 flex h-16 items-center px-1">
          <figure className="h-14 w-14 rounded-full border border-black flex items-center justify-center">
            <img className="h-full w-full bg-center rounded-full"
            //  src='/src/assets/imgAvetar22.png'
             src={blog.image ? blog.image : '/src/assets/imgAvetar22.png'}
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
                // userState.map(user => console.log(user.id))
                blog?.name ? blog.name : "blog name"
              }
            </p>
          </div>
        </div>

        {editt ?
          <textarea placeholder='blogss heree'
            value={paraval}
            onChange={e => setParaVal(e.target.value)}
            className=' bg-slate-100 min-h-28 my-2 max-w-3xl w-full
            resize-none
               text text-wrap text-center'
          >

          </textarea>
          :
          <div className="bg-slate-100 min-h-28 my-2 max-w-3xl   text text-wrap text-center  ">
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
                  {/* delete */}
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
                      // className=" bg-green-400 w-[50%]"

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
