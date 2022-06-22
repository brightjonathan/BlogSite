import {useEffect} from 'react'
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Header from "./Component/Header";
import {useDispatch} from 'react-redux'
import { setUser } from './Redux/Features/authSlice';
import AddEditTours from './Pages/AddEditTours';
import SingleTour from './Pages/SingleTour';
import DashBoard from './Pages/DashBoard';
import PrivateRouter from './Component/PrivateRouter';
import NotFound from './Pages/NotFound';
import TagTours from './Pages/TagTours';




function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  //storing the login data after resetting
  useEffect(()=>{
    dispatch(setUser(user))
  },[dispatch, user])

  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/tours/search' element={<Home/>} />
        <Route path='/tours/tag/:tag' element={<TagTours/>} />
        <Route path='*' element={<NotFound/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={ <Login/>} />
        <Route path='/addTour' element={<PrivateRouter> <AddEditTours/> </PrivateRouter> } />
        <Route path='/editTour/:id' element={ <PrivateRouter> <AddEditTours/> </PrivateRouter> } />
        <Route path='/tour/:id' element={ <SingleTour/>} />
        <Route path='/dashboard' element={ <PrivateRouter> <DashBoard /> </PrivateRouter>} /> 
        
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
