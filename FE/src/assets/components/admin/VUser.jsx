import { useEffect, useState } from "react"
import { Row } from "react-bootstrap" 
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
function VUser (){
     const port=import.meta.env.VITE_PORT;
     const navigate=useNavigate();
    const heights = Array.from({ length: 226 }, (x, i) => 50 + i);
  // to get and search users---------------------------------------------------------------------------------------------
    const[user,setUser]=useState([])
     const [search, setSearch] = useState('');
     const filteredUsers = user.filter(u =>                 //filter for searchbar
    u.username.toLowerCase().includes(search.toLowerCase())
  );
 //to update users---------------------------------------------------------------------------------------------------------
 const [updatedUser,setUpdatedUser]=useState([])
  const [showForm, setShowForm] = useState(false);
 const upUser=(id)=>{
  fetch(`http://localhost:${port}/user/${id}/update`,{
     method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(updatedUser)
  })
     .then(async res => {
      const data = await res.json();
      if (res.ok) return data;
      else throw new Error(data.message || data.error || "Error in response");
      
    })
    .then(() => {
  gusers();
  setShowForm(false);
})
      .catch(err => {
      console.log(err.message);
      navigate("/error", { state: { message: err.message } });
    })
 }
  //get users---------------------------------------------------------------------------------------------------------------
  const gusers=()=>{
    fetch(`http://localhost:${port}/user/all`,{
         headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }})
     .then(res => res.json())
    .then(data => {setUser(data.content)} )
    .catch(err => console.log(err));}
    //-----------------------------------------------------------------------------------------------------------------
    useEffect(()=>{
        gusers();},[])
  
    return(<>
    <h1 className='welcome' >Users</h1>
     <div style={{backgroundColor:'white',textAlign:'left'}} className='mt-5 welcome2 rounded-3 pt-1 pb-1 table-responsive' >
<Row className="d-flex justify-content-center mb-3 mt-5">
    <Form.Control
                type="text"
                placeholder="Search food..."
                style={{ maxWidth: '300px' }}
                value={search}
                onChange={e => {setSearch(e.target.value),gusers()}}
              />
</Row>
<div className="d-flex justify-content-center">
 <table className="table table-striped  table-info "> <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Id</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Age</th>
      <th scope="col">Sex</th>
      <th scope="col">Height (cm)</th>
      <th scope="col">Weight (kg)</th>
      <th scope="col">Lifestyle</th>
      <th scope="col">Plan</th>
      <th></th>
    </tr>
  </thead>
   <tbody>{filteredUsers.map((u,index)=>(
   <tr key={u.id}> <th>{index+1}</th><td>{u.id}</td><td>{u.username}</td><td>{u.email}</td><td>{u.age}</td><td>{u.sex}</td><td>{u.height}</td><td>{u.weight}</td><td>{u.lifestyle}</td><td>{u.plan}</td><td><i onClick={()=>{setShowForm(true);setUpdatedUser(u)}} class="bi bi-pencil-square me-3 uf"></i><i class="bi bi-trash3 uf"></i></td></tr>
   ))}</tbody>
  </table>
{showForm && ( <div  style={{
          position: 'fixed',
          top: 120,  width: '300px', maxHeight: '500px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', 
          zIndex: 9999,
          border:'solid',
          borderColor:'black'
          
        }}>
           <div style={{
            textAlign:'center',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            minWidth: '300px',
            maxWidth: '500px',
            overflowY: 'auto'
          }}>
            <h4 style={{color:'black'}}>Update User</h4>
            <Form>
              <Form.Group className="mb-3">
    <Form.Label style={{color:'black'}}>Username</Form.Label>
    <Form.Control
      type="text"
      value={updatedUser.username}
      onChange={e => setUpdatedUser({ ...updatedUser, username: e.target.value })}
    />
  </Form.Group>
       <Form.Group className="mb-3">
    <Form.Label style={{color:'black'}}>Email</Form.Label>
    <Form.Control
      type="email"
      value={updatedUser.email}
      onChange={e => setUpdatedUser({ ...updatedUser, email: e.target.value })}
    />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label style={{color:'black'}}>Password</Form.Label><br/>
     <Form.Label style={{color:'grey'}}>*Leave empity to keep it unchanged</Form.Label>
    <Form.Control
      type="password"
      value=""
      onChange={e => setUpdatedUser({ ...updatedUser, pasword: e.target.value })}
    />
  </Form.Group>
   <Form.Group className="mb-3">
    <Form.Label style={{color:'black'}}>Age</Form.Label>
    <Form.Control
      type="number"
      value={updatedUser.age}
      onChange={e => setUpdatedUser({ ...updatedUser, age: e.target.value })}
      step="1"
    />
  </Form.Group>
  <Form.Group className="mb-3">
  <Form.Label style={{color:'black'}}>Sex</Form.Label>
  <Form.Select
    value={updatedUser.sex}
    onChange={e => setUpdatedUser({ ...updatedUser, sex: e.target.value })}
  >
    <option value="">Select sex</option>
    <option value="M">M</option>
    <option value="F">F</option>
  </Form.Select>
</Form.Group>
<Form.Group className="mb-3">
   <Form.Label style={{color:'black'}}>Height</Form.Label>
 <Form.Select 
  value={updatedUser.height}
  onChange={e => setUpdatedUser({ ...updatedUser, height: e.target.value })}
 > <option value="">Select your height</option> {heights.map((h) => (<option key={h} value={h}>{h} cm</option>))}
</Form.Select>
</Form.Group>
 <Form.Group className="mb-3">
    <Form.Label style={{color:'black'}}>Weight</Form.Label>
    <Form.Control
      type="number"
      value={updatedUser.weight}
      onChange={e => setUpdatedUser({ ...updatedUser, weight: e.target.value })}
      step="0.01"
    />
  </Form.Group>

  <Form.Group className="mb-3">
  <Form.Label style={{color:'black'}}>Lifestyle</Form.Label>
  <Form.Select
    value={updatedUser.lifestyle}
    onChange={e => setUpdatedUser({ ...updatedUser, lifestyle: e.target.value })}
  >
    <option value="">Select lifestyle</option>
    <option value="SEDENTARY">SEDENTARY</option>
    <option value="MODERATELY_ACTIVE">MODERATELY ACTIVE</option>
    <option value="ATHLETIC">ATHLETIC</option>
  </Form.Select>
</Form.Group>

   <Form.Group className="mb-3">
  <Form.Label style={{color:'black'}}>Plan</Form.Label>
  <Form.Select
    value={updatedUser.plan}
    onChange={e => setUpdatedUser({ ...updatedUser, plan: e.target.value })}
  >
    <option value="">Select plan</option>
    <option value="WEIGHT_LOSS"> WEIGHT LOSS</option>
    <option value="MAINTENANCE">MAINTENANCE</option>
    <option value="BULK">BULK</option>
  </Form.Select>
</Form.Group>

  <div className="d-flex justify-content-end">
    <Button style={{background:'#FC7E00',width:'73px'}} className="me-3 border-0" onClick={()=>upUser(updatedUser.id)}>
      Update
    </Button> <Button variant="danger" className="me-2" style={{width:'73px'}} onClick={() => setShowForm(false)}>
      Cancel
    </Button>
  </div>
            </Form>
          </div>
        </div>

   )}
     </div></div>
    </>)
}
export default VUser