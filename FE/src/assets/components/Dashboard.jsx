import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
function Dashboard () {
    const username= localStorage.getItem("username");
    const navigate = useNavigate();
    return(<><h1 className='welcome' >Hello {username}!</h1>
    <div style={{backgroundColor:'white',textAlign:'left'}} className='mt-5 welcome2 rounded-3 pt-1 pb-1' >
        <h2 style={{textDecoration:'bolder',margin:'30px'}}>{username}'s dashboard:</h2>
        <Row>
            <Col xs={12} md={6} lg={3}>
 <Card className='mcard' onClick={() => navigate('/profile')}>
      <Card.Body>
        <Card.Title><i className="bi bi-person-circle me-2 mb-1"></i>My Profile</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Show my profile</Card.Subtitle>
      </Card.Body>
    </Card></Col></Row>
    </div>
   
    </>)
}
export default Dashboard