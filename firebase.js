// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { collection, getFirestore, addDoc, getDocs, 
        onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnW7BCdMqD98vY2_KEP9lZrNuaISgOzac",
  authDomain: "fir-crud-v2.firebaseapp.com",
  projectId: "fir-crud-v2",
  storageBucket: "fir-crud-v2.appspot.com",
  messagingSenderId: "934779173791",
  appId: "1:934779173791:web:fc67f25208422ef98c5baa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const storage = getStorage(app);

export const saveTask = (title, description, imageUrl) => addDoc(collection(db, 'tasks'), { title, description, imageUrl });

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = callback => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = id => deleteDoc(doc(db, 'tasks', id));

export const getTask = id => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);

export const saveImage = file => {
  console.log(file);
  const storageRef = ref(storage, `imagenes/${file.name}`);
  
  const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   document.querySelector('#progress').value = progress;
    },
    (error) => {
        
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        document.querySelector('#image').src = downloadURL;
        console.log('File available at', downloadURL);
        });
    }
    );

  }
