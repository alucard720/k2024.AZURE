
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'




const CollectData = ({}) => {
    //modal state//
    //register state//
    const [username, setUsername]= useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword]= useState('')
    const navigate = useNavigate();

    

    const handleRegister = async ()=>{
        try {
            const response= await fetch("http://localhost:5000/register",{
            method:'post',
            body:JSON.stringify({ username, email, password}),
            headers:{
               'Content-Type':'application/json'
            }
        });
        const result = await response.json()
        console.log(result);

        if(result){
            navigate('/login')
        }else{
            console.warn("enter corrct details")
        }
        
        } catch (error) {
         console.error('Login Failed', error)   
        }
    }
    
  return (

    
    <div className="auth-wrapper">
    {/*   <div className="auth-bg">
                <span className="r"></span>
                <span className="r s"></span>
                <span className="r s"></span>
                <span className="r"></span>
            </div>  */}
    <div className='auth-content'>            
            <div className="card">
                <div className="card-body text-center">
                    <div className="mb-4">
                        <i className="feather icon-unlock auth-icon">Dashboard Administrativo</i>
                    </div>
                    <h3 className="mb-4">Registrarse</h3>
                    <div className="input-group mb-3">
                        <input 
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        type="text" className="form-control" placeholder="Nombre"/>
                    </div>
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
                    <button className="btn btn-primary shadow-2 mb-4" onClick={handleRegister} >Registrarse</button>
             </div>
            </div>

    </div>    
    </div>
 )
}

export default CollectData;