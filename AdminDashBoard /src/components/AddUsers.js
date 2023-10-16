import React, { useState } from 'react'




const AddProduct = () => {

const [name, setName]= useState('')
const[email, setEmail]= useState('')
const [lugar, setLugar]=useState('')
const [error,setError]= useState('');

const addProduct = async ()=>{

  if(!name || !email || !lugar){
    setError(true)
    return false;

  }

  const userId = JSON.parse(localStorage.getItem('user')).id;
  console.warn(userId); 

  let product = await fetch('http://localhost:3500/add-product',{

    method:'post',
    body:JSON.stringify({name,price, category,company, userId}),
    headers:{
      'Content-Type':'application/json'
    }
  });
  product = await product.json()
  console.log(product)

  
}



  return (
    <div className='product'>
      <h1>Add Product</h1>
      <input type='text' placeholder='Enter product' className='inputBox'
      required 
      value={name}
      onChange={(e)=>{setName(e.target.value)}}
      />
      {error && !name && <span className='invalid-input'>Enter Valid Name</span>}
          <input type='text' placeholder='Enter price' className='inputBox'
      value={price}
      onChange={(e)=>{setPrice(e.target.value)}}/>
      {error && !price && <span className='invalid-input'>Enter Valid Name</span>}

      <input type='text' placeholder='Enter Category' className='dropdown-input inputBox'
      value={category}
      onChange={(e)=>{setCategory(e.target.value)}}/>
      {error && !category && <span className='invalid-input'>Enter Valid Name</span>}

      <input type='text' placeholder='Enter company' className='inputBox'
      value={company}
      onChange={(e)=>{setCompany(e.target.value)}}/>
      {error && !company && <span className='invalid-input'>Enter Valid Name</span>}

      <button onClick={addProduct}   type='button' className='appButton'>Add Product</button>
      
    </div>
  )
}

export default AddProduct