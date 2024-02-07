import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogsList: [
    {
      name: "wahid",
      title: "hnnn",
      para: "istan npkkistan npakstan npakist tann",
      id: '12nnnnqnwkwj22wwbb'
    },
  ],
};
export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    
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
      console.log(state);
      console.log(action);
    },
    // deleteBlog
  },
});
// export const { addBlog, deleteBlog, editBlog } = blogSlice.actions;

export default blogSlice.reducer;
