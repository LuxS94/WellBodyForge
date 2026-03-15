import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { useEffect } from 'react';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

function EditProfile() {
     const navigate = useNavigate();
      const [loading, setLoading] = useState(false); 
     const port = import.meta.env.VITE_PORT;
     const heights = Array.from({ length: 226 }, (_, i) => 50 + i);
     const [passwordError, setPasswordError] = useState('');
     const validatePassword = (password) => {
  if (!password) return "Password cannot be empty";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password)) return "Password must include at least one uppercase letter";
  if (!/[0-9]/.test(password)) return "Password must include at least one number";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must include at least one special character";
  return '';
};
       const [user, setUser] = useState({username:'',email:'',password:'',height:'',age:'',weight:'',sex:'',lifestyle:'',plan:''});
     useEffect(() => {const url=`http://localhost:${port}/user/my`
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
const change = (e) => {
  setUser({ ...user, [e.target.name]: e.target.value });
  if (e.target.name === 'password') {         
    const error = validatePassword(e.target.value); 
    setPasswordError(error);              
  }
};
 const submit = (e) => {
  e.preventDefault();
  if (loading) return;
  setLoading(true);

  let url;
  let body;

  if (user.role === "USER") {
    url = `http://localhost:${port}/user/updateMe`;
    body = {
      username: user.username,
      email: user.email,
      password: user.password,
      height: user.height,
      age: user.age,
      weight: user.weight,
      sex: user.sex,
      lifestyle: user.lifestyle,
      plan: user.plan
    };
  } else if (user.role === "ADMIN") {
    url = `http://localhost:${port}/admin`;
    body = {
      username: user.username,
      email: user.email,
      password: user.password
    };
  }

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(body)
  })
    .then(async res => {
      const data = await res.json();
      if (res.ok) return data;
      else throw new Error(data.message || data.error || "Error in response");
    })
    .then(() => location.href = "/profile")
    .catch(err => {
      console.log(err.message);
      navigate("/error", { state: { message: err.message } });
    })
    .finally(() => setLoading(false));
};
      return (<>
      {loading && (
  <div className="loading-overlay">
    <Spinner animation="border" variant="warning" />
  </div> //spinner
)}
    <div style={{backgroundColor:'white'}} className='mt-5 rounded-3 welcome2'><h3 className='fw-bolder mt-5'>Edit profile</h3><Form onSubmit={submit} className='container mt-4'><Row className='justify-content-center' > 
        <Col xs={12} md={3} ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Username</h5>
        <Form.Control onChange={change} className="mt-2 "  type="text" placeholder="Choose your username" name='username'value={user.username} /></div></Col>
         <Col xs={12} md={3} ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Email</h5>
        <Form.Control onChange={change} className="mt-2 "  type="email" placeholder="Enter email"name='email' value={user.email}/></div></Col>
        <Col xs={12} md={3} ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Password</h5>
        <Form.Control onChange={change} className="mt-2 " type="password" placeholder="*Choose your password" name='password' value={user.password}  isInvalid={!!passwordError}/><Form.Control.Feedback type="invalid">
  {passwordError}  
</Form.Control.Feedback></div></Col> <Form.Label className='d-block mt-2 justify-content-center m-1 p-1' style={{color:'grey'}}>*The password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.</Form.Label> </Row>
         {user.role === "USER"?( <>
      <Row className='justify-content-center mt-5'><Col xs={12} md={3}  ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Height</h5> <Form.Select onChange={change} name='height' value={user.height} className='mt-2 mb-2'> <option value="">Select your height</option> {heights.map((h) => (<option key={h} value={h}>{h} cm</option>))}
            </Form.Select></div></Col><Col xs={12} md={3}><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Age</h5> <Form.Control onChange={change} name='age' className='mt-2 mb-2' type="number" placeholder="Enter your age"min={1} max={120}step={1} value={user.age}/></div></Col><Col xs={12} md={3}  ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Weight</h5>  <Form.Control onChange={change} name='weight' className='mt-2 mb-2' type="number" placeholder="kg" min={0} step={0.1} value={user.weight} /></div></Col></Row>  
             <Row className='justify-content-center mt-5 mb-5'> <Col xs={12} md={3} ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Sex</h5><Form.Select onChange={change} name='sex' className='mt-2 mb-2' value={user.sex}> <option >Select your gender</option><option value="M">M</option><option value="F">F</option>
  </Form.Select></div></Col>
  <Col xs={12} md={3} ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Lifestyle</h5><Form.Select onChange={change} name='lifestyle' className='mt-2 mb-2' value={user.lifestyle}> <option value="">Select your lifestyle</option><option value="SEDENTARY">Sedentary(less than 1 training for week)</option><option value="MODERATELY_ACTIVE">Moderately active (1-3 trainings for week)</option><option value="ATHLETIC">Athletic (more than 4 trainings for week)</option>
  </Form.Select></div></Col>
  <Col xs={12} md={3} ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Fitness plan</h5><Form.Select onChange={change} name='plan' className='mt-2 mb-2'value={user.plan}> <option value="">Select your plan</option><option value="WEIGHT_LOSS">Weight loss</option><option value="MAINTENANCE">Maintenance</option><option value="BULK">Bulk</option>
  </Form.Select></div></Col><div className='d-block'></div></Row></>):(null)}
        <Button type='submit'disabled={loading|| !!passwordError||user.password===undefined} className="text-center border-0 mt-5 mb-4" style={{background:'#FC7E00'}}  size="lg">Edit</Button></Form></div></>
  );
}
export default EditProfile