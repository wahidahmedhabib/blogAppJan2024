import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  updateEmail,
} from "firebase/auth";

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
import { deleteBlog, logInAcc, logOutAcc } from "../store/authSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

// import { auth } from "firebase/auth";

const auth = getAuth();
const storage = getStorage();

// let uid;

export const authService = {
  creatAccount: async (name, email, password, file, dispatch, navigate) => {
    console.log(file)
    // console.log(name, email, password);
    // const navigate = useNavigate();
    // let user
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          // let imageurl ='';
          if (user) {
            // () => {
            //   // 11111 brackettt
            //   console.log(file);
            //   return new Promise((resolve, reject) => {
            //     // 222222 brackettt
            //     const storageRef = ref(Storage, `images/${file.name}`);
            //     const uploadTask = uploadBytesResumable(storageRef, file);
            //     uploadTask.on(
            //       "state_changed",
            //       (snapshot) => {
            //         const progress =
            //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //         console.log("Upload is " + progress + "% done");
            //         switch (snapshot.state) {
            //           case "paused":
            //             console.log("Upload is paused");
            //             break;
            //           case "running":
            //             console.log("Upload is running");
            //             break;
            //         }
            //       },
            //       (error) => {
            //         console.log("nahii uplode hue---->>>", error);
            //         reject(error);
            //       },
            //       () => {
            //         getDownloadURL(uploadTask.snapshot.ref).then(
            //           (downloadURL) => {
            //             resolve(downloadURL);
            //             // imges.src = downloadURL
            //             imageurl = downloadURL;
            //             console.log("File available at", downloadURL);
            //           }
            //         );
            //       }
            //     );
            //   }); // 2222222222 brackettt
            // }, // 11111 brackettt
            // uploadeFile();
            // setActive(true);
            // console.log(!active);
            await setDoc(doc(db, "users", user.uid), {
              name,
              email,
              id: user.uid,
              active: true,
              image: file,
            }).then(() => {
              dispatch(
                logInAcc({ name: name, email, uid: user.uid, image: file })
              );
              navigate("/");
              window.location.reload(false);
            });
          }
          // uid = user.uid;
          // console.log(user.uid);
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
      // return user
    } catch (error) {
      console.log(error);
    }
  },
  logInAccount: async (email, password, navigate) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("loginn!!........");
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    } catch (err) {
      console.log(err);
    }
  },
  currentUser: async () => {
    try {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  signOutBtn: async (navigate, dispatch) => {
    await signOut(auth);
    console.log("logOut doneee");

    dispatch(logOutAcc());
    navigate("/");
  },
  addData: async (title, para, userId, name , image) => {
    try {
      console.log(title, para, userId , image);
      const docRef = await addDoc(collection(db, "blogs"), {
        name: name,
        title: title,
        para: para,
        active: true,
        userId,
        image: image,
      });
      alert("success fully Added");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },

  deleteData: async (id, dispatch) => {
    // console.log("delete...");
    // console.log(id);
    try {
      await deleteDoc(doc(db, "blogs", id));
      console.log("done.....");
      dispatch(deleteBlog(id));
    } catch (err) {
      console.log(err);
    }
  },
  updateData: async (id, title, para, blog, navigate) => {
    console.log(blog);
    console.log(id);
    try {
      const updated = await setDoc(doc(db, "blogs", id), {
        // ...blog,
        name: blog.name,
        title: title,
        para: para,
        active: true,
        userId: blog.userId,
        para,
        // title,
      });
      // navigate('/your-posts')
      window.location.reload(false);

      // console.log(blog);
      // dispatch(reciveData(blog));
      console.log("updatedddd----.>>>");
      // console.log(updated);
    } catch (err) {
      console.log(err);
    }
  },
  updateUserData: async (uid, name, email, dispatch) => {
    try {
      console.log("update.....");
      console.log(uid);
      console.log(name);
      console.log(email);
      const updated = await setDoc(doc(db, "users", uid), {
        active: true,
        name,
        email,
        id: uid,
      });
      console.log("updatedddd----.>>>", updated);
    } catch (err) {
      console.log(err);
    }
  },
  updateEmailAddress: async (emaill) => {
    updateEmail(auth.currentUser, emaill)
      .then(() => {
        console.log("emailUpdated,,,,,");
      })
      .catch((err) => {
        console.log(err);
      });
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
  getUserData: async (id, dispatch) => {
    try {
      console.log("editinnn.....");
      const docRef = doc(db, "users", id);
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
  uploadeFile: (file) => {
    console.log(file);
    return new Promise((resolve, reject) => {
      const storageRef = ref(Storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log("nahii uplode hue---->>>", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
            // imges.src = downloadURL

            console.log("File available at", downloadURL);
          });
        }
      );
    });
  },
};

export const {
  creatAccount,
  currentUser,
  logInAccount,
  addData,
  deleteData,
  getAllData,
  getData,
  updateUserData,
  updateEmailAddress,
  getUserData,
  signOutBtn,
  updateData,
  uploadeFile,
} = authService;

// const creatAccountpppp = () => {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed up
//       const user = userCredential.user;
//       console.log(user);
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });
// };

// const logInAccount = () => {
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       console.log(user);
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//     });
// };

// const currentUser = () => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/auth.user
//       const uid = user.uid;
//       // ...
//     } else {
//       // User is signed out
//       // ...
//     }
//   });
// };
