import {Grid} from '@mui/material';
import React from "react"
import { Product } from "../../app/models/product"
import ProductCard from "./ProductCard"

interface Props{
    products:Product[],
}

export default function ProductList({products}:Props){
    return(
        <React.Fragment>
        <Grid container spacing={4}>
        {products.map((p)=>{
           return <Grid item xs={3} key={p.id}>
             <ProductCard  product={p}/>
             </Grid>
        })
       }
       </Grid>
     
       </React.Fragment>
    )
}