import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface HealthMetrics {
  id: number;
  userId: number;
  weight: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  heartRate: number;
  steps: number;
  recordedAt: string;
  notes: string;
}

interface HealthMetricsState {
  metrics: HealthMetrics[];
  loading: boolean;
  error: string | null;
}

const initialState: HealthMetricsState = {
  metrics: [],
  loading: false,
  error: null,
};

export const fetchUserMetrics = createAsyncThunk(
  'healthMetrics/fetchUserMetrics',
  async (userId: number) => {
    const response = await axios.get(`/api/health-metrics/user/${userId}`);
    return response.data;
  }
);

export const recordMetrics = createAsyncThunk(
  'healthMetrics/recordMetrics',
  async (metrics: Omit<HealthMetrics, 'id'>) => {
    const response = await axios.post('/api/health-metrics', metrics);
    return response.data;
  }
);

const healthMetricsSlice = createSlice({
  name: 'healthMetrics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload;
      })
      .addCase(fetchUserMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch metrics';
      })
      .addCase(recordMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recordMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics.unshift(action.payload);
      })
      .addCase(recordMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to record metrics';
      });
  },
});

export default healthMetricsSlice.reducer; 