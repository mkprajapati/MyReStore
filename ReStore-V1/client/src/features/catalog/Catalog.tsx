//import { Button } from '@mui/material';
import React, { useEffect } from "react"
//import { Product } from "../../app/models/product"
import ProductList from './ProductList';
//import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingCompanent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchProductsAsync, productSelectors } from './catalogSlice';


export default function Catalog(){
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded,status} = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch();
  useEffect(function(){
  if(!productsLoaded)
  {
      dispatch(fetchProductsAsync())
  }

},[dispatch,productsLoaded])

//   function addProduct()
//   {
//     setProducts(prevState => 
//         [...prevState,
//             {id:prevState.length+1,
//                 name:'p'+(prevState.length+1)
//                 ,price:400.56
//             }]
//             )
//   }
  if(status.includes('pending')) return <LoadingComponent message={'Loading products...'} />
    return(
        <React.Fragment>
       <ProductList products={products} ></ProductList>
       {/* <Button variant='contained' onClick={addProduct}>Add Product</Button> */}
       </React.Fragment>
    )
}