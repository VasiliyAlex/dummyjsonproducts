import { useQuery } from '@tanstack/react-query'
import {FC} from 'react'
import { getProductsQuery} from '../services/ProductsServices'
import { useParams } from 'react-router-dom'
import s from './Product.module.scss'
// import { Swiper, SwiperSlide } from 'swiper/react';
import MySwiper from '../components/Slider/Slider'




const Product: FC = () => {
  
  const { data, isSuccess } = getProductsQuery()
  
  let { id } = useParams()
  let product = data?.find(data => data.id == id)
  
  
  
  
  return (
    product &&
      <div className={s.product}>
        <div className={s.item}>
          <div className={s.item_img}>
            {/* <img src={product.images[0]} alt={product.title} /> */}
            <MySwiper 
            images = {product.images}
            />
          </div>
          <div className={s.item_info}>
            <p className={s.item_info_title}>{product.title}</p>
            <p className={s.item_info_p}><span>Brand:</span>{product.brand}</p>
            <p className={s.item_info_p}><span>Category:</span>{product.category}</p>
            <p className={s.item_info_p}><span>Rating:</span>{product.rating}</p>
            <p className={s.item_info_description}><span>Description: </span>{product.description}</p>
            <p className={s.item_info_p}><span>Stock:</span>{product.stock}</p>
            <p className={s.item_info_p}><span>Price:</span>{product.price}$</p>
            <p className={s.item_info_p}><span>Discount Price: </span>{Math.floor(product.price*(100-product.discountPercentage)/100)}$</p>
          </div>
        </div>
      </div>
    
  )
 
}

export default Product