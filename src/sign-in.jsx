import {} from "firebase/auth";
import {  update } from "firebase/database";
import { getDoc } from "firebase/firestore";
import React, { useEffect, useState, } from "react";
import { NavLink, } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  auth,
  database,
  ref,
  signInWithRedirect,
  provider,
  getRedirectResult,
  onAuthStateChanged,
  createUserProfileDocument,
} from "./config";


export const SignIn = ({ user, setUser }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);
  //sumitdata event handler
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitData = (e) => {
    const { email, password } = formData;

    // //keep the user logged in even after refreshing the page
    // localStorage.setItem("email", email);
    // localStorage.setItem(" password", password);

    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        const lgDate = new Date().toLocaleString();
        update(ref(database, "users/" + user.uid), {
          last_login: lgDate,
        })
          .then(() => {
            // Data saved successfully!
            window.location.href = "/";
            alert(
              "User Logged In Successfully !  password is : " +
                password +
                " email is : " +
                email
            );
          })
          .catch((error) => {
            // The write failed...
            alert(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });

    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     // ...
    //     window.history.back();
    //     const lgDate = new Date().toLocaleString();
    //     update(ref(database, "users/" + user.uid), {
    //       last_login: lgDate,
    //     })
    //       .then(() => {
    //         // Data saved successfully!
    //         setUser(user);
    //         alert(
    //           "User logged in Successfully !  password is : " +
    //             password +
    //             " email is : " +
    //             email
    //         );
    //         window.history.back();
    //       })
    //       .catch((error) => {
    //         // The write failed...
    //       });
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     alert("Error : " + errorMessage);
    //   });

    // signOut(auth)
    //   .then(() => {
    //     // Sign-out successful.
    //   })
    //   .catch((error) => {
    //     // An error happened.
    //   });
  };

  const signInWithGoogle = (e) => {
    e.preventDefault();
    signInWithRedirect(auth, provider);
  };




  
  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result) {

        console.log(result.user);
        setSignedIn(true);
        window.location.href = "/";
      } else {
        console.log("not signed in");
      }
      const user = result.user;

      const lgDate = new Date().toLocaleString();
      update(ref(database, "users/" + user), {
        last_login: lgDate,
      }).catch((error) => {
        // The write failed...
        alert(error);
      });
      window.location.href = "/";
    });
  }, []);

  // check auth state
  
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        //set the user
        const userRef = await createUserProfileDocument(user, user.photoURL, );
        const userSnapshot = await getDoc(userRef);
        console.log("snapshot", userSnapshot.data());
        const imgSrc = user.imgSrc || user.photoURL;
        

        const { displayName, email, createdAt } = userSnapshot.data();
        console.log(displayName, email, createdAt, imgSrc, );
       
      
       
        setUser({ displayName, email, createdAt, imgSrc});
        setAuthenticated(true);
        const lgDate = new Date().toLocaleString();
        update(ref(database, "users/" + user), {
          last_login: lgDate,
        });
        window.location.href = "/";
      } else {
        //set the user to null
        setUser(null);
        setAuthenticated(false);
      }

     

    });
  }, []);

  


  return (
    <div className="  flex items-center justify-center flex-col"
    // set a condition to display "You are signed in" if the user is authenticated
    // style={{ display: authenticated
    //   ? "none"
    //   : "block" }}

    >
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Sign In
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
          <label
            className="block font-bold mb-2 text-gray-700"
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
        <div className="flex flex-col">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3 mb-3"
            type="submit"
            onClick={submitData}
          >
            Sign In
          </button>
        </div>
        {/* -or login with- */}
        <p className="flex flex-row text-center text-gray-500 text-s mt-3 mb-3">
          <span className="border-b-2 border-gray-400 w-4/12 mx-auto mb-2"></span>{" "}
          or login with{" "}
          <span className="border-b-2 border-gray-400 w-4/12 mx-auto mb-2"></span>
        </p>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-bold hover:text-white py-2 px-12 border border-blue-500 hover:border-transparent rounded text-base "
          onClick={signInWithGoogle}
        >
          Sign In with Google
        </button>
      </form>

      <div className="flex flex-col items-center justify-center">
        <p className="text-gray-500 text-xl mt-3 mb-3">
          Don't have an account?{" "}
        </p>
        {/* <Link to="/signup" className="text-blue-500 hover:text-blue-700">
             Sign Up
           </Link> */}
        <NavLink to="/register">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-bold hover:text-white py-2 px-12 border border-blue-500 hover:border-transparent rounded text-base ">
            Sign Up
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default SignIn;

