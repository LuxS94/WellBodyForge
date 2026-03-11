import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css';
function MyNav() {
    return(<>
 <Navbar sticky="top"  style={{backgroundColor: '#ffffff',padding:'0',marginTop:'15px'}} data-bs-theme="light">
        <Container  >
         
          <Nav className="me-auto,justify-content-center" > <Navbar.Brand style={{padding:'0'}} as={Link} to='/' ><img style={{height:'50px',padding:'0'}} src='src\assets\components\img\unnamed.jpg'></img></Navbar.Brand>
            <Nav.Link className='align-content-center fw-bolder' as={Link} to='/'>Home</Nav.Link>
             <Nav.Link className='align-content-center fw-bolder'as={Link} to='/learnMore'>More</Nav.Link>
          </Nav>
          <Nav.Link id='login' style={{height:'50px'}} className='align-content-center' as={Link} to=''><i className="bi bi-person-circle me-3 mb-1"></i>LogIn</Nav.Link>
        </Container>
      </Navbar></>)}
      export default MyNav