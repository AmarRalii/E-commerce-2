import React, { useState } from "react";
import {
  deleteCart,
  getCart,
  ubdateCart,
  useCart,
  useCartCrud,
  checkout
} from "../../useCart";
import Loading from "./../Loading";
import img from "../../assets/preview.png";
import Helmet from 'react-helmet'
export default function Cart() {

    let [details,setdetails]=useState('')
    let [phone,setphone]=useState('')
    let [city,setcity]=useState('')


  let { data, isLoading, isError } = useCart("cart", getCart);
  let {
    mutate,
    isLoading: load,
    isError: err,
    error: er,
  } = useCartCrud(deleteCart);
  let { mutate: mutateubdate ,isLoading:wLoading} = useCartCrud(ubdateCart);
  let {mutate:mutateonline,data:dataonline } = useCartCrud(checkout);

  function addAddr(e){
    e.preventDefault()
    let shippingAddress = {
      details,phone,city
    }
    mutateonline({id:data?.data?.data?._id,shippingAddress})
    
    if(dataonline?.data?.status === 'success')
    window.location.href = (dataonline?.data?.session?.url);
     
  }

  if (load || wLoading) {
    return <Loading></Loading>;
  }


  
  if (err) {
    return <h2 className="text-center">{er.message}</h2>;
  }
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return <div className="text-center my-4">
      <h4>Cart is empty</h4>
      <img src={img} height={400} alt="" />
    </div>
  }

  return (
    <div className="container my-5 ">
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      {data?.data?.numOfCartItems ? (
        <>
          {" "}
          <h3 className="text-main">
            Number Of Cart Items {data?.data?.numOfCartItems}
          </h3>
          <p className="">
            Total Cart Price{" "}
            <span className="fw-bolder mx-3">
              {data?.data?.data?.totalCartPrice}
            </span>{" "}
          </p>
          {data?.data?.data?.products.map((prod) => (
            <div className="row gy-2 bg-body-secondary py-3" key={prod.product._id}>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-2 gy-3">
                    <img
                      src={prod.product.imageCover}
                      className="w-100"
                      alt=""
                    />
                  </div>
                  <div className="col-md-10 d-flex align-self-center">
                    <div>
                      <p>{prod.product.title}</p>
                      <p className="text-main">{prod.price} EGP</p>
                      <p
                        className="cursor-pointer"
                        onClick={() => {
                          mutate(prod.product._id);
                        }}
                      >
                        <i className="fa-solid fa-trash text-main cursor-pointer"></i>{" "}
                        Remove
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex align-self-center justify-content-end">
                <div>
                  <button
                    className="btn  btn-brdr p-1"
                    onClick={() =>
                      mutateubdate({
                        id: prod.product._id,
                        count: prod.count + 1,
                      })
                    }
                  >
                    +
                  </button>
                  <span className="px-2">{prod.count}</span>
                  <button
                    className="btn btn-danger p-1"
                    onClick={() =>prod.count === 1?mutate(prod.product._id): mutateubdate({
                      id: prod.product._id,
                      count: (prod.count) > 0 ?prod.count- 1:prod.count ,
                    })}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            className="btn btn-success my-3"
            data-bs-toggle="modal"
            data-bs-target="#modalId"
          >
            Checkout
          </button>
          <div
            className="modal fade"
            id="modalId"
            data-bs-backdrop="static"
            data-bs-keyboard="true"
            role="dialog"
            aria-labelledby="modalTitleId"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-scrollable modal-dialog-centered "
              role="document"
            >
              <div className="modal-content ">
                <div className="modal-header">
                 <p>Input Your Details</p>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body ">
                  <form action="" className="">
                    <input type="text" className="form-control my-2 " placeholder="Name" onChange={(e)=>setdetails(e.target.value)} />
                    <input type="tel" className="form-control my-2" placeholder="phone" onChange={(e)=>setphone(e.target.value)}/>
                    <input type="text" className="form-control my-2" placeholder="city" onChange={(e)=>setcity(e.target.value)} />
                    <button className="btn btn-brdr my-3" type="submit" onClick={addAddr}>add address </button>
                  </form>
                </div>
              
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <img src={img} className="w-75 text-center" alt="" />
        </div>
      )}
    </div>
  );
}
