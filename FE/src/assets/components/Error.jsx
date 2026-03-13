import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";

function Error () {
   const location = useLocation();
const message = location.state?.message || "Unknown error ";
    return(<>
    <div class='text-center mt-5'>
      <h1 style={{color:"white", fontSize: "120px"}}>Oops!</h1>
      <p class='mt-4'  style={{color:"white", fontSize: "30px"}}>{message}</p></div>
    </>)
}   
export default Error