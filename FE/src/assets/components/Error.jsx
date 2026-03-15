import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Error () {
   const location = useLocation();
   const navigate= useNavigate();
const message = location.state?.message || "Unknown error ";
console.log(message);
useEffect(() => {const timer=setTimeout(() => {navigate(-1)}, 4000);
return () => clearTimeout(timer) });

    return(<>
    <div class='text-center mt-5'>
      <h1 style={{color:"white", fontSize: "120px"}}>Oops!</h1>
      <p class='mt-4'  style={{color:"white", fontSize: "30px"}}>{message}</p>
      <p style={{color:"white"}}>You will be redirected shortly</p></div>
    </>)
}   
export default Error