import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
function MyMeals() {
 const [meals,setMeals]=useState([]);   
   const [date, setDate] = useState(new Date());
  const Next = () => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    setDate(nextDate);
  };
const Prev = () => {
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    setDate(prevDate);
  };
     const fmeal=()=>{
const port=import.meta.env.VITE_PORT;
fetch(`http://localhost:${port}/meals/my?date=${date.toLocaleDateString("en-CA")}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(async(res)=>{ const data = await res.json();
        if(res.ok) 
        {return data;} else {throw new Error('Error in response')}})
    .then((data) => {setMeals(data.content)})
    .catch(err=>console.log(err.message));  }
 useEffect(() => { 
   
    fmeal();
  }, [date]);
  
  return (
    <>
    <h1 className="welcome">My Meals</h1>
       <div style={{backgroundColor:'white',textAlign:'center'}} className='mt-5 welcome2 rounded-3' >
        <div className='pt-3 ms-3 w-100'>
      <i onClick={Prev} id='prev' class="bi bi-caret-left-fill"style={{color:'black'}}></i> <input
  type="date"
  value={date.toLocaleDateString("en-CA")}
  onChange={(e) => setDate(new Date(e.target.value))}
/>
 <i onClick={Next} id='next' style={{color:'black'}}class="bi bi-caret-right-fill"></i></div>
      
       <Button  className= "text-center border-0 mt-4 mb-4 ms-3" style={{background:'#FC7E00'}}  size="lg">Add Meal</Button>
 {meals.map(meal => (
    <Card style={{maxWidth:'300px'}} key={meal.id} className="mb-3 ms-3 mt-2">
      <Card.Body>
        <Card.Title >{meal.description}</Card.Title>
        <Card.Footer>{meal.mealFoods.map(f => (
        <p key={f.food.id}>
          {f.food.name} – {f.grams} g  </p>
           ))}</Card.Footer>
           <Card.Footer><p><strong>Calories:</strong> {meal.tot_kcal} kcal</p>
           <p><strong>Protein:</strong> {meal.tot_protein} g</p>
        <p><strong>Carbs:</strong> {meal.tot_carbs} g</p>
        <p><strong>Fat:</strong> {meal.tot_fat} g</p></Card.Footer>
      </Card.Body>
    </Card>
  ))}
       </div>
      
    </>
  );}

export default MyMeals