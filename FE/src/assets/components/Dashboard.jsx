import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { useEffect } from 'react';
import useUser from "../script/useUser";
function Dashboard () {
  const navigate = useNavigate();
  const user = useUser();
  useEffect(() => {
  if(localStorage.getItem("logged") === "false"){navigate("/error")}},);
    const username= localStorage.getItem("username");
    return(<><h1 className='welcome' >Hello {username}!</h1>
    <div style={{backgroundColor:'white',textAlign:'left'}} className='mt-5 welcome2 rounded-3 pt-1 pb-1' >
        <h2 style={{textDecoration:'bolder',margin:'30px'}}>{username}'s dashboard:</h2>
        <Row className='d-flex justify-content-center '>
            <Col xs={12} sm={6} lg={3}>
 <Card className='mcard text-center' onClick={() => navigate('/profile')}>
      <Card.Body>
        <Card.Title><i className="bi bi-person-circle me-2  mb-1"></i>My Profile</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Show my profile</Card.Subtitle>
      </Card.Body>
    </Card></Col>{user.role==="USER"?(<> <Col xs={12} sm={6} lg={3}>
 <Card className='mcard text-center' onClick={() => navigate('/target')}>
      <Card.Body>
        <Card.Title><i class="bi bi-bullseye me-2  mb-1"></i>Target</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Show my target</Card.Subtitle>
      </Card.Body>
    </Card></Col></>):(null)}</Row>
    </div>
   
    </>)
}
export default Dashboard