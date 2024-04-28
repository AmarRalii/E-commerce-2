import React from 'react'
import { useCart } from '../useCart'
import { getOrder } from './../useCart';
import Helmet from 'react-helmet';

export default function Orders() {
    let{data} = useCart('order',getOrder)
    console.log(data);
  return (
    <div className='container'>
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
        <h2 className='text-main fw-bold text-center'>Happy Shopping </h2>
    </div>
  )
}
