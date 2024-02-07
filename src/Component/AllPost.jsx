import React, { useEffect, useState } from 'react'
import Blogs, { db } from './Blogs'
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { reciveData } from '../store/authSlice';
import Loader from './Loader';

function AllPost() {

    const [loading, setLoading] = useState(true)

    const userState = useSelector((state) => state.auth.userList);
    // console.log(userState);

    const iddddd = useSelector((state) => state.auth.currentUser.id);
    // console.log(iddddd);

    const dispatch = useDispatch()
    useEffect(() => {
                // console.log('jjjj')
                async function allData() {
                // console.log('jjjj666666666666666')
                try {
                // setLoading(false)

                let userArray = [];
                const userss = await getDocs(collection(db, "blogs"));
                userss.forEach((doc) => {
                    let data = doc.data();
                    let key = doc.id;
                    data.key = key;
                    userArray.push(data);
                });
                // console.log('jjjj')
                setLoading(false)
                // console.log(userArray)
                dispatch(reciveData(userArray));
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
                    <Loader />
                    
                </div>
                    :
                    userState?.map((blog) => {
                        // console.log(blog)
                        // console.log(id)
                        return (
                            <Blogs blog={blog} key={blog.key} />
                        )
                    })
            }



        </div>
    )
}

export default AllPost