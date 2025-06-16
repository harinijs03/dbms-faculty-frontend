import React from 'react'
import './HomePage.css'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='heyuser-div'>Welcome back!!</div>
      <button className='manage-pool-button' 
        onClick={()=>{
          navigate('/questionpool');
        }}
      >
        Manage Question Pool
      </button>
    </div>
  )
}

export default HomePage
