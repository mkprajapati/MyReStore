import { Divider, Grid, Typography 
    ,TableContainer,Table,TableCell,TableRow,TableBody, TextField} from "@mui/material";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
//import { Product } from "../../app/models/product"
//import agent from '../../app/api/agent';
import LoadingComponent from "../../app/layout/LoadingCompanent";
import { LoadingButton } from "@mui/lab";
//import { useStoreContext } from "../../app/context/StoreContext";
import { addBasketItemAsync} from "../basket/basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeBasketItemAsync} from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";
export default function ProductDetails()
{ 
   // const {basket,setBasket,removeItem} = useStoreContext();

   const {basket,status} = useAppSelector(state => state.basket); //useStoreContext();
   const dispatch = useAppDispatch();
    const {id} = useParams<{id:string}>();
      const product = useAppSelector(state => productSelectors.selectById(state,id));
      const {status:productStatus} = useAppSelector(state => state.catalog);
      const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.productId === product?.id);
      useEffect(function(){
    if (item) setQuantity(item.quantity);
      if(!product){
          dispatch(fetchProductAsync(parseInt(id)))
      }
      },[id,item,dispatch,product]);


      function handleInputChange(event: any) {
        if (event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
        }
    }


    function handleUpdateCart() {
         if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId:product?.id!,quantity:updatedQuantity}))
        } else {
            const updatedQuantity = item.quantity - quantity;        
         dispatch(removeBasketItemAsync({productId:product?.id!,quantity:updatedQuantity}))
        }
    }

      if(productStatus.includes('pendingFetchProducts')) return <LoadingComponent message={'Loading product...'} />
      if(!product) return <h3>Product Nots Found</h3>

    return(
        <Grid container spacing={6}>
         <Grid item xs={6}>
           <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}}/>
         </Grid>
         <Grid item xs={6}>
         <Typography variant='h3'>{product.name}</Typography>
         <Divider sx={{mb:2}}></Divider>
         <Typography variant='h4' color='secondary'>{(product.price/100).toFixed(2)}</Typography>
         
         <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>    
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>  
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>  
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>  
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>  
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField 
                            variant='outlined'
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                          disabled={item?.quantity === quantity || !item && quantity===0}
                            loading={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{height: '55px'}}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
         </Grid>
        </Grid>
       
    )
}