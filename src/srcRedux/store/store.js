import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

// all slice reducers
import customerReducer from '../features/customerSlice';
import cartReducer from '../features/cartSlice';
import employeeReducer from '../features/employeeSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  customer: customerReducer,
  cart: cartReducer,
  employee: employeeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

let persistor = persistStore(store);

export { store, persistor };
