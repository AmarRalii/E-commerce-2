import React, { Suspense } from "react";
import {RouterProvider,  createHashRouter} from 'react-router-dom';
import Layout from "./Component/Layout";
import Home from './Component/Home/Home';
import Cart from './Component/Cart/Cart';
import Login from './Component/Login/Login';
import Categories from './Component/Categories/Categories';
import Brands from './Component/Brands/Brands';
import NotFound from './Component/NotFound';
import Register from './Component/Register/Register';
import ForgetPassword from "./Component/ForgetPassword/ForgetPassword";
import ResetPassword from './Component/ResetPassword/ResetPassword';
import UserContextProvider from "./Component/Conext/UserContext";
import WishList from './Component/WishList/WishList';
import ProtectedRoute from "./Component/ProtectedRoute";
import ProductDetails from './Component/ProductDetails';
import SubCategoris from './Component/Categories/SubCategoris';
import { lazy } from 'react';

import Loading from './Component/Loading';
const Orders = lazy(() => import('./Component/Orders'));
const Products = lazy(() => import('./Component/Products/Products'));






let routers = createHashRouter([
  {path:'',element:<Layout/>, children:[
    {index:true, element:<ProtectedRoute><Home></Home></ProtectedRoute>},
    {path:'cart', element:<ProtectedRoute><Cart></Cart></ProtectedRoute>},
    {path:'allorders', element:<ProtectedRoute><Suspense > <Orders fallback={<Loading></Loading>}></Orders></Suspense></ProtectedRoute>},
    {path:'wishList', element:<ProtectedRoute><WishList></WishList></ProtectedRoute>},
    {path:'products', element:<ProtectedRoute><Suspense><Products fallback={<Loading></Loading>}></Products></Suspense> </ProtectedRoute>},
    {path:'productDetails/:id', element:<ProtectedRoute><ProductDetails></ProductDetails></ProtectedRoute>},
    {path:'Categories/subCategoris/:id', element:<ProtectedRoute><SubCategoris></SubCategoris></ProtectedRoute>},
    {path:'products/productDetails/:id', element:<ProtectedRoute><ProductDetails></ProductDetails></ProtectedRoute>},
    {path:'login', element:<Login/>},
    {path:'categories', element:<ProtectedRoute><Categories></Categories></ProtectedRoute>},
    {path:'brands', element:<ProtectedRoute><Brands></Brands></ProtectedRoute>},
    {path:'Register', element:<Register/>},
    { path: 'login/forgetPassword', element:  <ForgetPassword></ForgetPassword>},
    { path: 'resetPassword', element:  <ResetPassword></ResetPassword>},
    {path:'*', element:<NotFound/>},
  ]}
]) 

export default function App() {
  return <UserContextProvider>
    <RouterProvider router={routers}></RouterProvider>
  </UserContextProvider>
}