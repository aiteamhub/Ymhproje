import { configureStore } from '@reduxjs/toolkit';
import healthMetricsReducer from './slices/healthMetricsSlice';
import recommendationsReducer from './slices/recommendationsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    healthMetrics: healthMetricsReducer,
    recommendations: recommendationsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 