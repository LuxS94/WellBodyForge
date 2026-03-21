import { useEffect, useState } from "react"
import { Row } from "react-bootstrap" 
import { Form } from "react-bootstrap";
function VUser (){
    const port=import.meta.env.VITE_PORT;
    const[user,setUser]=useState([])
     const [search, setSearch] = useState('');
     const filteredUsers = user.filter(u =>                 //filter for searchbar
    u.username.toLowerCase().includes(search.toLowerCase())
  );
 
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
 <table className="table table-striped  table-info "> <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Id</th>
      <th scope="col">Username</th>
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
   <tr key={u.id}> <th>{index+1}</th><td>{u.id}</td><td>{u.username}</td><td>{u.age}</td><td>{u.sex}</td><td>{u.height}</td><td>{u.weight}</td><td>{u.lifestyle}</td><td>{u.plan}</td><td><i  class="bi bi-pencil-square me-3 uf"></i><i class="bi bi-trash3 uf"></i></td></tr>
   ))}</tbody>
  </table>

     </div>
    </>)
}
export default VUser