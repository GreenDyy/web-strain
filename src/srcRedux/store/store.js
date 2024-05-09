import { configureStore } from '@reduxjs/toolkit'

import customerReducer from '../features/customerSlice'

const rootReducer = {

  customer: customerReducer,
}

export default configureStore({
  reducer: rootReducer,
})