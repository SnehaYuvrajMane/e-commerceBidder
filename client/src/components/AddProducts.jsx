import React, { useEffect,useState } from 'react'
import './Add.css'
import axios from 'axios'


const AddProducts = () => {
    const initialState = {
        name: '',
        price: '',
        description: '',
        image: ''
    }
    const [products,setProducts] = useState(initialState)

    const handleChange = (e)=>{
        setProducts({...products,[e.target.name]:e.target.value})
    }

    const handleSubmit =async (e)=>{
        e.preventDefault()
        const res = await axios.post('http://localhost:5000/products',products)
       alert(res.statusText)
    }

  return (
    <div className='add-products'>
        <h1>Add Products</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' onChange={handleChange}/>
            <label htmlFor='price'>Price</label>
            <input type='text' name='price' onChange={handleChange}/>
            <label htmlFor='description'>Description</label>
            <input type='text' name='description'onChange={handleChange} />
            <label htmlFor='image'>Image</label>
            <input type='text' name='image' onChange={handleChange} />
            <button type='submit'>Submit</button>
        </form>
      
    </div>
  )
}

export default AddProducts
