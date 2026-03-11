import { BrowserRouter, Routes,Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from './assets/components/MyNav';
import Home from './assets/components/Home';
import LearnMore from './assets/components/LearnMore';

function App() {


  return (
    <>
     <BrowserRouter>
     <MyNav/> <div className="text-align-center" style={{margin:"40px"}}>
     <Routes>
     
       {<Route path="/" element={<Home/>} />}
       {<Route path="/learnMore" element={<LearnMore/>} />}
     </Routes></div>
     </BrowserRouter>
    </>
  )
}

export default App
