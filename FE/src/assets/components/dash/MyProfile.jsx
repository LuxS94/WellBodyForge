import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";


function MyProfile() {
    const [user, setUser] = useState({username:'',email:'',height:'',age:'',weight:'',sex:'',lifestyle:'',plan:'',role:''});
   const port = import.meta.env.VITE_PORT;
    useEffect(() => { 
      const url=`http://localhost:${port}/user/my`
        fetch(url, {
  method: 'GET', 
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
          .then(async res =>{const data= await res.json(); if(res.ok){return data} else {throw new Error (data.message || data.error||"Error in response")}})
          .then(data => {
            if (data.role === "USER") {
              fetch(`http://localhost:${port}/user/myProfile`, {
  method: 'GET', 
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
                .then(async res =>{const data=await res.json(); if(res.ok){return data} else {throw new Error (data.message || data.error||"Error in response")}})
                .then(data => setUser({username: data.username, email: data.email, role: "USER", height: data.height, age: data.age, weight: data.weight,plan: data.plan, lifestyle: data.lifestyle, sex:data.sex}))
                .catch(err=>{console.log(err.message); })
            } else {
              setUser({username: data.username, email: data.email, role: data.role});
            }
          })
          .catch(err=>{console.log(err.message); })},[]);
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
       <Button  className="text-center border-0 mt-3 mb-2"style={{background:'#FC7E00', width:'150px'}}  size="lg">Edit profile</Button>
       <br/>
       <Button  className="text-center border-0 mt-3 mb-4"style={{background:'#f41212'}}  size="lg">Delete profile</Button>

    </div></>
  );
}
export default MyProfile