import React,{useState} from 'react'
import ShopData from './shop_data'
import CollectionPreview from '../../components/preview-collection-component/preview-collection-component'
const ShopPage = () => {
    const [shop_data] = useState([ShopData])
    const [ collections ] = shop_data
    return(
        
        <div className='shop-page'>
            {
                collections.map(({id,...otherCollectionProps})=>{return <CollectionPreview key={id} {...otherCollectionProps}/>

                })
            }
        </div>
    )   
}
export default ShopPage