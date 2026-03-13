import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link, useNavigate } from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
function MyNav() {
  const user = localStorage.getItem("username");
   const [username, setUsername] = useState(localStorage.getItem("logged")==="true" && user?.trim() ? user : null);
   const navigate= useNavigate();
   const logout= ()=>{localStorage.removeItem("token"); localStorage.removeItem("username"); localStorage.setItem("logged", "false"); setUsername(null);navigate("/")}
   useEffect(()=>{})
    return(<>
 <Navbar sticky="top"  style={{backgroundColor: '#ffffff',padding:'0',marginTop:'15px'}} data-bs-theme="light">
        <Container  >
         
          <Nav className="me-auto,justify-content-center" > <Navbar.Brand style={{padding:'0'}} as={Link} to='/' ><img style={{height:'50px',padding:'0'}} src='src\assets\components\img\unnamed.jpg'></img></Navbar.Brand>
            <Nav.Link className='align-content-center fw-bolder' as={Link} to='/'>Home</Nav.Link>
             <Nav.Link className='align-content-center fw-bolder'as={Link} to='/learnMore'>More</Nav.Link>
          </Nav>
          <Nav.Link id='login' style={{height:'50px'}} className='align-content-center d-flex justify-content-center align-items-center' as={Link} to={username ? '#' : '/login'}>{username 
            ?( <><i className="bi bi-person-circle me-2 mb-1"></i>{username}<Nav.Link className='d-inline ms-3' style={{color:'#c41b1b'}}  onClick={logout}>LogOut</Nav.Link></>)
            : (<><i className="bi bi-person-circle me-3 mb-1"></i>LogIn</>)
          }</Nav.Link>
        </Container>
      </Navbar></>)}
      export default MyNav