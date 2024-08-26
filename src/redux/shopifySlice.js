import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    customers: [],
    orders: [],
    products: []
};

export const shopifySlice = createSlice({
  name: 'shopify',
  initialState,
  reducers: {
    setCustomers: (state, action) => {
        state.customers = action.payload;
      },
      setOrders: (state, action) => {
        state.orders = action.payload;
      },
      setProducts: (state, action) => {
        state.products = action.payload;
      }
  }
})

// Action creators are generated for each case reducer function
export const { setCustomers, setOrders, setProducts } = shopifySlice.actions

export default shopifySlice.reducer