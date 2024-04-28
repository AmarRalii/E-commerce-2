import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addToCart, useCartCrud } from "../useCart";
import Loading from "./Loading";
import { useCrudWish } from "../useWishList";
import { addToWish } from "./../useWishList";
export default function Product({ prod }) {
  let [heart, setHeart] = useState(false);
  let { isError, error, isLoading, mutate } = useCartCrud(addToCart);
  let {
    isError: WisError,
    error: Werror,
    isLoading: WisLoading,
    mutate: Wmutate,
  } = useCrudWish(addToWish);

  if (WisLoading) {
    return <Loading></Loading>;
  }

  if (WisError) {
    return (
      <h2 className="text-center text-danger">
        {Werror.message || JSON.stringify(Werror)}
      </h2>
    );
  }
  if (isError) {
    return (
      <h2 className="text-center text-danger">
        {error.message || JSON.stringify(error)}
      </h2>
    );
  }

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="col-md-2">
      <div className="product cursor-pointer p-2">
        <i
          className="fa-solid fa-heart fa-1x"
          style={{ color: heart ? "red" : "" }}
          onClick={() => {
            Wmutate(prod._id);
            setHeart(!heart);
          }}
        ></i>

        <Link to={`productDetails/${prod._id}`}>
          <img src={prod.imageCover} alt={prod.title} className="w-100" />
          <h2 className="h5 text-main">{prod.category.name}</h2>
          <p>{prod.title}</p>
          <div className="box d-flex justify-content-between">
            <span>{prod.price} EGP</span>
            <span>
              {prod.ratingsAverage}{" "}
              <i className="fa-solid fa-star rating-color"></i>
            </span>
          </div>
        </Link>
        <button
          className="btn btn-brdr text-center my-2 w-100"
          onClick={() => {
            mutate(prod._id);
          }}
        >
          Add To Cart{" "}
        </button>
      </div>
    </div>
  );
}
