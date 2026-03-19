import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Spinner from 'react-bootstrap/Spinner';
function Nadmin(){
    const navigate = useNavigate();
    const port = import.meta.env.VITE_PORT;
    const [loading, setLoading] = useState(false); 
    const [form, setForm] = useState({username: '',email: '',password: ''});
    const change= (e)=>{setForm({...form,[e.target.name]: e.target.value})};
    const submit=(e)=>{e.preventDefault();
        if (loading) return; setLoading(true);
         const url= `http://localhost:${port}/admin`;
          fetch(url,{
    method:'POST',
    headers:{'Content-Type':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`},
    body:JSON.stringify(form)
  })
  .then( async res=>{ const data = await res.json();if(res.ok){return data} else {throw new Error (data.message || data.error||"Error in response")}})
  .then(()=>{navigate("/dashboard")})
  .catch(err=>{console.log(err.message);navigate("/error", { state: { message: err.message } });})
  .finally (()=> {setLoading(false)})
} 
    return(<>
     {loading && (
  <div className="loading-overlay">
    <Spinner animation="border" variant="warning" />
  </div> //spinner
)}
     <div style={{backgroundColor:'white'}} className='mt-5 rounded-3 welcome'><h3 className='fw-bolder mt-5'>INSERT ADMIN'S DATA</h3><Form onSubmit={submit} className='container mt-4'><Row className='justify-content-center' > 
        <Col xs={12} md={3} ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Username</h5>
        <Form.Control onChange={change} className="mt-2 "  type="text" placeholder="Choose username" name='username' /></div></Col>
         <Col xs={12} md={3} ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Email</h5>
        <Form.Control onChange={change} className="mt-2 "  type="email" placeholder="Enter email"name='email' /></div></Col>
        <Col xs={12} md={3} ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Password</h5>
        <Form.Control onChange={change} className="mt-2 " type="password" placeholder="*Choose password" name='password' /></div></Col> <Form.Label className='d-block mt-2 justify-content-center m-1 px-5' style={{color:'grey'}}>*The password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.</Form.Label> </Row>
             <Row className='justify-content-center mt-5 mb-5'> 
  <div className='d-block'><Button type='submit'disabled={loading} className="text-center border-0  mb-4" style={{background:'#FC7E00'}}  size="lg">Submit</Button></div></Row>
        </Form></div>
    </>)
}
export default Nadmin