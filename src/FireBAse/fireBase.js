// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // add your firebase config here.....
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const storage = getStorage();

// const mountainsRef = ref(storage, "logoo.jpg");

// const mountainImagesRef = ref(storage, "/src/assets/logoo.png");

// console.log(mountainsRef.fullPath);
// console.log(mountainImagesRef.fullPath);

// mountainsRef.name === mountainImagesRef.name; // true
// mountainsRef.fullPath === mountainImagesRef.fullPath; //

// uploadBytes(mountainImagesRef,"/src/assets/logoo.png" ).then((snapshot) => {
//   console.log(snapshot)
//   console.log('Uploaded a blob or file!');
// });

const storage = getStorage();
export { app, auth, firebaseConfig,storage };


// // Create the file metadata
// /** @type {any} */
// const metadata = {
//   contentType: "image/jpeg",
// };
// const file = "logoo.png";
// Upload file and metadata to the object 'images/mountains.jpg'

// export const uploade = (file) => {
//   // const storageRef = ref(storage, "images/" + file.name);
//   // const uploadTask = uploadBytesResumable(storageRef, file, metadata);
//   // Listen for state changes, errors, and completion of the upload.
//   // uploadTask.on(
//   //   "state_changed",
//   //   (snapshot) => {
//   //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//   //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   //     console.log("Upload is " + progress + "% done");
//   //     switch (snapshot.state) {
//   //       case "paused":
//   //         console.log("Upload is paused");
//   //         break;
//   //       case "running":
//   //         console.log("Upload is running");
//   //         break;
//   //     }
//   //   },
//   //   (error) => {
//   //     // A full list of error codes is available at
//   //     // https://firebase.google.com/docs/storage/web/handle-errors
//   //     switch (error.code) {
//   //       case "storage/unauthorized":
//   //         // User doesn't have permission to access the object
//   //         break;
//   //       case "storage/canceled":
//   //         // User canceled the upload
//   //         break;
//   //       // ...
//   //       case "storage/unknown":
//   //         // Unknown error occurred, inspect error.serverResponse
//   //         break;
//   //     }
//   //   },
//   //   () => {
//   //     // Upload completed successfully, now we can get the download URL
//   //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//   //       console.log("File available at", downloadURL);
//   //     });
//   //   }
//   // );
// };

{
  /* <input type="file" /> */
}

// export const uploadeFile = (file) => {
//   console.log(file);
//   return new Promise((resolve, reject) => {
//     const storageRef = ref(storage, `images/${file.name}`);
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
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           resolve(downloadURL);
//           // imges.src = downloadURL

//           console.log('File available at', downloadURL);
//         });
//       }
//     );
//   });
// };
