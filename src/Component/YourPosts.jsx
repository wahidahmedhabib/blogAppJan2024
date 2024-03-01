import React, { useEffect, useState } from 'react'
import Blogs, { db } from './Blogs'
import { useDispatch, useSelector } from 'react-redux'
import { collection, getDocs } from 'firebase/firestore'
import { reciveData } from '../store/authSlice'
import Loader from './Loader'
function YourPosts() {
  const blogs = useSelector(state => state.auth.userList)
  const users = useSelector(state => state.auth.currentUser.id)
  const [loading, setLoading] = useState(true)
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
          filterBlog.push(data)
        })
        dispatch(reciveData(filterBlog))
        setLoading(false)
      }
      catch (err) {
        console.log(err)
      }
    }
    editData()
  }, []);
  const fillterArry = blogs.filter((blog) => {
    if (blog.userId == users) {
      return blog
    }
  })


  return (
    <div className='mt-20'>
      {
        loading
          ?
          <div className='h-[75vh]'>
            <Loader />
          </div>
          :
          fillterArry.length > 0 ?
            fillterArry.map((blog) => {
              return (
                < Blogs blog={blog} key={blog.key} />
              )
            })
            :
            <>
              <div className=' h-32 text-2xl font-bold'>
                You Don't share any blog
              </div>
            </>
      }
    </div>
  )
}

export default YourPosts