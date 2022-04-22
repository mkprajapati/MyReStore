import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import { Box } from "@mui/system";
import { BasketItem } from "../../app/models/basket";
//import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
//import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";

interface Props {
    items: BasketItem[];
    handleAddItem:(productId:number)=> void;
    handleRemoveItem:(productId:number,quantity:number)=> void;
   // isBasket?: boolean;
}

export default function BasketTable({ items,handleAddItem,handleRemoveItem}: Props) {
   // const { status } = useAppSelector(state => state.basket);
   // const dispatch = useAppDispatch();
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        
                  <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => (
                        <TableRow
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Box display='flex' alignItems='center'>
                                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                            <TableCell align="center">
                            <LoadingButton onClick={()=>handleRemoveItem(item.productId,1)} color='error'>
                                   <Remove/>
                               </LoadingButton> 
                                {item.quantity}
                                <LoadingButton onClick={()=>handleAddItem(item.productId)} color='secondary'>
                                   <Add/>
                               </LoadingButton>
                            </TableCell>
                            <TableCell align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                            <TableCell align='right'>
                               <LoadingButton onClick={()=>handleRemoveItem(item.productId,item.quantity)} color='error'>
                                   <Delete/>
                               </LoadingButton>
                                </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}