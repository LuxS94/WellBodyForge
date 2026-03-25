import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

function CustomTarget() {
     const navigate = useNavigate();
    const url = `https://beautiful-rubie-luxs94-fb56ef61.koyeb.app/target/myTarget`;
    const[target,setTarget]=useState({kcal:'',carbs:'',protein:'',fat:''})
 useEffect(() => {
fetch(url, {
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
  });}, [])

  const change= (e)=>{setTarget({...target,[e.target.name]: e.target.value})};

  const submit = (e) => {
   e.preventDefault();
   const url = `https://beautiful-rubie-luxs94-fb56ef61.koyeb.app/target/updateMyTarget`;
   fetch(url, {
     method: "PUT",
     headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(target)
  })
  .then (async (res) => {
    const data = await res.json();
    if (res.ok) { return data; } else {throw new Error(data.message || data.error || "Error in response");}})
    .then((data) => {setTarget({kcal: data.kcal, carbs: data.carbs, protein: data.protein, fat: data.fat});navigate("/target")})
    .catch((err) => {console.log(err.message); navigate("/error", { state: { message: err.message } });});}

    const reset = () => {
        const url = `https://beautiful-rubie-luxs94-fb56ef61.koyeb.app/target/turnDefault`;
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
        .then (async (res) => {const data = await res.json();if (res.ok) { return data; } else {throw new Error(data.message || data.error || "Error in response");}})
            .then((data) => {setTarget({kcal: data.kcal, carbs: data.carbs, protein: data.protein, fat: data.fat});navigate("/target")})
            .catch((err) => {console.log(err.message); navigate("/error", { state: { message: err.message } });});
    }
  return (
   <> <div style={{backgroundColor:'white', maxWidth:'640px'}} className='mt-5 rounded-3 welcome2 mx-auto' >
    <h3 style={{textDecoration:'bolder',color:'#FC7E00'}}>Customize Target</h3>
    <Form onSubmit={submit} className='pe-3'>
        <Row className='align-items-center'><Col xs={4}><h5 className='m-3 fw-light'>Kcal: </h5></Col><Col xs={8}>  <Form.Control name='kcal' className='' style={{maxWidth:'300px'}} type="number" placeholder="kcal" min={0} step={0.01} value={target.kcal} onChange={change}/></Col></Row>
         <Row className='align-items-center'><Col xs={4}><h5 className='m-3 fw-light'>Carbs: </h5></Col><Col xs={8}>  <Form.Control onChange={change} name='carbs' className='' style={{maxWidth:'300px'}} type="number" placeholder="carbs" min={0} step={0.01} value={target.carbs}/></Col></Row>
          <Row className='align-items-center'><Col xs={4}><h5 className='m-3 fw-light'>Protein: </h5></Col><Col xs={8}>  <Form.Control onChange={change} name='protein' className='ms-1 ps-1' style={{maxWidth:'300px'}} type="number" placeholder="protein" min={0} step={0.01} value={target.protein}/></Col></Row>
           <Row className='align-items-center'><Col xs={4}><h5 className='m-3 fw-light'>Fat: </h5></Col><Col xs={8}>  <Form.Control onChange={change} name='fat' className='ms-1 ps-1' style={{maxWidth:'300px'}} type="number" placeholder="fat" min={0} step={0.01} value={target.fat}/></Col></Row>
            <Button type='submit' className="text-center border-0 mt-4 mb-4" style={{background:'#FC7E00'}}  size="lg">Save</Button>  <Button type='button' onClick={reset} className="primary text-center border-0 mt-4 ms-4 mb-4" size="lg">Reset</Button>
    </Form>
    
    </div></>
  );
}
export default CustomTarget;