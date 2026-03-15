
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useUser from "../useUser";



function MyProfile() {
  const port = import.meta.env.VITE_PORT;
  const navigate = useNavigate();
  const user = useUser();
  const deleteP=()=>{
    let url;
    if(user.role==="USER"){url=`http://localhost:${port}/user/deleteMe`}else{url=`http://localhost:${port}/admin`}
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        if (res.ok) {
          localStorage.removeItem('token');
          localStorage.setItem('logged', 'false');
          location.href = "/";
        } else {
          throw new Error("Error deleting profile");
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (<><h1 className="welcome">My Profile</h1>
     <div style={{backgroundColor:'white', maxWidth:'640px'}} className='mt-5 rounded-3 welcome2 mx-auto' >
      <h5 className="pt-4">Username: {user.username}</h5>
       <h5>Email: {user.email}</h5>
       <h5>Role: {user.role}</h5>
      {user.role === "USER"?( <>
       <h5>Height: {user.height}</h5>
       <h5>Age: {user.age}</h5>
       <h5>Weight: {user.weight}</h5>
       <h5>Sex: {user.sex}</h5>
       <h5>Lifestyle: {user.lifestyle}</h5>
       <h5>Plan: {user.plan}</h5></>):(null)}
       <Button onClick={()=>navigate("/edit")}  className="text-center border-0 mt-3 mb-2"style={{background:'#FC7E00', width:'150px'}}  size="lg">Edit profile</Button>
       <br/>
       <Button onClick={deleteP}  className="text-center border-0 mt-3 mb-4"style={{background:'#f41212'}}  size="lg">Delete profile</Button>

    </div></>
  );
}
export default MyProfile