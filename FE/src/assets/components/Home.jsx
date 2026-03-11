import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

function Home() {
    return(<>
    <h1 className='welcome'>Welcome</h1>
    <div style={{backgroundColor:'white'}} className='mt-5 rounded-3 welcome2'><h2 style={{color:'#FC7E00'}}>Start now with WellBodyForge</h2><h3 className='fw-bolder mt-5'>INSERT YOUR DATA</h3> <Form.Group className="m-3"  controlId="formBasicEmail">
        <Form.Label >Email address</Form.Label>
        <Form.Control className="m-3 d-inline" style={{width:'300px'}}  type="email" placeholder="Enter email" />
        <Form.Label>Password</Form.Label>
        <Form.Control className="m-3 d-inline" style={{width:'300px'}} type="password" placeholder="Password" /> </Form.Group></div>
    </>)
}
export default Home