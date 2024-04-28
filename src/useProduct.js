
import { useQuery } from 'react-query';
import  axios  from 'axios';


export function getProduct(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}

export function getCategory(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}
export function getBrand(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
}

export function getSubCategory(id){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
  
}

export  function SingelBrand(id) {
    
  return  axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
}



export function useProduct(key,fn){
    return useQuery(key,fn ,{
        select:(data)=>data.data.data
    })
}

export function getSingleProduct(id){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}