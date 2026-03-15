// import useUser from "../useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Target() {
   
    const navigate = useNavigate();
    const port = import.meta.env.VITE_PORT;
    const url = `http://localhost:${port}/target/myTarget`;
    const[target,setTarget]=useState({kcal:'',carbs:'',protein:'',fat:''})
 useEffect(() => {
  if(localStorage.getItem("logged") === "false"){navigate("/error")};
fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then(async (res) => {
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.message || data.error || "Error in response");
    }
  })
  .then((data) => {
    setTarget({
      kcal: data.kcal,
      carbs: data.carbs,
        protein: data.protein,
        fat: data.fat
  })})
  .catch((err) => {
    console.log(err.message);
  });}, [])

 return(<> 
 <h1 className="welcome">My Target</h1>
    <div style={{backgroundColor:'white', maxWidth:'640px'}} className='mt-5 rounded-3 welcome2 mx-auto' >
<h3 className="pt-4 mb-4" style={{textDecoration:'bolder',color:'#FC7E00'}}>Daily goals:</h3>
<h5>Kcal: {target.kcal}</h5>
<h5>Carbs: {target.carbs}g</h5>
<h5>Protein: {target.protein}g</h5>
<h5 className="pb-3 mb-3">Fats: {target.fat}g</h5>
    </div>

    </>)
}
export default Target