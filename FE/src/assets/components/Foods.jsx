import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import {Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useUser from "../script/useUser";
import { useNavigate } from 'react-router-dom'; 
function Foods (){
  const user=useUser()
  const navigate=useNavigate();
    const[food,setFood]=useState([])
     const [search, setSearch] = useState('');
     const [showForm, setShowForm] = useState(false);
     const[showUpForm,setShowUpForm]=useState(false);
     const[updateFood,setUpdateFood]=useState([])
     const [newFood, setNewFood] = useState({ name: '', type: '', kcal: '', protein: '', carbs: '', fat: '' });
    const port=import.meta.env.VITE_PORT;
       const filteredFood = food.filter(f =>           //filter for searchbar
    f.name.toLowerCase().includes(search.toLowerCase())
  );  
  const handleEditClick = (foodItem) => {     //initializes all fields, necessary for calories/kcal
  setUpdateFood({
    id: foodItem.id,
    name: foodItem.name,
    type: foodItem.type,
    kcal: foodItem.calories,   
    protein: foodItem.protein,
    carbs: foodItem.carbs,
    fat: foodItem.fat
  });
  setShowUpForm(true);
}
  // add food-----------------------------------------------------------------------------------------------------------
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
    // update food----------------------------------------------------------------------------------------------------------
 
    const handleUpdateFood=(id)=>{
    fetch(`http://localhost:${port}/food/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(updateFood)
  })
    .then(async res => {
      const data = await res.json();
      if (res.ok) return data;
      else throw new Error(data.message || data.error || "Error in response");
      
    })
    .then(() => {
  gfood();
  setShowUpForm(false);
})
      .catch(err => {
      console.log(err.message);
      navigate("/error", { state: { message: err.message } });
    })
  }

  // get all foods------------------------------------------------------------------------------------------------------
  const gfood=()=>{
fetch(`http://localhost:${port}/food/f/all?page=0&size=1000`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(res => res.json())
    .then(data => {setFood(data.content)} )
    .catch(err => console.log(err));}
    // delete food----------------------------------------------------------------------------------------------------
    const del=(id)=>{
      fetch(`http://localhost:${port}/food/${id}`,{
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(async(res)=>{ 
        if(res.ok){ gfood();}})
  .catch(err => console.log(err.message)); 
    }
      useEffect(()=>{
       gfood();},[]);
    

    return(
    <><h1 className='welcome' >Food</h1>
   
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
        <table class={user.role==='ADMIN'? "table table-striped  table-info ":"table table-striped  table-warning "} > <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Type</th>
      <th scope="col">Calories</th>
      <th scope="col">Protein</th>
      <th scope="col">Carbs</th>
      <th scope="col">Fat</th>
      {user.role==='ADMIN'?(<><td></td></>):null}
    </tr>
  </thead>
   <tbody>{filteredFood.map((f,index)=>(
   <tr key={f.id}> <th>{index+1}</th><td>{f.name}</td><td>{f.type}</td><td>{f.calories}</td><td>{f.protein}</td><td>{f.carbs}</td><td>{f.fat}</td>{user.role==='ADMIN'?(<><td><i onClick={()=>{ handleEditClick(f);}} class="bi bi-pencil-square me-3 uf"></i><i onClick={()=>del(f)} class="bi bi-trash3 uf"></i></td></>):null}</tr>
   ))}</tbody>
  </table>
  {/* food-update form ---------------------------------------------------------------------------------------------------- */}
  {showUpForm && ( <div style={{
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
            <h4 style={{color:'black'}}>Update Food</h4>
            <Form>
              <Form.Group className="mb-3">
    <Form.Label style={{color:'black'}}>Name</Form.Label>
    <Form.Control
      type="text"
      value={updateFood.name}
      onChange={e => setUpdateFood({ ...updateFood, name: e.target.value })}
      step="0.01"
    />
  </Form.Group>

  <Form.Group className="mb-3">
  <Form.Label style={{color:'black'}}>Type</Form.Label>
  <Form.Select
    value={updateFood.type}
    onChange={e => setUpdateFood({ ...updateFood, type: e.target.value })}
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
      value={updateFood.kcal}
      onChange={e => setUpdateFood({ ...updateFood, kcal: e.target.value })}
      step="0.01"
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label style={{color:'black'}}>Protein</Form.Label>
    <Form.Control
      type="number"
      value={updateFood.protein}
      onChange={e => setUpdateFood({ ...updateFood, protein: e.target.value })}
      step="0.01"
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label style={{color:'black'}}>Carbs</Form.Label>
    <Form.Control
      type="number"
      value={updateFood.carbs}
      onChange={e => setUpdateFood({ ...updateFood, carbs: e.target.value })}
      step="0.01"
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label style={{color:'black'}}>Fat</Form.Label>
    <Form.Control
      type="number"
      value={updateFood.fat}
      onChange={e => setUpdateFood({ ...updateFood, fat: e.target.value })}
      step="0.01"
    />
  </Form.Group>

  <div className="d-flex justify-content-end">
    <Button style={{background:'#FC7E00',width:'73px'}} className="me-3 border-0" onClick={()=>handleUpdateFood(updateFood.id)}>
      Update
    </Button> <Button variant="danger" className="me-2" style={{width:'73px'}} onClick={() => setShowUpForm(false)}>
      Cancel
    </Button>
  </div>
            </Form>
          </div>
        </div>

   )}
   </div> </>)
}
export default Foods