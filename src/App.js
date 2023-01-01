import RegisterPage from "./register";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./home";
import TodoPage from "./todo";
import Header from "./header";
import SignIn from "./sign-in";
import Settings from "./settings";
import Profile from "./profile";

function App() {
  return (
    <div className=" text-center text-indigo-700 App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
