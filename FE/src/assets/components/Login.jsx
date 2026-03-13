import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function Login() {
     const [loading, setLoading] = useState(false); 
    const [form,setForm]=useState ({username:'',password:''});
    const change=(e)=>{setForm({...form,[e.target.name]: e.target.value})};
    const port = import.meta.env.VITE_PORT;
    const navigate = useNavigate();
    const submit=(e)=>{e.preventDefault();
const url=`http://localhost:${port}/auth/login`;
 if (loading) return; setLoading(true);
fetch(url,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(form)
  })
  .then( async res=>{ const data = await res.json();if(res.ok){return data} else {throw new Error (data.message || data.error||"Error in response")}})
  .then(data=>{localStorage.setItem('token', data.token);})
  .catch(err=>{console.log(err.message);navigate("/error", { state: { message: err.message } })
  .finally (()=> {setLoading(false)})
})
    };
    return(<>
     {loading && (
      <div className="loading-overlay">
        <Spinner animation="border" variant="warning" />
      </div>)} //spinner
    <h1 className='welcome' style={{color:"white", textAlign:"center"}}>Nice to see you again!</h1>
    <div style={{backgroundColor:'white', maxWidth:'640px'}} className='mt-5 rounded-3 welcome2 mx-auto'>
        <h2 style={{color:'#FC7E00', paddingTop:"50px"}}>Log in to continue</h2>
        <Form onSubmit={submit}  className='container mt-1 '>
            <Row > 
        <Col className=' d-flex justify-content-center'  xs={12}>
        <div className='d-flex align-items-center flex-column' style={{width:"100%", maxWidth:"640px"}}>
            <h5 className='m-0 p-0 fw-light '>Username</h5>
        <Form.Control onChange={change} style={{maxWidth:"500px", textAlign:"center"}} className="mt-3"  type="text" placeholder="Choose your username" name='username' />
        </div></Col>
         <Col className=' d-flex justify-content-center'  xs={12}>
        <div className='d-flex align-items-center flex-column mt-5' style={{width:"100%", maxWidth:"640px"}}>
            <h5 className='m-0 p-0 fw-light '>Password</h5>
        <Form.Control  onChange={change} style={{maxWidth:"500px", textAlign:"center"}} type="password" className="mt-3" placeholder="Choose your password" name='password' />
        </div></Col>
        </Row>
        <div className='d-block pb-3'><Button type='submit' disabled={loading} className="text-center border-0 mt-5 mb-4 " style={{background:'#FC7E00'}}  size="lg">Log in</Button></div>
        </Form>
    </div>
    </>)
}   
export default Login