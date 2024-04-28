import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import Slider from 'react-slick';

export default function CategorySlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1
      };

    function getCat(){
      return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    let {data} = useQuery('category' ,getCat)



  return (
    <div className='row my-4'>
      <Slider {...settings}>
        {data?.data?.data.map((ele)=><img src={ele.image} key={ele.image} height={150} className='w-100'></img>)}
      </Slider>
    </div>
  )
}
