import React, { useState, useEffect } from "react";
import "./product.css";
import cookieCutter from 'cookie-cutter'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  upgrade: false,
});

const ProductPage = () => {
  const [bids, setBids] = useState([]);
  const {id} = useParams()
  const [details,setDetails] = useState({})
  const navigate = useNavigate()

  const getDetails = async ()=>{
    const res = await axios.get(`http://localhost:5000/products/${id}`)
    setDetails(res.data)
  }

  const getBids = async ()=>{
    const res = await axios.get(`http://localhost:5000/bids/${id}`)
    console.log(res);
    setBids(res.data)
  }

  useEffect(() => {
    getDetails()
    getBids()
    socket.on("bid", (bids) => {
      setBids(bids);
    });
  }, []);

  const placeBid = (e) => {
    e.preventDefault();
    const user = cookieCutter.get('user')
    if(!user){
        navigate('/login')
    }
    socket.emit("bid", {
      user_id: user,
      bid_price: e.target[0].value,
      product_id: id,
    });
  };

  return (
    <div className="product-page">
      <div className="product-container">
        <img
          src={details?.image}
          alt="product"
        />
        <div className="info">
          <div className="heading">{details?.name}</div>
          <div className="description">
           {details?.description}
          </div>
          <div className="bid-start">Bid Starts: ${details?.price}</div>
        </div>
      </div>

      <div className="bid-container">
        <h2 className="bids-heading">All Bids</h2>
        <form onSubmit={placeBid}>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter Your Bid"
          />
          <input type="submit" value="Submit" />

          {bids.map((bid) => {
            return (
              <div className="bid-item">
                <div className="username">{bid.user_id}</div>
                <div className="bid-price">${bid.bid_price}</div>
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
};

export default ProductPage;
