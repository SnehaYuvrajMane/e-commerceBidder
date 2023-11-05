import React,{useState,useEffect} from 'react'
import './home.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [products,setProducts] = useState([])
    const navigate = useNavigate()

    const getProducts = async ()=>{
        const res = await axios.get('http://localhost:5000/products');
        console.log(res.data);
        setProducts(res.data)
        return  res.data
    }

    useEffect(()=>{
            const data = getProducts();
            
    },[])
  return (
    <div className='home'>
        <h1 className="heding">Popular Products</h1>

        <div className="products-list">
            {
                products && products.map((product=>{
                    return <div className="product" key={product._id}onClick={()=>{
                        navigate(`/product/${product._id}`)
                    }}>
                    <img src={product.image} alt="acer" className='product-image' />
                    <div className="heading">{product.name}</div>
                    <div className="start-price">
                        Bid Starts: <span>${product.price}</span>
                    </div>
                </div>
                }))
            }
            
        </div>
      
    </div>
  )
}

export default Home

