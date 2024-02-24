import { createSlice } from "@reduxjs/toolkit";

import { creatAccount, logInAccount } from "../FireBAse/auth";

const initialState = {
  userList: [
    {
      key: "",
      userId :"",
      active: true,
      title: "",
      para: "",
    },
  ],
  currentUser: { active: false, id: "", name: "", email: "", image: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createAcc: (state, action) => {
   
      const { name, email, password } = action.payload;
      creatAccount(name, email, password);
    },
    logInAcc: (state, action) => {
      state.currentUser = action.payload;
    },

    logOutAcc: (state, action) => {
      state.currentUser = { active: false };
    },

    reciveData: (state, action) => {
      state.userList = action.payload;
    },
    userDataUpdate: (state, action) => {
    },
    addBlog: (state, action) => {
      let { name, para, title } = action.payload;
      let blogss = {
        name: name,
        para: para,
        title: title,
      };
      state.blogsList.push(blogss);
    },

    editBlog: (state, action) => {
      console.log(state);
      console.log(action);
    },

    deleteBlog: (state, action) => {
 
      const filll = state.userList.filter((item) => {
        return item.key !== action.payload;
      });
      state.userList = filll;
    },
  },
});

export const {
  logInAcc,
  createAcc,
  reciveData,
  addBlog,
  deleteBlog,
  userDataUpdate,
  logOutAcc,
  editBlog,
} = authSlice.actions;

export default authSlice.reducer;
