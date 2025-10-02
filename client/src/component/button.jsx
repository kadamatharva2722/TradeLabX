import { useNavigate } from 'react-router';
import './buttons.css';


function Buttonn(){
    const navigate=useNavigate();
    return(
        <div className='align-button'> 
            <button className='log-in' onClick={()=>navigate('/login')} >Login</button>
            <button className='sign-in' onClick={()=>navigate('/signin')}>Signin</button>
        </div>
    )
}
export default Buttonn;
