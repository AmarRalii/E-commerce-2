import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct, getSingleProduct } from "../useProduct";
import Loading from "./Loading";
import { useCartCrud } from "../useCart";
import { addToCart } from './../useCart';
import  Slider  from 'react-slick';
import Helmet from 'react-helmet';
import { addToWish, useCrudWish } from "../useWishList";


export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplayspeed: 900
  };

  let {isError:iisErroe,error:Ierror,isLoading:iisLoading,mutate} = useCartCrud(addToCart)
  let { isError:WisError, error:Werror, isLoading:WisLoading, mutate:Wmutate } = useCrudWish(addToWish);
  let { id } = useParams(); 
  let [heart, setHeart] = useState(false)
  let { data, error, isError, isLoading } = useProduct("productdetails", () =>
    getSingleProduct(id)
  );

  console.log(data);
  if (WisLoading) {
    return <Loading></Loading>;
  }

  if (WisError) {
    return <h2 className="text-center text-danger">{Werror}</h2>;
  }
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return <h2 className="text-center">{error.message}</h2>;
  }
  if(iisLoading){
    return <Loading></Loading>
  }
  if(iisErroe){
    return <h2 className='text-center text-danger'>{Ierror}</h2>
  }

  return (
    <div className="container">
      <Helmet>
        <title>ProductDetails</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      <div className="row d-flex justify-content-center align-items-center py-5">
        <div className="col-md-3">
          <Slider {...settings}>
              {data?.images?.map((img)=><img src={img} key={img} alt=""></img>)}
          </Slider>
        
        </div>
        <div className="col-md-7">
          <div className="d-flex justify-content-between">
            <h3>{data.title}</h3>
            <i
          className="fa-solid fa-heart fa-2x cursor-pointer"
          style={heart ? { color: "red" } : { color: "" }}
          onClick={() => {setHeart(!heart); Wmutate(data._id);}}
        ></i>
          </div>
          
          <p>{data.description}</p>
          <div>
            <span className="text-main">{data.category.name}</span>
          </div>
          
          <br />
          <div className="box d-flex justify-content-between">
            <span>{data.price} EGP</span>
            <span>
              {data.ratingsAverage}{" "}
              <i className="fa-solid fa-star rating-color"></i>
            </span>
          </div>
          <button className="btn btn-brdr text-center my-2 w-100" onClick={()=>{mutate(data._id)}}>
            Add To Cart{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
