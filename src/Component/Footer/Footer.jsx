import React from "react";

export default function Footer() {
  return (
    <footer className="py-2 my-5 bg-main-light ">
      <div className="container my-5">
        <h4>Get The Fresh CartApp</h4>
        <p className="lead">
          we will send you a link, open it on your phone to download the app
        </p>
        <form action="">
          <div className="row">
            <div className="col-md-10">
              <input type="text" className="form-control" placeholder="Email" />
            </div>
            <div className="col-md-2">
              <button className="btn text-white text-main bg-main">
                Share App Link
              </button>
            </div>
          </div>
        </form>
      </div>
    </footer>
  );
}
