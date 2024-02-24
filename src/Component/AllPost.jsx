import React, { useEffect, useState } from 'react'
import Blogs, { db } from './Blogs'
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { reciveData } from '../store/authSlice';
import Loader from './Loader';

function AllPost() {

    const [loading, setLoading] = useState(true)
    const userState = useSelector((state) => state.auth.userList);
    const dispatch = useDispatch()
    useEffect(() => {
        async function allData() {
            try {
                let blogsArray = [];
                const blogss = await getDocs(collection(db, "blogs"));
                blogss.forEach((doc) => {
                    let data = doc.data();
                    let key = doc.id;
                    data.key = key;
                    blogsArray.push(data);
                });
                let usersArray = []
                const userss = await getDocs(collection(db, 'users'))
                userss.forEach((doc) => {
                    usersArray.push(doc.data())
                })
                let finalArray = []
                blogsArray.map((blogg) => {
                    usersArray.map((user) => {
                        if (blogg.userId == user.id) {
                            finalArray.push({ ...blogg, ...user })
                        }
                    })
                })
                dispatch(reciveData(finalArray));
                setLoading(false)
            } catch (err) {
                console.log(err);
            }
        }
        allData();
    }, []);

    return (
        <div className='flex flex-wrap  min-w-72  items-center justify-center mt-20 gap-3 bor der-4 bord er-red-700  '>
            {
                loading ? <div className='h-[75vh]  '>
                    <Loader size={120} />
                </div>
                    :
                    userState?.map((blog) => {
                        return (
                            <Blogs blog={blog} key={blog.key} />
                        )
                    })
            }
        </div>
    )
}

export default AllPost