
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword]= useState('')
    const navigate = useNavigate();
    

    const handlelogin = async ()=>{
        try {
            const response= await fetch("http://localhost:5000/login",{
            method:'post',
            body:JSON.stringify({ email, password}),
            headers:{
               'Content-Type':'application/json'
            }
        });
        const result = await response.json()
        console.log(result);

        if(result){
            navigate('/Dashboard')
        }else{
            console.warn("enter corrct details")
        }
        
        } catch (error) {
         console.error('Login Failed', error)   
        }
    }
    
  return (
    <div className="auth-wrapper">
        <div className="auth-bg">
                <span className="r"></span>
                <span className="r s"></span>
                <span className="r s"></span>
                <span className="r"></span>
            </div> 
    <div className='auth-content'>


            
            <div className="card">
                <div className="card-body text-center">
                    <div className="mb-4">
                        <i className="feather icon-unlock auth-icon"></i>
                    </div>
                    <h3 className="mb-4">Entrar</h3>
                    <div className="input-group mb-3">
                        <input 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        type="text" className="form-control" placeholder="Correo"/>
                    </div>
                    <div className="input-group mb-4">
                        <input 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        type="password" className="form-control" placeholder="Contrasena"/>
                    </div>
                    <div className="form-group text-left">
                        <div className="checkbox checkbox-fill d-inline">
                          
                        </div>
                    </div>
                    <button className="btn btn-primary shadow-2 mb-4" onClick={handlelogin}>Entrar</button>
                    <p className="mb-2 text-muted">Forgot password? <a href="auth-reset-password.html">Reset</a></p>
{/*                     <p className="mb-0 text-muted">Don’t have an account? <a href="auth-signup.html">Signup</a></p>
 */}                </div>
            </div>

    </div>    
    </div>
  )
}


 {/*  <h1>Login</h1>
      <input  type='text' className="inputBox" placeholder='User email' 
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      ></input>
      <input type='password' className="inputBox" placeholder='Password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}></input>
      <button onClick={handlelogin} className='appButton' type='button'>Login</button> */}
export default Login