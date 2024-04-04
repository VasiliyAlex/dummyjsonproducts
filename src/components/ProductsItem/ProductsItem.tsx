import { FC } from 'react'
import { IProductsItem } from '../../types/types'
import s from './ProductsItem.module.scss'

export const ProductsItem : FC<IProductsItem>= ({product}) => {
  return (
    <div className={s.item}>
      <div className={s.item_img}>
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className={s.item_info}>
       
          <h2 className={s.item_info_title}>{product.title}</h2>
          <p className={s.item_info_description}><span>{product.description}</span></p>
          <p className={s.item_info_p}><span>Stock:</span>{product.stock}</p>
          <span className={s.item_info_price}>Price:{product.price}$</span>
          <p className={s.item_info_p}><span>Discount Price: </span>{Math.floor(product.price*(100-product.discountPercentage)/100)}$</p>
        
      </div>
    </div>
  )
}

export default ProductsItem