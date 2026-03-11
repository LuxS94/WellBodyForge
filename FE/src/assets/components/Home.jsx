import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';


function Home() {
    return(<>
    <h1 className='welcome'>Welcome</h1>
    <div style={{backgroundColor:'white'}} className='mt-5 rounded-3 welcome2'><h2 style={{color:'#FC7E00'}}>Start now with WellBodyForge</h2><h3 className='fw-bolder mt-5'>INSERT YOUR DATA</h3><Form className='container mt-4'><Row > <Form.Group className=""  controlId="formBasicEmail">
        <Col className='d-inline xs={12} m={4} lg={3}'>
        <Form.Control className="m-2 d-inline me-lg-5 ms-lg-5 mt-2 " style={{ maxWidth: '280px'}} type="text" placeholder="Choose your username" /></Col>
         <Col className='d-inline xs={12} m={4} lg={3}'>
        <Form.Control className="m-2 d-inline me-lg-5 ms-lg-5 mt-2 " style={{ maxWidth: '280px'}} type="email" placeholder="Enter email" /></Col>
        <Col className='d-inline xs={12} m={4} lg={3}'>
        <Form.Control className="m-2 d-inline me-lg-5 ms-lg-5 mt-2" style={{ maxWidth: '280px'}}type="password" placeholder="*Choose your password" /> <Form.Label className='d-block mt-2' style={{color:'grey'}}>*The password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.</Form.Label> </Col></Form.Group></Row></Form></div>
    </>)
}
export default Home