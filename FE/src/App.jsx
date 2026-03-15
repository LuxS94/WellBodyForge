import { BrowserRouter, Routes,Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from './assets/components/MyNav';
import Home from './assets/components/Home';
import LearnMore from './assets/components/LearnMore';
import Login from './assets/components/Login';
import Error from './assets/components/Error';
import Dashboard from './assets/components/Dashboard';
import HomeLog from './assets/components/dash/HomeLog';
import MyProfile from './assets/components/dash/MyProfile';
import EditProfile from './assets/components/dash/EditProfile';
import Target from './assets/components/dash/Target';
import CustomTarget from './assets/components/dash/CustomTarget';
import ProtectedRoute from './assets/components/ProtectedRoute';

function App() {


  return (
    <>
     <BrowserRouter>
     <MyNav/> <div className="text-align-center" style={{margin:"40px"}}>
     <Routes>
      {<Route path="/" element={<Home/>} />}
      {<Route path="/learnMore" element={<LearnMore/>} />}
      {<Route path="/login" element={<Login/>} />}
      {<Route path="/error" element={<Error/>} />}
        <Route element={<ProtectedRoute/>}>
      {<Route path="/profile" element={<MyProfile/>} />}
      {<Route path="/target" element={<Target/>} />}
      {<Route path="/customTarget" element={<CustomTarget/>} />}
      {<Route path="/edit" element={<EditProfile/>} />}
      {<Route path="/homeLog" element={<HomeLog/>} />}
      {<Route path="/dashboard" element={<Dashboard/>} />}
      </Route>
     </Routes></div>
     </BrowserRouter>
    </>
  )
}

export default App
