import React, {useState, useContext} from 'react'
import UserContext from '../Context/UserContext';

function Login() {
    const  [userName, setUserName] = useState('');
    const [password, setpassword] = useState('')

    const {setUser} = useContext(UserContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        setUser({userName, password})
    }
  return (
    <div>
        <h2>Login</h2>
        <input  
        value = {userName} 
        onChange={(e) => setUserName(e.target.value)}  type="text" placeholder='username' />
        <input value={password} onChange={(e) => setpassword(e.target.value)} type="text" placeholder='password' />
        <button onClick={handleSubmit}>Submit</button>
    </div>
 )
}

export default Login;