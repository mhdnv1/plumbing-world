import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import '../../style.scss'
SwiperCore.use([EffectCoverflow, Pagination]);

const Singlepage = () => {
    const { id } = useParams();
    const [cards, setUser] = useState([{}])
    const getApi = () => {
        axios.get(`http://localhost:5000/product/${id}`)
            .then(({ data })=>
            {
                if(data.length>0){
                   setUser(data[0]) 
                }  
            } )
    }
    useEffect(() => {
        getApi()

    }, []);

  
    return (
       <Container>
           <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        className="mySwiper"
      >
             {cards.img && cards.img.map((item) => <SwiperSlide className="d-flex justify-content-center"><img src={item.url} alt="img" className="swiper_img" /></SwiperSlide> )}
      </Swiper>
       </Container>
    )
}
export default Singlepage;
