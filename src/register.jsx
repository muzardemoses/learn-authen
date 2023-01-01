import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPasswordCall,
  createUserProfileDocument,
} from "./config";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
  });

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  


  // addevent listener below

  const submitData = async (event) => {
    event.preventDefault();

    const { email, password, displayName } = formData;

    // //keep the user logged in even after refreshing the page
    // localStorage.setItem("email", email);
    // localStorage.setItem("password", password);
    // localStorage.setItem("fullName", Name);
    // localStorage.setItem("profile_picture", profile_picture);
    const {user} = await createUserWithEmailAndPasswordCall(email, password, )
   
    console.log('user', user)
    createUserProfileDocument(user,  {displayName, })
   
    alert("User Created Successfully !  password is : " + password + " email is : " + email)
    //go to the home page
    
    
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={submitData}
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Register with us
        </h1>
        <div className="mb-4">
          <label className="block font-bold mb-2 text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2 text-gray-700" htmlFor="Name">
            Full Name
          </label>
          <input
            className="block border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Name"
            type="text"
            placeholder="Full Name"
            required
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block
            font-bold
            mb-2
            text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="block border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to="/sign-in"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
