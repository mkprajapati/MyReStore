//import { Button } from '@mui/material';
import React, { useEffect } from "react"
//import { Product } from "../../app/models/product"
import ProductList from './ProductList';
//import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingCompanent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from './catalogSlice';
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckBoxButtons";
import AppPagination from "../../app/components/AppPagination";

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to low' },
  { value: 'price', label: 'Price - Low to high' },
]

export default function Catalog(){
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded,status,filtersLoaded,productParams,brands,types,metaData} = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch();
  useEffect(function(){
  if(!productsLoaded)
  {
      dispatch(fetchProductsAsync())
  }
},[dispatch,productsLoaded])

useEffect(function(){
   if(!filtersLoaded)
  {
      dispatch(fetchFilters())
  }
},[dispatch,filtersLoaded])


  if(!filtersLoaded) return <LoadingComponent message={'Loading products...'} />
    return(
      <Grid container columnSpacing={4}>
      <Grid item xs={3}>
          <Paper sx={{ mb: 2 }}>
              <ProductSearch />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
              <RadioButtonGroup
                  selectedValue={productParams.orderBy}
                  options={sortOptions}
                  onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
              />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
              <CheckboxButtons
                  items={brands}
                  checked={productParams.brands}
                  onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
              />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
              <CheckboxButtons
                  items={types}
                  checked={productParams.types}
                  onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
              />
          </Paper>
      </Grid>
      <Grid item xs={9}>
          <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} sx={{mb: 2}}>
          {metaData &&
          <AppPagination 
              metaData={metaData}
              onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
          />}
      </Grid>
  </Grid>
    )
}