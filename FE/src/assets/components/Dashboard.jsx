import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import useUser from "../script/useUser";
function Dashboard () {
  const navigate = useNavigate();
  const user = useUser();
    const username= localStorage.getItem("username");
    return(<><h1 className='welcome' >Hello {username}!</h1>
    <div style={{backgroundColor:'white',textAlign:'left'}} className='mt-5 welcome2 rounded-3 pt-1 pb-1' >
        <h2 style={{textDecoration:'bolder',margin:'30px'}}>{username}'s dashboard:</h2>
        <Row className='d-flex justify-content-center '>
            <Col xs={12} sm={6} lg={3} className='d-flex justify-content-center'>
 <Card className={user.role==="USER"? 'mcard':'acard' }onClick={() => navigate('/profile')}>
      <Card.Body>
        <Card.Title><i className="bi bi-person-circle me-2  mb-1"></i>My Profile</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Show my profile</Card.Subtitle>
      </Card.Body>
    </Card></Col>
    {/* user only-------------------------------------------------------------------------------------------- */}
    {user.role==="USER"?(<> <Col xs={12} sm={6} lg={3} className='d-flex justify-content-center'>
 <Card className='mcard d-flex justify-content-center align-items-center' onClick={() => navigate('/target')}>
      <Card.Body>
        <Card.Title><i class="bi bi-bullseye me-2  mb-1"></i>Target</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Show my target</Card.Subtitle>
      </Card.Body>
    </Card></Col>
    <> <Col xs={12} sm={6} lg={3} className='d-flex justify-content-center'>
 <Card className='mcard d-flex justify-content-center align-items-center' onClick={() => navigate('/myMeals')}>
      <Card.Body>
        <Card.Title><i class="bi bi-fork-knife me-2  mb-1"></i>My Meals</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Manage my meals</Card.Subtitle>
      </Card.Body>
    </Card></Col></></>):(null)}
    {/* ---------------------------------------------------------------------------------------------------------------- */}
    <Col xs={12} sm={6} lg={3} className='d-flex justify-content-center'>
 <Card className={user.role==="USER"? 'mcard':'acard' }onClick={() => navigate('/foods')}>
      <Card.Body>
        <Card.Title><i class="bi bi-egg-fried me-2 mb-1"></i>Food</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">View all foods</Card.Subtitle>
      </Card.Body>
    </Card></Col>
    {/* admin only----------------------------------------------------------------------------------------------------- */}
    {user.role==="ADMIN"?(<><Col xs={12} sm={6} lg={3} className='d-flex justify-content-center'>
 <Card className='acard' onClick={() => navigate('/nuser')}>
      <Card.Body>
        <Card.Title><i class="bi bi-person-add me-2 mb-1"></i>New User</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Create new user</Card.Subtitle>
      </Card.Body>
    </Card></Col>
    <Col xs={12} sm={6} lg={3} className='d-flex justify-content-center'>
 <Card className='acard' onClick={() => navigate('/nadmin')}>
      <Card.Body>
        <Card.Title><i class="bi bi-person-gear me-2 mb-1"></i>New Admin</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Create new admin</Card.Subtitle>
      </Card.Body>
    </Card></Col>
    <Col xs={12} sm={6} lg={3} className='d-flex justify-content-center'>
 <Card className='acard' onClick={() => navigate('/vuser')}>
      <Card.Body>
        <Card.Title><i class="bi bi-people me-2 mb-1"></i>All Users</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Show,update or delete users</Card.Subtitle>
      </Card.Body>
    </Card></Col>
    </>):null}
    </Row>
    </div>
   
    </>)
}
export default Dashboard