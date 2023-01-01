import { update } from "firebase/database";
import React from "react";
import {

  auth,
  database,
  ref,
  signOut,
} from "./config";

export const SignOut = ({ user, setUser }) => {
  //sumitdata event handler
  const handleSignOut = (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        //clear the user data from the database

        const lgDate = new Date().toLocaleString();
        update(ref(database, "users/"), {
          last_logout: lgDate,
        });
        // Sign-out successful.
        alert("User Signed Out Successfully !");
        
        window.location.href = "/";
      })
      .catch((error) => {
        // An error happened.
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error : " + errorMessage);
        //use Error code 
        alert( "Error Code : " + errorCode)
      });
  };

  return (
    <div>
      <form>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3 mb-3"
            type="submit"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignOut;
