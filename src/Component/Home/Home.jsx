import React from 'react';
import Loading from './../Loading';
import { getProduct, useProduct } from '../../useProduct';
import Product from './../Product';
import MainSlider from './../../MainSlider';
import CategorySlider from './../../CategorySlider';
import Helmet from 'react-helmet'

export default function Home() {
  let token = localStorage.getItem('userToken')
  const { data, error, isError, isLoading } = useProduct('home', getProduct); 

  if (isLoading) { 
    return <Loading />;
  }

  if (isError) { 
    return <div className='container'> 
      <h2>{error.message}</h2>
    </div>;
  }

  console.log(token);

  return (
    <div className='container'>
       <Helmet>
        <title>Home</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      <MainSlider />
      <CategorySlider/>
      <div className="row mt-5">
        {data?.map((prod) => ( 
          <Product prod={prod} key={prod._id} /> 
        ))}
      </div>
    </div>
  );
}
