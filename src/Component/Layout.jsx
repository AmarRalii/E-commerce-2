import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from './Conext/UserContext';

export default function () {
  let{setUserToken} = useContext(UserContext);

  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      setUserToken(localStorage.getItem('userToken'))
    }
  },[setUserToken])
  return <div className='parent'>
  <Navbar/>
  <div >
    <Outlet></Outlet>
  </div>
  <Footer/>
  </div>
}
