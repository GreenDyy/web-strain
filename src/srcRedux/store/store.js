import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
//all slice ruducer
import customerReducer from '../features/customerSlice'
import cartReducer from '../features/cartSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  customer: customerReducer,
  cart: cartReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer
})
let persistor = persistStore(store)
export { store, persistor }


