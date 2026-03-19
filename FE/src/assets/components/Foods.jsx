import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
function Foods (){
    const[food,setFood]=useState([])
    const port=import.meta.env.VITE_PORT;
      useEffect(()=>{
fetch(`http://localhost:${port}/food/f/all?page=0&size=1000`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(res => res.json())
    .then(data => {setFood(data.content)} )
    .catch(err => console.log(err));},[])

    return(
    <><h1 className='welcome' >Foods</h1>
     <div style={{backgroundColor:'white',textAlign:'left'}} className='mt-5 welcome2 rounded-3 pt-1 pb-1 table-responsive' >
        <table class="table table-striped mt-5 table-info "><thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Type</th>
      <th scope="col">Calories</th>
      <th scope="col">Protein</th>
      <th scope="col">Carbs</th>
      <th scope="col">Fat</th>
    </tr>
  </thead>
   <tbody>{food.map((f,index)=>(
   <tr key={index}> <th>{index+1}</th><td>{f.name}</td><td>{f.type}</td><td>{f.calories}</td><td>{f.protein}</td><td>{f.carbs}</td><td>{f.fat}</td></tr>
   ))}</tbody>
  </table></div> </>)
}
export default Foods