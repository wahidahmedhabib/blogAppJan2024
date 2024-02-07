import { createSlice } from "@reduxjs/toolkit";

import { creatAccount, logInAccount } from "../FireBAse/auth";
// import { getAllData } from "../FireBAse/db";
// import { getDocs, collection } from "firebase/firestore";
// import { db } from "../FireBAse/db";
// import { build } from "vite";

// export const fetchUserById = createAsyncThunk(async () => {
//   try {
//     console.log("fetch........")
//     const querySnapshot = await getDocs(collection(db, "blogs"));
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log("all Dataaa--->>", doc.data());
//       // console.log(doc.id, " => ", doc.data());
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

const initialState = {
  userList: [
    {
      name: "wahid",
      id: "hjhhhh",
      key:'78uy89i99o9e3e4',
      // para: "PAKISTAN is our sweet homeland pakistan had appered on the world map in 1947",
      // title: "PAKISTANN ",
      image:'',
      active: true,
      title: "hnnn",
      para: "istan npkkistan npakstan npakist tann",
    },
  ],
  currentUser: { active: false, id: "", name: "", email: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    createAcc: (state, action) => {
      console.log(state);
      console.log(action);
      const { name, email, password } = action.payload;
      creatAccount(name, email, password);
    },
    logInAcc: (state, action) => {
      // const { email, password } = action.payload;
      // console.log(state);
      // console.log(action);
      state.currentUser = action.payload;
      // logInAccount(email, password);
    },

    logOutAcc: (state, action) => {
      // const { email, password } = action.payload;
      console.log(state);
      console.log(action);
      state.currentUser = { active: false };
      // logInAccount(email, password);
    },

    reciveData: (state, action) => {

      // console.log(state);
      // console.log(action);
     
      state.userList = action.payload;

      // console.log(state);
    },
    addBlog: (state, action) => {
      console.log(state);
      console.log(action);

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
      // console.log(state);
      // console.log(action);
      const filll = state.userList.filter((item) => {
        // console.log(item);
        return item.key !== action.payload;
        //  ? console.log(item) : "";
      });
      // console.log(filll);
      state.userList = filll;
      // console.log(state);
    },
  },
  // extraReducers: (build) => {
  //   build.addCase(fetchUserById.fulfilled, (state, action) => {
  //     console.log(state);
  //     const avv = state.entities.push(action.payload);
  //     console.log(avv);
  //   });
  // },
});

export const {
  logInAcc,
  createAcc,
  reciveData,
  addBlog,
  deleteBlog,
  logOutAcc,
  editBlog,
} = authSlice.actions;

export default authSlice.reducer;
