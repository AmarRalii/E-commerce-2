import React from 'react'
import Loading from './../Loading';
import { getProductelectronics, useProduct } from '../../useProduct';
import Product from './../Product';
import Helmet from 'react-helmet';
export default function Products() {

  let {data,error,isError,isLoading} = useProduct('product',getProductelectronics)


  if(isLoading){
    return <Loading></Loading>
  }
  if(isError){
   return <h2 className='container'>{error.message}</h2>
  }


  return (
    <div className='container my-5'>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      <div className="row gy-4">
        {data?.map(prod=><Product prod={prod} key={prod._id}></Product>)}
      </div>
    </div>
  )
}


