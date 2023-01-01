import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db, updateProfile } from "./config";
import { uploadImage } from "./config/firebaseStorage";
import addImage from "./Images/add-image.svg";
import closeImg from "./Images/close.svg";
import devImg from "./Images/dev-user.svg";
import { UserContext } from "./user-context";

const Settings = () => {
    const user = useContext(UserContext);
    
    const currentUser = auth.currentUser;
//     console.log(user)
//    console.log(currentUser)


  const [ImgURL, setImgURL] = useState(
    devImg
  );
  const [photo, setPhoto] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    imgSrc: "",
  });


 
 

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  useEffect(() => {
    // If the current user is not logged in, redirect to the login page
    if (!auth.currentUser) {
        window.location.href = "/profile";
    }
    // Retrieve the current user's displayName value from the database
    const userRef = doc(db, "users", auth.currentUser.uid);
    getDoc(userRef).then((snapshot) => {
      // Set the displayName value in the input field
      setFormData((prevState) => ({
        ...prevState,
        displayName: snapshot.data().displayName,
        email: snapshot.data().email,
      }));
    });
  }, []); // This will cause the effect to run whenever the current user's uid changes

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleImageClick = () => {
    uploadImage(photo, currentUser, setLoading);
    setModal(false);
  };



  useEffect(() => {
    if (currentUser.photoURL) {
      setImgURL(currentUser.photoURL);
    }
  }, [currentUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, imgSrc } = formData;

    try {
      // Update the user's display name in their profile
      await updateProfile(auth.currentUser, { displayName, email, imgSrc });

      // Update the user's display name in the Firestore database
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { displayName, email, imgSrc });

      alert("User's display name successfully updated!");
      //go to the home page
      window.location.href = "/profile";
    } catch (error) {
      alert("Error updating user's display name: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h1>Settings</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : user ? (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
            
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="displayName"
            >
              Display Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="displayName"
              type="text"
              placeholder="Display Name"
              required
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 ">
            Profile Picture
            <img
              // musk avatar
              src={ImgURL}
              alt="profile"
              className="w-32 h-32 rounded-full mx-auto mt-4 hover:opacity-50 shadow-lg cursor-pointer"
              onClick={() => {
                setModal(true);
              }}
            />
            <img
              src={addImage}
              alt="add"
              className="w-12 h-12 -mt-10 ml-48  rounded-full p-2 bg-slate-200 hover:shadow-2xl hover:opacity-80 cursor-pointer"
              style={{ position: "relative", zIndex: 1 }}
              onClick={() => {
                setModal(true);
              }}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Update
          </button>
          {modal && (
            <div
              className="fixed bottom-0 left-0 right-0 top-0 bg-gray-200 flex items-center justify-center z-50"
              style={{ opacity: 0.9 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <button className="-mr-96 -mt-5 p-2 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue-500">
                  <img
                    src={closeImg}
                    alt="close"
                    className="w-6 h-6"
                    onClick={() => setModal(false)}
                  />
                </button>
                <h1 className="text-2xl font-bold text-center mb-4">
                  Upload Image
                </h1>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="imgSrc"
                >
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="imgSrc"
                    type="file"
                    placeholder="Profile Picture"
                    required
                    name="imgSrc"
                    onChange={handleImageChange}
                  />
                </label>
                <button
                  disabled={Loading || !photo}
                  onClick={handleImageClick}
                  className="bg-blue-500 w-full mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Upload
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3 className="text-2xl font-bold text-black font-mono text-center pb-20">
            Please sign in{" "}
            <Link
              to="/sign-in"
              className="text-blue-500 no-underline  hover:text-blue-700"
            >
              {" "}
              here
            </Link>{" "}
            to see your profile.
          </h3>
        </div>
      )}
    </div>
  );
};

export default Settings;
