import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
function MyNav() {
  const user = localStorage.getItem("username");
   const [username, setUsername] = useState(localStorage.getItem("logged")==="true" && user?.trim() ? user : null);
   
   const logout= ()=>{localStorage.removeItem("token"); localStorage.removeItem("username"); localStorage.setItem("logged", "false"); setUsername(null);window.location.href = "/login";}
    return(<>
 <Navbar expand="md" sticky="top" style={{backgroundColor: '#ffffff',padding:'0',marginTop:'15px'}} data-bs-theme="light">
        <Container  >
         
           <Navbar.Brand style={{padding:'0'}} as={Link} to={username ? '/homeLog' : '/'} ><img style={{height:'50px',padding:'0'}} src='\logo.jpg'></img></Navbar.Brand>
{/*mobile version--------------------------------------------------------------------------------------------------  */}
            <Nav.Link id='login' style={{height:'50px'}} className='align-content-center d-flex justify-content-center d-md-none align-items-center' as={Link} to={username ? '/profile' : '/login'}>{username 
            ?( <><i className="bi bi-person-circle me-2 mb-1"></i>{username}<span className='d-inline ms-3' style={{color:'#c41b1b'}}  onClick={(e)=>{ e.stopPropagation();logout()}}>LogOut</span></>)
            : (<><i className="bi bi-person-circle me-3 mb-1"></i>LogIn</>)
          }</Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
           <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
            <Nav.Link className='align-content-center fw-bolder' style={{color: '#fc7e00'}} as={Link} to={username ? '/homeLog' : '/'}>Home</Nav.Link>
             <Nav.Link className='align-content-center fw-bolder'  style={{color: '#fc7e00'}} as={Link} to='/learnMore'>More</Nav.Link>
{/* desktop version ----------------------------------------------------------------------------------------------*/}
             {username 
            ?( <><Nav.Link className='align-content-center fw-bolder'as={Link}  style={{color: '#fc7e00'}} to='/dashboard'>My dashboard</Nav.Link><Nav.Link className='align-content-center fw-bolder'as={Link}  style={{color: '#fc7e00'}} to='/foods'>Food</Nav.Link></>):null}
          </Nav>
          <Nav>
          <Nav.Link id='login' style={{height:'50px'}} className='align-content-center d-none d-md-flex justify-content-center align-items-center' as={Link} to={username ? '/profile' : '/login'}>{username 
            ?( <><i className="bi bi-person-circle me-2 mb-1"></i>{username}<span className='d-inline ms-3' style={{color:'#c41b1b'}}  onClick={logout}>LogOut</span></>)
            : (<><i className="bi bi-person-circle me-3 mb-1"></i>LogIn</>)
          }</Nav.Link></Nav>
    </Navbar.Collapse>
        </Container>
      </Navbar></>)}
      export default MyNav