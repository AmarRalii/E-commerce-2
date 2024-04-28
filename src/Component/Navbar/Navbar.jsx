import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { UserContext } from "../Conext/UserContext";
import { getCart, useCart } from "./../../useCart";

export default function Navbar() {
  let { userToken, setUserToken, setIsOpen } = useContext(UserContext);
  let { data } = useCart("cart", getCart);
  function LogOut() {
    setUserToken(null);
    localStorage.removeItem("userToken");
  }
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light ">
        <div className="container">
          <a className="navbar-brand " href=" ">
            <img src={logo} alt="Fresh Cart Logo" />
          </a>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav mx-auto mt-2 mt-lg-0 ">
              {userToken !== null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link " to={""}>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to={"wishList"}>
                      Wish List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to={"products"}>
                      Product
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to={"Categories"}>
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to={"brands"}>
                      Brands
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 ">
              <li
                data-bs-toggle={!userToken ? "modal" : ""}
                data-bs-target="#exampleModal"
                onClick={() => {
                  setIsOpen(true);
                }}
                className="mx-3"
              >
                <Link to={"cart"}>
                  <i class="fa-solid fa-cart-shopping pt-3 pe-4 cursor-pointer  cart">
                    <span className="num  ">{data?.data?.numOfCartItems}</span>
                  </i>
                </Link>
              </li>
              {userToken !== null ? (
                <>
                  <li>
                    <Link>
                      <i className="fa-brands fa-facebook text-dark mt-3 pe-3"></i>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <i className="fa-brands fa-twitter text-dark mt-3 pe-3"></i>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <i className="fa-brands fa-linkedin text-dark mt-3 pe-3"></i>
                    </Link>
                  </li>

                  <li className="nav-item" onClick={LogOut}>
                    <Link className="nav-link " to={"login"}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link " to={"login"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to={"Register"}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <p>Please Login firest ...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
