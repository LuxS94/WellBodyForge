import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();
    const port = import.meta.env.VITE_PORT;
    const heights = Array.from({ length: 226 }, (_, i) => 50 + i);
     const [form, setForm] = useState({username: '',email: '',password: '',height: '',age: '',weight: '', sex: '',lifestyle: '',plan: ''});
     const change= (e)=>{setForm({...form,[e.target.name]: e.target.value})};
     const submit=(e)=>{e.preventDefault();
         const url= `http://localhost:${port}/auth/register`;
          fetch(url,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(form)
  })
  .then(res=>{if(res.ok){return res.json()} else {throw new Error ("Errore nella res")}})
  .then(()=>{navigate("/login")})
  .catch(err=>console.log(err))
} 
     
    return(<>
    <h1 className='welcome'>Welcome</h1>
    <div style={{backgroundColor:'white'}} className='mt-5 rounded-3 welcome2'><h2 style={{color:'#FC7E00'}}>Start now with WellBodyForge</h2><h3 className='fw-bolder mt-5'>INSERT YOUR DATA</h3><Form onSubmit={submit} className='container mt-4'><Row className='justify-content-center' > 
        <Col xs={12} md={3} ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Username</h5>
        <Form.Control onChange={change} className="mt-2 "  type="text" placeholder="Choose your username" name='username' /></div></Col>
         <Col xs={12} md={3} ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Email</h5>
        <Form.Control onChange={change} className="mt-2 "  type="email" placeholder="Enter email"name='email' /></div></Col>
        <Col xs={12} md={3} ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Password</h5>
        <Form.Control onChange={change} className="mt-2 " type="password" placeholder="*Choose your password" name='password' /></div></Col> <Form.Label className='d-block mt-2 justify-content-center m-1 p-1' style={{color:'grey'}}>*The password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.</Form.Label> </Row>
      <Row className='justify-content-center mt-5'><Col xs={12} md={3}  ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Height</h5> <Form.Select onChange={change} name='height' defaultValue="" className='mt-2 mb-2'> <option value="">Select your height</option> {heights.map((h) => (<option key={h} value={h}>{h} cm</option>))}
            </Form.Select></div></Col><Col xs={12} md={3}><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Age</h5> <Form.Control onChange={change} name='age' className='mt-2 mb-2' type="number" placeholder="Enter your age"min={1} max={120}step={1}/></div></Col><Col xs={12} md={3}  ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Weight</h5>  <Form.Control onChange={change} name='weight' className='mt-2 mb-2' type="number" placeholder="kg" min={0} step={0.1} /></div></Col></Row>  
             <Row className='justify-content-center mt-5 mb-5'> <Col xs={12} md={3} ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Sex</h5><Form.Select onChange={change} name='sex' className='mt-2 mb-2'> <option value="">Select your gender</option><option value="M">M</option><option value="F">F</option>
  </Form.Select></div></Col>
  <Col xs={12} md={3} ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Lifestyle</h5><Form.Select onChange={change} name='lifestyle' className='mt-2 mb-2'> <option value="">Select your lifestyle</option><option value="SEDENTARY">Sedentary(less than 1 training for week)</option><option value="MODERATELY_ACTIVE">Moderately active (1-3 trainings for week)</option><option value="ATHLETIC">Athletic (more than 4 trainings for week)</option>
  </Form.Select></div></Col>
  <Col xs={12} md={3} ><div className='justify-content-center mr-2'><h5 className='m-0 p-0 fw-light'>Fitness plan</h5><Form.Select onChange={change} name='plan' className='mt-2 mb-2'> <option value="">Select your plan</option><option value="WEIGHT_LOSS">Weight loss</option><option value="MAINTENANCE">Maintenance</option><option value="BULK">Bulk</option>
  </Form.Select></div></Col><div className='d-block'><Button type='submit' className="text-center border-0 mt-5 mb-4" style={{background:'#FC7E00'}}  size="lg">Submit</Button></div></Row>
        </Form></div>
    </>)
}
export default Home