import React, { useEffect } from "react";
import { deleteWish, getWish, useCrudWish, useGetWish } from "../../useWishList";
import { addToCart, useCartCrud } from './../../useCart';
import Loading from './../Loading';
import { Helmet } from 'react-helmet';





export default function WishList() {
  let { data, isError, isLoading, error, refetch } = useGetWish("getWish", getWish);
  let { mutate,  isLoading: deleteLoading } = useCrudWish(deleteWish);
  let {
    mutate: cmutate,
    isError: cisError,
    error: cerror,
    isLoading: cisLoading,
  } = useCartCrud(addToCart);

  const handleRemove = async (id) => {
    await mutate(id) 
    refetch(); 
  };

  useEffect(() => {
    getWish(); 
  }, []);


  if(isLoading){
    return <Loading></Loading>
  }
  if(cisLoading){
    return <Loading></Loading>
  }
  if(deleteLoading){
    return <Loading></Loading>
  }

  if (isError) return <h2 className="text-center fw-bold">{error.message}</h2>;

  if (cisError) return <h2 className="text-center fw-bold">{cerror.message}</h2>;
  

  console.log(data?.data?.count);
  return (
    <div>
    <div className="container wconatiner d-flex justify-content-center align-items-center ">
    <Helmet>
        <title>WishList</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
    {data?.data?.count ? <>
     <div className="row d-flex flex-column gy-5 wish my-5 bg-body-secondary ">
        {data.data.data.map((ele) => (
          <div className="row " key={ele.id}>
            <div className="col-md-3">
              <img src={ele.imageCover} className="w-50 my-3 " alt="" />
            </div>
            <div className="col-md-4 d-flex flex-column  justify-content-center ">
              <h4>{ele.title}</h4>
              <p className="fw-bold text-main">{ele.price} EGP</p>
              <p
                className="cursor-pointer text-danger"
                onClick={() => handleRemove(ele.id)} 
              >
                Remove <i className="fa-solid fa-trash  "></i>
              </p>
            </div>
            <div className="col-md-5  d-flex justify-content-end align-items-center">
              <button
                className="btn my-3 btn-brdr "
                onClick={() => {
                  cmutate(ele.id);
                  mutate(ele.id);
                  handleRemove(ele.id)
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>:<h2 className="text-main my-5">Your Wish List is empty</h2> }
   
     
    
    </div>
    
    </div>
  );
}
