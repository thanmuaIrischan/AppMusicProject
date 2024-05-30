// store.tsx
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './globalSlice';

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
