import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import {Form}  from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap';
import{Link} from "react-router-dom";
function MyMeals() {
 const [meals,setMeals]=useState([]);  //for meals
 const [dates, setDates] = useState(new Date()); //for date
 const[adMeal,setAdmeal]=useState({description:'',date:dates.toISOString().split("T")[0]}) //add meals
  const port=import.meta.env.VITE_PORT;
 const [showForm, setShowForm] = useState(false);//form to add meal
 const[showAddFoodForm,setShowAddFoodForm]=useState(null);//form to add food
 const[mealFood,setMealFood]=useState({id:null,grams:'',foodName:'',foodId:null})//for food
 const [foodSuggestions, setFoodSuggestions] = useState([]);//for form food to autocomplete 
  const[target,setTarget]=useState({kcal:'',carbs:'',protein:'',fat:''})//for target
  const dailyTotals = meals.reduce(                     //calculate tot daily macros
  (acc, meal) => {
    return {
      calories: acc.calories + (meal.tot_kcal || 0),
      protein: acc.protein + (meal.tot_protein || 0),
      carbs: acc.carbs + (meal.tot_carbs || 0),
      fat: acc.fat + (meal.tot_fat || 0),
    };
  },
  { calories: 0, protein: 0, carbs: 0, fat: 0 }
);
 //next and prev button----------------------------------------------------------------------------------------------
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
  //get meals-----------------------------------------------------------------------------------------------------------
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
    //add meal-----------------------------------------------------------------------------------------------------------
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
    //remove meal-------------------------------------------------------------------------------------------------------
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
    //get all foods for suggestions--------------------------------------------------------------
const fetchFoodSuggestions = (query) => {
  let lastQuery = "";
  lastQuery = query;
  if (!query) {
    setFoodSuggestions([]);
    return;
  }
  fetch(`http://localhost:${port}/food/f/all?page=0&size=1000`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (query !== lastQuery) return;
      const filtered = data.content.filter(f =>
        f.name.toLowerCase().includes(query.toLowerCase())
      );
      setFoodSuggestions(filtered);
    })
    .catch(err => console.log(err));
};
//post mealFood-------------------------------------------------------------------
const addMealFood = (e, mealId) => {
  e.preventDefault();
  if (!mealFood.foodId) {
  alert("Select a food !");
  return;
}
  const body = {
    mealId: mealId.toString(),
    foodId: mealFood.foodId?.toString(),
    grams: parseFloat(mealFood.grams)
  };
  fetch(`http://localhost:${port}/mealFood/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(body)
  })
    .then(async res => {
      const data = await res.json();
      if (res.ok) return data;
      else throw new Error(data.message || "Errore");
    })
    .then(() => {
      setShowAddFoodForm(null);
      setMealFood({ foodName: '', foodId: null, grams: '' });
      fmeal(); 
    })
    .catch(err => console.log(err.message));
};
//remove mealFood--------------------------------------------------------------------------------------------
const removeMealFood = (mealFoodId) => {
  fetch(`http://localhost:${port}/mealFood/my/${mealFoodId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(res => {
      if (res.ok) {
        setMeals(prevMeals => prevMeals.map(meal => ({
          ...meal,
          mealFoods: meal.mealFoods.filter(f => f.food.id !== mealFoodId),
          
        })));
      } else {
        console.error("Error");
      }
      })
      .then(()=> fmeal())
    .catch(err => console.log(err));
};
//fetch to get target---------------------------------------------------------------------------------------
const targ=()=>{
  fetch(`http://localhost:${port}/target/myTarget`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then(async (res) => {
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.message || data.error || "Error in response");
    }
  })
  .then((data) => {
    setTarget({
      kcal: data.kcal,
      carbs: data.carbs,
        protein: data.protein,
        fat: data.fat
  })})
  .catch((err) => {
    console.log(err.message);
  });}


//-----------------------------------------------------------------------------------------------------------
 useEffect(() => { 
    fmeal();
    targ();
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
  {/* /* open meal entry form ------------------------------------------------------------------------------------*/} 
       <Button  onClick={() => setShowForm(!showForm)} className= "text-center border-0 mt-4 mb-4 ms-4" style={{background:'#FC7E00'}}  size="lg">Add Meal</Button>
       {showForm && (<div className='d-flex justify-content-center pb-4' style={{zIndex: 9999, position: "sticky",
            top: 270}}>
        <Card 
          style={{
            marginTop: "20px",
            width:"500px",
            padding: "15px",
            backgroundColor: "#fff",
            
          }}
        >
          <h5>Insert meal</h5>
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
      {/* comparision section -------------------------------------------------------------------------------------*/}
       <Row className='justify-content-center my-2 '><div className='d-flex flex-row flex-wrap align-items-center justify-content-center align-content-center w-100'><h3 style={{color:'black'}}>Target/Actual:</h3><div className='d-flex flex-row '><p>Kcal: {target.kcal}/</p><p className='ms-0' style={{color: dailyTotals.calories>target.kcal?'red':'green'}}>{dailyTotals.calories.toFixed(2)}</p></div><div className='d-flex flex-row'><p>Protein: {target.protein}/</p><p className='ms-0' style={{color: dailyTotals.protein>target.protein?'red':'green'}}>{dailyTotals.protein.toFixed(2)}</p></div><div className='d-flex flex-row'><p>Carbs: {target.carbs}/</p><p className='ms-0' style={{color: dailyTotals.carbs>target.carbs?'red':'green'}}>{dailyTotals.carbs.toFixed(2)}</p></div><div className='d-flex flex-row'><p>Fat: {target.fat}/</p><p className='ms-0' style={{color: dailyTotals.fat>target.fat?'red':'green'}}>{dailyTotals.fat.toFixed(2)}</p></div></div></Row>
       {/* meal's cards ------------------------------------------------------------------------------------------------ */}
      <Row className='justify-content-center '>
 {meals.map(meal => (
    <Col xs={10} md={6} lg={3} className='d-flex justify-content-center'><Card style={{maxWidth:'400px'}} key={meal.id} className="mb-5 me-1 ms-1 mt-2 border-black">
      <Card.Body className='align-content-center'>
        <Card.Title >{meal.description}:</Card.Title>
        <Card.Footer>{meal.mealFoods.map(f => (
        <p key={f.food.id}>
          {f.food.name} – {f.grams} g  <i onClick={() => removeMealFood(f.id)} class="bi bi-trash ms-1" style={{color:'red'}}></i></p> 
           ))}</Card.Footer>
           <Card.Footer><p><strong>Calories:</strong> {meal.tot_kcal.toFixed(2)} kcal</p>
           <p><strong>Protein:</strong> {meal.tot_protein.toFixed(2)} g</p>
        <p><strong>Carbs:</strong> {meal.tot_carbs.toFixed(2)} g</p>
        <p><strong>Fat:</strong> {meal.tot_fat.toFixed(2)} g</p></Card.Footer><div className='d-flex justify-content-center align-content-center'>
{/* card's buttons-------------------------------------------------------------------------------------------------------*/}
        <Button style={{background:'#FC7E00',maxHeight:'38px',borderColor:'#FC7E00'}} className= "text-center me-2 mb-2" size="md" onClick={()=>{setShowAddFoodForm(meal.id);setMealFood({id:'',grams:'',foodName:'',foodId:null});setFoodSuggestions([]);}}>Add food</Button>
        <Button style={{maxHeight:'38px'}} onClick={()=>remove(meal.id)} variant="danger" className= "text-center " size="md">Delete</Button>
{/* add food form  ---------------------------------------------------------------------------------------------------------*/}
        {showAddFoodForm===meal.id &&(
<div style={{position:'fixed',zIndex:'9999',top:'280px',left:'auto',right:'auto',width:'600px',maxWidth:'90%'}}>
          <Card className="mt-2 p-3 w-75 border-4"style={{borderColor:'#FC7E00'}} >
    <Form onSubmit={(e) => addMealFood(e, meal.id)}>
      <Form.Group className="mb-2">
        <Form.Label>Food</Form.Label>
        <Form.Control
          type="text"
          value={mealFood.foodName}
          onChange={(e) => {
  const value = e.target.value;
  setMealFood({ ...mealFood, foodName: value, foodId: null });

  if (!value) {
    setFoodSuggestions([]);
  } else {
    fetchFoodSuggestions(value);
  }
}}
          placeholder="Start typing food..."
        />
        {foodSuggestions.length > 0 && (
          <div className="suggestions" style={{ border: '1px solid #ccc', maxHeight: '100px', overflowY: 'auto' }}>
            {foodSuggestions.map(f => (
              <div
                key={f.id}
                onClick={() => {setMealFood({ ...mealFood, foodName: f.name, foodId: f.id });setFoodSuggestions([])}}
                style={{ cursor: 'pointer', padding: '2px 5px' }}
              >
                {f.name}
              </div>
            ))}
          </div>
        )}
<Form.Label style={{color:'grey'}}>Can't you find your food?<Link to='/foods'> Add it yourself!</Link></Form.Label>        
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Grams</Form.Label>
        <Form.Control
          type="number"
          value={mealFood.grams}
          onChange={(e) => setMealFood({ ...mealFood, grams: e.target.value })}
        />
      </Form.Group>

      <Button type="submit" style={{ background:'#FC7E00', border:'none' }}>Add</Button>
      <Button variant="danger" onClick={() => setShowAddFoodForm(null)} className="ms-2">Cancel</Button>
    </Form>
  </Card></div>
)}
 
        </div>
      </Card.Body>
    </Card></Col>
  ))}</Row>
       </div>
      
    </>
  );}

export default MyMeals