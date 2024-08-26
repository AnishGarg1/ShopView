import { configureStore } from '@reduxjs/toolkit'
import shopifySlice from './shopifySlice';

export default configureStore({
  reducer: {
    shopify: shopifySlice
  }
});