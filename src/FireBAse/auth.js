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
import Swal from "sweetalert2";

const auth = getAuth();

export const authService = {
  creatAccount: async (name, email, password, file, dispatch, navigate) => {
    console.log(file);
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          if (user) {
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
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
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
  addData: async (title, para, userId, name, setLoading) => {
    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        name: name,
        title: title,
        para: para,
        active: true,
        userId,
      });
      Swal.fire({
        title: "Added !",
        text: "your Blog Added Successfully",
        icon: "success",
      });
      setLoading(false);
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
  
    try {
      const updated = await setDoc(doc(db, "blogs", id), {
        name: blog.name,
        title: title,
        para: para,
        active: true,
        userId: blog.userId,
        para,
      });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  },
  updateUserData: async (uid, name, email, dispatch) => {
    try {
  
      const updated = await setDoc(doc(db, "users", uid), {
        active: true,
        name,
        email,
        id: uid,
      });
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
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  },
  getUserData: async (id, dispatch) => {
    try {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  },
  getAllData: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      querySnapshot.forEach((doc) => {
        return doc.data();
      });
    } catch (err) {
      console.log(err);
    }
  },
  uploadeFile: (file) => {
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
