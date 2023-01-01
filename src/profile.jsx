import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./user-context";
import userImg from "./Images/user-def.png";
import locationImg from "./Images/location.svg";
import emailImg from "./Images/email.svg";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);

  

  useEffect(() => {
    const getLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setLocation(`${data.region_code}, ${data.country_name}`);
      } catch (err) {
        console.error(err);
      }
    };
    getLocation();
  }, []);

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  return (
    <div>
      <h1 className="text-3xl font-bold text-black font-mono text-center pb-20">
        Public Profile
      </h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : user ? (
        <div className="w-full max-w-xl mx-auto p-10 bg-slate-100 rounded-lg shadow-lg mt-20">
          <img
            src={user.imgSrc ? user.imgSrc : userImg}
            alt="profile"
            className="w-32 h-32 rounded-full mx-auto absolute left-0 right-0 shadow-lg -mt-32"
          />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            {user.displayName}
          </h1>
          <p className="text-gray-600 mt-2">
            Username: @
            {user.username
              ? user.username
              : user.displayName.replace(/[^A-Za-z]/g, "").toLowerCase()}
          </p>
          <p className="text-gray-600 mt-2"><img src={emailImg} alt="email"
            className="w-5 h-5 inline-block mr-2"
             /> {user.email}</p>
          <p className="text-gray-600 mt-2">
            <img src={locationImg} alt="location"
            className="w-5 h-5 inline-block mr-2"
             />
            {location}
          </p>
          {/* create a line  */}
          <hr className="border-gray-400 mt-8" />
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800">Bio</h3>
            <p className="text-gray-600 mt-2">
              {user.bio ? user.bio : "No bio provided"}
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg">
              Edit Profile
            </button>
          </div>
          
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

export default Profile;
