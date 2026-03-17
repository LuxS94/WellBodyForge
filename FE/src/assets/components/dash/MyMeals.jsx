import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import {Form}  from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap';
function MyMeals() {
 const [meals,setMeals]=useState([]);  
 const [dates, setDates] = useState(new Date()); 
 const[adMeal,setAdmeal]=useState({description:'',date:dates.toISOString().split("T")[0]})
  const port=import.meta.env.VITE_PORT;
    const [showForm, setShowForm] = useState(false);
  const Next = () => {
    const nextDate = new Date(dates);
    nextDate.setDate(nextDate.getDate() + 1);
    setDates(nextDate);
  };
const Prev = () => {
    const prevDate = new Date(dates);
    prevDate.setDate(prevDate.getDate() - 1);
    setDates(prevDate);
  };
     const fmeal=()=>{
fetch(`http://localhost:${port}/meals/my?date=${dates.toLocaleDateString("en-CA")}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(async(res)=>{ const data = await res.json();
        if(res.ok) 
        {return data;} else {throw new Error(data.message || data.error || "Error in response")}})
    .then((data) => {setMeals(data.content)})
    .catch(err=>console.log(err.message));  }
    const addMeal=(e)=>{e.preventDefault();
      const body = {
    description: adMeal.description,
    date: dates.toISOString().split("T")[0] 
  };
    fetch(`http://localhost:${port}/meals`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
       }, body:JSON.stringify(body)
    })
    .then(async(res)=>{ const data = await res.json();
        if(res.ok) 
        {return data;} else {throw new Error(data.message || data.error || "Error in response")}})
    .then(data=>{setMeals(prev => [...prev, data]); 
    setAdmeal({ description: '' });setShowForm(false);})
   .catch(err=>console.log(err.message)); 
    }
    const remove=(id)=>{
      fetch(`http://localhost:${port}/meals/delete/${id}` ,{
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(async(res)=>{ 
        if(res.ok){ fmeal();}
  })
  .catch(err => console.log(err.message)); 
    }

 useEffect(() => { 
    fmeal();
  }, [dates]);
  
  return (
    <>
    <h1 className="welcome">My Meals</h1>
       <div style={{backgroundColor:'white',textAlign:'center'}} className='mt-5 welcome2 rounded-3' >
        <div className='pt-3 ms-3 w-100 '>
      <i onClick={Prev} id='prev' class="bi bi-caret-left-fill"style={{color:'black'}}></i> <input
  type="date"
  value={dates.toLocaleDateString("en-CA")}
  onChange={(e) => setDates(new Date(e.target.value))}
/>
 <i onClick={Next} id='next' style={{color:'black'}}class="bi bi-caret-right-fill"></i></div>
      
       <Button  onClick={() => setShowForm(!showForm)} className= "text-center border-0 mt-4 mb-4 ms-4" style={{background:'#FC7E00'}}  size="lg">Add Meal</Button>
       {showForm && (<div className='d-flex justify-content-center pb-4' style={{zIndex: 9999, position: "sticky",
            top: 270}}>
        <Card className='w-75'
          style={{
            marginTop: "20px",
            maxWidth: "300px",
            padding: "15px",
            backgroundColor: "#fff",
          }}
        >
          <h5>Inserisci i dati</h5>
          <Form onSubmit={addMeal}>
            <Form.Group className="mb-3" controlId="exampleEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control   onChange={(e) =>{
    setAdmeal(prev => ({ ...prev, description: e.target.value }))}
  } name='description' as="textarea" rows={3} placeholder="Insert meal description" />
            </Form.Group>
          
            <Button type="submit"  style={{ background: "#FC7E00", border: "none" }}>
              Add
            </Button>
          </Form>
        </Card></div>
      )}
      <Row className='justify-content-center '>
 {meals.map(meal => (
    <Col xs={11} md={6} lg={3} className='d-flex justify-content-center '><Card style={{maxWidth:'400px'}} key={meal.id} className="mb-5 ms-4 mt-2 border-black">
      <Card.Body className='align-content-center'>
        <Card.Title >{meal.description}:</Card.Title>
        <Card.Footer>{meal.mealFoods.map(f => (
        <p key={f.food.id}>
          {f.food.name} – {f.grams} g  </p>
           ))}</Card.Footer>
           <Card.Footer><p><strong>Calories:</strong> {meal.tot_kcal} kcal</p>
           <p><strong>Protein:</strong> {meal.tot_protein} g</p>
        <p><strong>Carbs:</strong> {meal.tot_carbs} g</p>
        <p><strong>Fat:</strong> {meal.tot_fat} g</p></Card.Footer><div className='d-flex justify-content-center align-content-center'>
        <Button style={{background:'#FC7E00',maxHeight:'38px'}} className= "text-center me-2 mb-2" size="md">Add food</Button>
        <Button style={{maxHeight:'38px'}} onClick={()=>remove(meal.id)} variant="danger" className= "text-center " size="md">Remove</Button></div>
      </Card.Body>
    </Card></Col>
  ))}</Row>
       </div>
      
    </>
  );}

export default MyMeals