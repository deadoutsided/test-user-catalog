import "./App.css";
import BioPage from "./pages/bio-page/bio-page";
import MainPage from "./pages/main-page/main-page";
import { RegistrationPage } from './pages/registration-page/registration-page'
import { Routes, Route } from "react-router-dom";
import { SignInPage } from "./pages/signin-page/signin-page";

function App() {
  return (
    <>
      <Routes>
      <Route path='' element={<MainPage/>}/>
      <Route path="/registration" element={<RegistrationPage/>}/>
      <Route path='/:id' element={<BioPage/>}/>
      <Route path='/signin' element={<SignInPage/>}/>
      </Routes>
    </>
  );
}

export default App;
