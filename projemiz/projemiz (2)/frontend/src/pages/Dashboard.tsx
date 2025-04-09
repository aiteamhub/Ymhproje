import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import { RootState } from '../store';
import { fetchUserMetrics } from '../store/slices/healthMetricsSlice';
import { fetchUserRecommendations } from '../store/slices/recommendationsSlice';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { metrics, loading: metricsLoading } = useSelector(
    (state: RootState) => state.healthMetrics
  );
  const { recommendations, loading: recommendationsLoading } = useSelector(
    (state: RootState) => state.recommendations
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserMetrics(user.id));
      dispatch(fetchUserRecommendations(user.id));
    }
  }, [dispatch, user?.id]);

  const weightData = {
    labels: metrics.slice(0, 7).map((m) => new Date(m.recordedAt).toLocaleDateString()).reverse(),
    datasets: [
      {
        label: 'Weight (kg)',
        data: metrics.slice(0, 7).map((m) => m.weight).reverse(),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const stepsData = {
    labels: metrics.slice(0, 7).map((m) => new Date(m.recordedAt).toLocaleDateString()).reverse(),
    datasets: [
      {
        label: 'Steps',
        data: metrics.slice(0, 7).map((m) => m.steps).reverse(),
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
      },
    ],
  };

  if (metricsLoading || recommendationsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.username}!
      </Typography>

      <Grid container spacing={3}>
        {/* Health Metrics Summary */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Latest Health Metrics
              </Typography>
              {metrics.length > 0 ? (
                <>
                  <Typography>Weight: {metrics[0].weight} kg</Typography>
                  <Typography>
                    Blood Pressure: {metrics[0].bloodPressureSystolic}/{metrics[0].bloodPressureDiastolic} mmHg
                  </Typography>
                  <Typography>Heart Rate: {metrics[0].heartRate} bpm</Typography>
                  <Typography>Steps: {metrics[0].steps}</Typography>
                </>
              ) : (
                <Typography>No health metrics recorded yet.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Latest Recommendations */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Latest Recommendations
              </Typography>
              {recommendations.length > 0 ? (
                recommendations.slice(0, 3).map((rec) => (
                  <Box key={rec.id} mb={2}>
                    <Typography variant="subtitle1">{rec.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {rec.description}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography>No recommendations available.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Weight Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Weight Trend
              </Typography>
              <Line data={weightData} />
            </CardContent>
          </Card>
        </Grid>

        {/* Steps Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Steps Trend
              </Typography>
              <Line data={stepsData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 