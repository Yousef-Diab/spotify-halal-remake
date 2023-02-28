import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux/es/exports';
import { TypedUseSelectorHook } from 'react-redux/es/types';

import reducers from './reducers';


const store = configureStore({
    reducer:reducers
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;