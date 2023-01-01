import { app, auth, updateProfile } from ".";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(app);

//storage


export const uploadImage = async (file, currentUser, setLoading) => {
  const fileRef = ref(storage,  currentUser.uid + ".jpg");


 
 setLoading(true);
 const snapshot = await uploadBytes(fileRef, file);
 const photoURL = await getDownloadURL(fileRef);

 updateProfile(currentUser, {photoURL});


  setLoading(false);
  alert("Image uploaded successfully");
};
