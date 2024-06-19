import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";


let token = localStorage.getItem('userToken')

export function addToWish(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, {
        headers: {
            token
        }
    })
}


export function deleteWish(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
            token
        }
    })
}
//ecommerce.routemisr.co

export function getWish() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
            token
        }
    })
}


export function useGetWish(key, fn) {

    return useQuery(key, fn)
}


export function useCrudWish(fn) {
    const queryClient = useQueryClient()
    return useMutation(fn, {
        onSuccess: (data) => {
            toast.success(data?.data?.message);
            queryClient.invalidateQueries('getWish')
        },
        onError: (data) => { toast.error(data?.message) }
    })
}

