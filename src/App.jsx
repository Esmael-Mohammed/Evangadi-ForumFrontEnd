import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Question from "./Pages/Question/Question"
import Answer from "./pages/Answer/Answer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharedLayout from "./components/sharedLayout/SharedLayout";

const App = () => {
  return (
    <>
      
      
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SharedLayout />} >
        <Route path="/" element={<Landing />}></Route>
        <Route path="/dashboard" element={<Home />}></Route>
        <Route path="/question" element={<Question />}></Route>
        <Route path="/answer/:questionId" element={<Answer />}/>
        
        </Route>
      </Routes>
      
    </>
  );
};

export default App;