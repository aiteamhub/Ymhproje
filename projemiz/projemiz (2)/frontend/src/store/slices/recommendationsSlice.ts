import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface HealthRecommendation {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  createdAt: string;
  validUntil: string;
  isActive: boolean;
}

interface RecommendationsState {
  recommendations: HealthRecommendation[];
  loading: boolean;
  error: string | null;
}

const initialState: RecommendationsState = {
  recommendations: [],
  loading: false,
  error: null,
};

export const fetchUserRecommendations = createAsyncThunk(
  'recommendations/fetchUserRecommendations',
  async (userId: number) => {
    const response = await axios.get(`/api/recommendations/user/${userId}`);
    return response.data;
  }
);

export const generateRecommendations = createAsyncThunk(
  'recommendations/generateRecommendations',
  async (userId: number) => {
    const response = await axios.post(`/api/recommendations/generate?userId=${userId}`);
    return response.data;
  }
);

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload;
      })
      .addCase(fetchUserRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recommendations';
      })
      .addCase(generateRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload;
      })
      .addCase(generateRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to generate recommendations';
      });
  },
});

export default recommendationsSlice.reducer; 