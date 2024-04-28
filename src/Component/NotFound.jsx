import React from "react";
import img from "./../assets/error.svg";
import Helmet from 'react-helmet';

export default function NotFound() {
  return (
    <div className="text-center">
      <Helmet>
        <title>NotFound</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      <img src={img} alt="404 Error" className="w-50" />
    </div>
  );
}
