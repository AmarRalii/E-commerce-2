
import  axios  from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {toast} from 'react-hot-toast'
let token = localStorage.getItem('userToken')


export function addToCart(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId},{
        headers : {
            token
        }
    })
}
console.log(token);
export function getCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers : {
            token
        }
    })
}
export function getOrder(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17`,{
        headers : {
            token
        }
    })
}


export function deleteCart(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers : {
            token
        }
    })
}

export function ubdateCart({id,count}){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{
        headers : {
            token
        }
    })
}


export function checkout({id,shippingAddress}){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,{shippingAddress},{
        headers:{
            "Content-Type":'application/json',
            token
        }
    })
}



export function useCartCrud(fn){
    const queryClient = useQueryClient()
    return useMutation(fn,{
        onSuccess:(data)=>{
            toast.success(data?.data?.message);
            queryClient.invalidateQueries('cart')
        },
        onError:(data)=>{
            toast.error(data?.message)
        }
    })
}

export function useCart(key,fn){
    return useQuery(key,fn)
}