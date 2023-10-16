
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword]= useState('')
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }

    },[])

    const handlelogin = async ()=>{
        let result= await fetch("http://localhost:5000/login",{
            method:'post',
            body:JSON.stringify({ email, password}),
            headers:{
               'Content-Type':'application/json'
            }
        });
        result= await result.json();
        console.log(result);

        if(result.auth){
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/')

        }else{
            alert("Please enter correct details")
        }
    }
    
  return (
    <div className="auth-wrapper">
    <div className='auth-content'>

  {/*   <div className="auth-bg">
                <span class="r"></span>
                <span class="r s"></span>
                <span class="r s"></span>
                <span class="r"></span>
            </div> */}
            
            <div className="card">
                <div class="card-body text-center">
                    <div className="mb-4">
                        <i className="feather icon-unlock auth-icon"></i>
                    </div>
                    <h3 className="mb-4">Entrar</h3>
                    <div class="input-group mb-3">
                        <input 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        type="text" class="form-control" placeholder="Correo"/>
                    </div>
                    <div className="input-group mb-4">
                        <input type="password" className="form-control" placeholder="Contrasena"/>
                    </div>
                    <div className="form-group text-left">
                        <div class="checkbox checkbox-fill d-inline">
                            <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" checked=""/>
                            <label for="checkbox-fill-a1" class="cr"> Salvar Detalles</label>
                        </div>
                    </div>
                    <button class="btn btn-primary shadow-2 mb-4">Entrar</button>
                    <p class="mb-2 text-muted">Forgot password? <a href="auth-reset-password.html">Reset</a></p>
{/*                     <p class="mb-0 text-muted">Don’t have an account? <a href="auth-signup.html">Signup</a></p>
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