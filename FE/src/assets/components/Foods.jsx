import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import {Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function Foods (){
    const[food,setFood]=useState([])
     const [search, setSearch] = useState('');
    const port=import.meta.env.VITE_PORT;
     const filteredFood = food.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );
  const gfood=()=>{
fetch(`http://localhost:${port}/food/f/all?page=0&size=1000`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(res => res.json())
    .then(data => {setFood(data.content)} )
    .catch(err => console.log(err));}
      useEffect(()=>{
       gfood();},[]);
    

    return(
    <><h1 className='welcome' >Foods</h1>
   
     <div style={{backgroundColor:'white',textAlign:'left'}} className='mt-5 welcome2 rounded-3 pt-1 pb-1 table-responsive' >
       <Row className="d-flex justify-content-center mb-3 mt-5">
          <Form.Control
            type="text"
            placeholder="Search food..."
            style={{ maxWidth: '300px' }}
            value={search}
            onChange={e => {setSearch(e.target.value),gfood()}}
          />
        </Row>
     <Row className='d-flex justify-content-center' ><Button className="text-center border-0 mt-5 mb-4" style={{background:'#FC7E00',maxWidth:'170px'}}size="lg">Add food</Button></Row>
    <Row className='ms-3'><Form.Label style={{color:'grey'}}>*Every value is calculated per 100g of product</Form.Label></Row>
        <table class="table table-striped  table-warning " > <thead>
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
   <tbody>{filteredFood.map((f,index)=>(
   <tr key={index}> <th>{index+1}</th><td>{f.name}</td><td>{f.type}</td><td>{f.calories}</td><td>{f.protein}</td><td>{f.carbs}</td><td>{f.fat}</td></tr>
   ))}</tbody>
  </table></div> </>)
}
export default Foods