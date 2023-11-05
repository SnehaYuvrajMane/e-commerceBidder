import './auth.css'
import React,{Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import cookieCutter from 'cookie-cutter'


function Login() {

    const navigate = useNavigate();

    const loginUser = async(e) =>{
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value

        const res = await axios.post("http://localhost:5000/users/login",{
            email,
            password
        });

        if(res.data.status === 'failed'){
            alert(res.data.status)
        }
        else{
                cookieCutter.set('token',res.data.token)
                cookieCutter.set('user',res.data._id)
                cookieCutter.set('name',res.data.name)
                navigate('/')
        }   

    }

  return (
    <div className='auth-container'>
      <form onSubmit={loginUser}>
        <input type="email" name="username" placeholder="email" />
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" value="Login" />
        <span>Do not have account? <Link to="/register">Register</Link></span>
      </form>

    </div>
  )
}

export default Login
