import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LogIn from './Component/LogIn.jsx'
import SignUp from './Component/SignUp.jsx'
import Home from './Component/Home.jsx'
import Blogs from './Component/Blogs.jsx'
import AddPost from './Component/AddPost.jsx'

import AllPost from './Component/AllPost.jsx'
import LayOut from './Component/LayOut.jsx'







ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
