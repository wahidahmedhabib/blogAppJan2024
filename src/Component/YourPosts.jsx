import React, { useEffect, useState } from 'react'
import Blogs, { db } from './Blogs'
import { useDispatch, useSelector } from 'react-redux'
import { collection, count, getDocs } from 'firebase/firestore'
import { reciveData } from '../store/authSlice'
import Loader from './Loader'

function YourPosts() {

  const blogs = useSelector(state => state.auth.userList)
  const users = useSelector(state => state.auth.currentUser.id)

  const [loading, setLoading] = useState(true)

  // console.log(blogs)

  // console.log(users)

  const dispatch = useDispatch()
  useEffect(() => {
    async function editData() {
      try {
        const snap = await getDocs(collection(db, 'blogs'))
        let filterBlog = []
        snap.forEach((doc) => {
          let data = doc.data()
          let key = doc.id
          data.key = key

          // console.log(data)
          // console.log(key)
          filterBlog.push(data)
        })
        dispatch(reciveData(filterBlog))
        setLoading(false)
        // console.log(filterBlog)
      }
      catch (err) {
        console.log(err)
      }
    }
    editData()
  }, []);


  const fillterArry = blogs.filter((blog) => {
    // console.log(blog)
    // console.log(users)
    if (blog.userId == users) {
      return blog
    }
    // return ( blog.userId == users ? (blog) : '') 
  })

  // console.log(fillterArry)

  return (
    <div className='mt-20'>
      {/* Yourr POSttsss */}
      {
        loading
          ?
          <div className='h-[75vh]'> <Loader /> </div>
          :
          fillterArry.map((blog) => {
            // console.log(blog)
            return (
              // {
              // blog.userId == users.id ?
              < Blogs blog={blog} key={blog.key} />
              // :
              // <>nahii hyyyyy</>
              // }
            )

          })
      }
      {/* <Blogs /> */}

    </div>
  )
}

export default YourPosts