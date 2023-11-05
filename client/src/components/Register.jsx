import React from 'react'
import './auth.css'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const registerUser = async (e)=>{
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value
        const passwd = e.target[2].value
        const conPasswd = e.target[3].value
        if(passwd !== conPasswd){
            alert("Passwords dont't match!!!")
            return 
        }

        const res = await axios.post("http://localhost:5000/users",{
            name,
            email,
            password:passwd
        });

        alert(res.data.message);

    }
  return (
    <div className='auth-container'>
      <form onSubmit={registerUser}>
        <input type="text" name='name' placeholder='Name' />
        <input type="email" name='email' placeholder='example@yourmail.com' />
        <input type="password" name='password' placeholder='Password' />
        <input type="password" name='confirm-password' placeholder='Confirm Password' />
        <input type="submit" value={"Register"} />
        <span>Already have account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}

export default Register
