import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from './reducers/UserReducer';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['user'] 
};

const reducer = combineReducers({
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: {
        persistedReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false, // Desativar a verificação de serialização para o Redux Persist
      }),
});
export let persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>