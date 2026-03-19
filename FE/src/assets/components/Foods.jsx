import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import {Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function Foods (){
    const[food,setFood]=useState([])
     const [search, setSearch] = useState('');
     const [showForm, setShowForm] = useState(false);
     const [newFood, setNewFood] = useState({ name: '', type: '', kcal: '', protein: '', carbs: '', fat: '' });
    const port=import.meta.env.VITE_PORT;
    const handleAddFood = () => {
      fetch(`http://localhost:${port}/food/f/add`,{
 method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
       }, body:JSON.stringify(newFood)
    })
    .then(async(res)=>{ const data = await res.json();
        if(res.ok) 
        {return data;} else {throw new Error(data.message || data.error || "Error in response")}})
    .then(data=>{setNewFood(data);setShowForm(false);setNewFood({ name: '', type: '', kcal: '', protein: '', carbs: '', fat: '' });gfood();})}
  
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
     <Row className='d-flex justify-content-center' ><Button className="text-center border-0 mt-5 mb-4" style={{background:'#FC7E00',maxWidth:'170px'}}size="lg"  onClick={() => setShowForm(true)}>Add food</Button></Row>
     {/* add food form--------------------------------------------------------------------------------------------- */}
    {showForm && (
        <div style={{
          position: 'fixed',
          top: 30, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            textAlign:'center',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            minWidth: '300px',
            maxWidth: '500px'
          }}>
            <h4 style={{color:'black'}}>Add New Food</h4>
            <Form>
              <Form.Group className="mb-3">
    <Form.Label style={{color:'black'}}>Name</Form.Label>
    <Form.Control
      type="text"
      value={newFood.name}
      onChange={e => setNewFood({ ...newFood, name: e.target.value })}
      step="0.01"
    />
  </Form.Group>

  <Form.Group className="mb-3">
  <Form.Label style={{color:'black'}}>Type</Form.Label>
  <Form.Select
    value={newFood.type}
    onChange={e => setNewFood({ ...newFood, type: e.target.value })}
  >
    <option value="">Select type</option>
    <option value="ANIMAL">ANIMAL</option>
    <option value="FRUIT">FRUIT</option>
    <option value="INDUSTRIAL">INDUSTRIAL</option>
    <option value="VEGETABLE">VEGETABLE</option>
    <option value="OTHER">OTHER</option>
  </Form.Select>
</Form.Group>

  <Form.Group className="mb-3">
    <Form.Label style={{color:'black'}}>Calories</Form.Label>
    <Form.Control
      type="number"
      value={newFood.kcal}
      onChange={e => setNewFood({ ...newFood, kcal: e.target.value })}
      step="0.01"
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label style={{color:'black'}}>Protein</Form.Label>
    <Form.Control
      type="number"
      value={newFood.protein}
      onChange={e => setNewFood({ ...newFood, protein: e.target.value })}
      step="0.01"
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label style={{color:'black'}}>Carbs</Form.Label>
    <Form.Control
      type="number"
      value={newFood.carbs}
      onChange={e => setNewFood({ ...newFood, carbs: e.target.value })}
      step="0.01"
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label style={{color:'black'}}>Fat</Form.Label>
    <Form.Control
      type="number"
      value={newFood.fat}
      onChange={e => setNewFood({ ...newFood, fat: e.target.value })}
      step="0.01"
    />
  </Form.Group>

  <div className="d-flex justify-content-end">
    <Button style={{background:'#FC7E00',width:'73px'}} className="me-3 border-0" onClick={handleAddFood}>
      Add
    </Button> <Button variant="danger" className="me-2" style={{width:'73px'}} onClick={() => setShowForm(false)}>
      Cancel
    </Button>
  </div>
            </Form>
          </div>
        </div>
      )} 
 {/*--------------------------------------------------------------------------------------------------  */}
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