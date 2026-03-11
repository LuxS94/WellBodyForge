import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
function LearnMore() {
    return(<>
   <h1 className='welcome' >Forge your body,build your health</h1>
    <div style={{backgroundColor:'white',textAlign:'left'}} className='mt-5 welcome2 rounded-3' ><h2 style={{textDecoration:'bolder',color:'#FC7E00'}}>What is WellBodyForge?</h2><p>WellBodyForge is the platform designed to help you track your nutrition and progress so you can reach your best physical shape.</p>
    <h5 ><i class="bi bi-graph-up me-3 "></i>Track your routine</h5><p>Log your body weight,height,age and your fitness goals.</p><h5><i class="bi bi-fork-knife me-3"></i>Control your nutrition</h5><p>Monitor calories and macronutrients to stay consistent with your nutrition plan.</p><h5><i class="bi bi-trophy me-3"></i>Reach your goals</h5><p>Increase your wellness and achieve your fitness aspirations.</p><h3 style={{color:'#FC7E00'}} className="mt-5">Costancy builds results.</h3><p>WellBodyForge was created to turn discipline and data into real progress.</p><h5 className="mt-5 text-center">Start your journey today</h5><div className="text-center"> <Link to='/'><Button className="text-center border-0 mt-3 mb-4" style={{background:'#FC7E00'}}  size="lg">Register now</Button></Link></div></div>
    </>)
}
export default LearnMore