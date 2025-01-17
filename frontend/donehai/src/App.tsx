import "./App.css";
import { Home } from "./pages/homePage/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/userAuth/Signup";
import { Login } from "./pages/userAuth/Login";
import { LandingPage } from "./pages/landingPage/Landing";

function App() {

  return (
    <>
      <BrowserRouter>
       
        <Routes>
         
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
