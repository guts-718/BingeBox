import {Route, Routes} from "react-router-dom";
import HomePage from "./home/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer.jsx";
import { Loader } from "lucide-react";
import { useAuthStore } from "./store/authUser.js";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/404";
import WatchPage from "./pages/WatchPage";

function App(){
  const {user,isCheckingAuth,authCheck}=useAuthStore();
  useEffect(()=>{
    authCheck();
  },[authCheck])

  if(isCheckingAuth){
    return <div className="h-screen">
      <div className="flex justify-center items-center bg-black h-full">
        <Loader className='animate-spin text-red-500 size-10'/>
      </div>
    </div>
  }
   return (
    <>
    <Routes>
 <Route path='/' element={<HomePage />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
                <Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
                <Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
                <Route path='/*' element={<NotFoundPage />} />

    </Routes>
     <Footer/>
     <Toaster/>
     </>
   )
}
export default App;