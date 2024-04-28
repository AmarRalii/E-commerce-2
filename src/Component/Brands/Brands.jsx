import React from "react";
import Helmet from "react-helmet";
import { getBrand, useProduct } from "../../useProduct";
import Loading from "./../Loading";

export default function Brands() {
  let { data, isError, isLoading, error } = useProduct("Brands", getBrand);

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return (
      <h2 className="text-center text-main fw-bold my-5">{error.message}</h2>
    );
  }
  console.log(data);
  return (
    <div className="container">
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <h2 className="text-main text-center fw-bold my-5">All Brands </h2>
      <div className="row gy-5">
        {data.map((brand) => (
          <div className="col-md-4 category text-center">
            <img src={brand.image} className="w-75" height={250} alt="" />
            <h3 className="text-main text-center fw-bold my-4">{brand.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
