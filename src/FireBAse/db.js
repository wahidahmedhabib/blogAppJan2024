import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "./fireBase";
export const db = getFirestore(app);

// import { reciveData } from "../store/authSlice";
// import { useDispatch } from "react-redux";

const dbService = {
  addData: async (title, para) => {
    try {
      // const id = localStorage.getItem("id");
      // console.log(id);
      // const docRef = await addDoc(collection(db, "users"), {
      await setDoc(doc(db, "users", id), {
        // id: id,
        ...users,
        title: title,
        para: para,
        active: true,
      });
      // console.log("Document written with ID: ");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },

  deleteData: async () => {
    await deleteDoc(doc(db, "blogs", "c12pGJiBtfdVvW8WLnWj"));

    console.log("done.....");

    // const querySnapshot = await getDocs(collection(db, "blogs"));
    // querySnapshot.forEach((doc) => {

    //   console.log(doc.id);
    // });
  },
  updateData: async (title, para) => {
    try {
      const updated = await setDoc(doc(db, "blogs", "Updated1234"), {
        para,
        title,
      });
      console.log("updatedddd----.>>>");
    } catch (err) {
      console.log(err);
    }
  },
  getData: async (id) => {
    try {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
    }
  },
  getAllData: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      querySnapshot.forEach((doc) => {
        console.log("all Dataaa--->>", doc.data());
        return doc.data();
      });
    } catch (err) {
      console.log(err);
    }
  },
};

// export const { addData, deleteData, updateData, getData, getAllData } =
  // dbService;
