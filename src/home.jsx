import logo from "./logo.svg";

import "./App.css";
import {

} from "./config";
import { useContext,} from "react";

import { UserContext } from "./user-context";

const Home = () => {
  const user = useContext(UserContext);
  

  return (
    <div>
      Home
      <h1>Learning Google Authentication With RobotM</h1>
      <h4>
         {/* if usser. display name is null, set guest as default */}
        Welcome  {user?.displayName || "Guest"}
      </h4>
      <img src={logo} className="App-logo text-center " alt="logo" />
    </div>
  );
};

export default Home;

// function Home() {

//   return (
//     <div className=" text-center text-indigo-700">
//       <header className="bg-sky-500 text-sky-100 p-8 mb-10 flex flex-row  space-x-52">
//         <div>
//         </div>
//         <div className="text-center text-xl font-bold text-white gap-10 flex">
//           <NavLink
//             to="./"
//             className="text-center text-xl font-bold text-white no-underline tracking-wider hover:opacity-100
//           hover:text-white pb-2 border-b-2 border-transparent hover:border-white
//            transition duration-700 ease-in-out
//            "
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="./todo"
//             className="text-center text-xl font-bold text-white no-underline tracking-wider hover:opacity-100
//             hover:text-white pb-2 border-b-2 border-transparent hover:border-white
//             transition duration-700 ease-in-out
//             "
//           >
//             Todo
//           </NavLink>
//         </div>
//       </header>
//       <h1>Learning Google Authentication With RobotM</h1>
//       <img src={logo} className="App-logo text-center " alt="logo" />
//       {user ? (
//         <div>
//           <img
//             src={user.photoURL}
//             alt={user.displayName}
//             className="rounded-full mx-auto my-5 h-32 w-32"
//           />
//           <h3 className="text-sky-700 text-xl">
//             Welcome to RobotM, {user.displayName}
//           </h3>
//           <p className="text-xl my-5 text-sky-500">
//             {" "}
//             Your Email is {user.email}
//           </p>
//           <TodoPage />
//           <SignOut user={user} setUser={setUser}/>
//         </div>
//       ) : (
//         <div>
//           <h3 className="mb-5 text-sky-700 text-xl">
//             Sign in with your Google account to access your RobotM account
//           </h3>
//           <h3 className="mt-5 text-sky-700 text-xl mb-5">Welcome to RobotM</h3>

//           {/* create a condition */}
//           {!user ? (
//             <SignIn user={user} setUser={setUser} />
//           ) : (
//             <SignOut user={user} setUser={setUser} />
//           )}
//           {/* {!user ? (
//             <>
//               <SignIn user={user} setUser={setUser} />
//               <Facebook user={user} setUser={setUser} />
//             </>
//           ) : (
//             <SignOut user={user} setUser={setUser} />
//           )} */}
//           <p className="text-center text-gray-500 text-xs">
//             &copy;2021 RobotM. All rights reserved.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
