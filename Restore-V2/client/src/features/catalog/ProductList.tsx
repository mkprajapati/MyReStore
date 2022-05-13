import {Grid} from '@mui/material';
import React from "react"
import { Product } from "../../app/models/product"
import { useAppSelector } from '../../app/store/configureStore';
import ProductCard from "./ProductCard"
import ProductCardSkeleton from './ProductCardSkeleton';

interface Props{
    products:Product[],
}

export default function ProductList({products}:Props){
    const {productsLoaded} = useAppSelector(state => state.catalog)
    return(
        <React.Fragment>
        <Grid container spacing={4}>
        {products.map((p)=>{
           return <Grid item xs={4} key={p.id}>
               {!productsLoaded ? (<ProductCardSkeleton/>):(<ProductCard  product={p}/>)}
             
             </Grid>
        })
       }
       </Grid>
     
       </React.Fragment>
    )
}


