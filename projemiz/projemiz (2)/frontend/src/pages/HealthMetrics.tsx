import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { RootState } from '../store';
import { fetchUserMetrics, recordMetrics } from '../store/slices/healthMetricsSlice';
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

const HealthMetrics: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { metrics, loading } = useSelector((state: RootState) => state.healthMetrics);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    weight: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    heartRate: '',
    steps: '',
    notes: '',
  });

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserMetrics(user.id));
    }
  }, [dispatch, user?.id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.id) {
      dispatch(
        recordMetrics({
          userId: user.id,
          weight: parseFloat(formData.weight),
          bloodPressureSystolic: parseInt(formData.bloodPressureSystolic),
          bloodPressureDiastolic: parseInt(formData.bloodPressureDiastolic),
          heartRate: parseInt(formData.heartRate),
          steps: parseInt(formData.steps),
          notes: formData.notes,
          recordedAt: new Date().toISOString(),
        })
      );
      handleClose();
      setFormData({
        weight: '',
        bloodPressureSystolic: '',
        bloodPressureDiastolic: '',
        heartRate: '',
        steps: '',
        notes: '',
      });
    }
  };

  const weightData = {
    labels: metrics.map((m) => new Date(m.recordedAt).toLocaleDateString()).reverse(),
    datasets: [
      {
        label: 'Weight (kg)',
        data: metrics.map((m) => m.weight).reverse(),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const bloodPressureData = {
    labels: metrics.map((m) => new Date(m.recordedAt).toLocaleDateString()).reverse(),
    datasets: [
      {
        label: 'Systolic',
        data: metrics.map((m) => m.bloodPressureSystolic).reverse(),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Diastolic',
        data: metrics.map((m) => m.bloodPressureDiastolic).reverse(),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Health Metrics</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Record New Metrics
        </Button>
      </Box>

      <Grid container spacing={3}>
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

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Blood Pressure Trend
              </Typography>
              <Line data={bloodPressureData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                History
              </Typography>
              {metrics.map((metric) => (
                <Box key={metric.id} mb={2}>
                  <Typography variant="subtitle1">
                    {new Date(metric.recordedAt).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    Weight: {metric.weight} kg | Blood Pressure: {metric.bloodPressureSystolic}/
                    {metric.bloodPressureDiastolic} mmHg | Heart Rate: {metric.heartRate} bpm |
                    Steps: {metric.steps}
                  </Typography>
                  {metric.notes && (
                    <Typography variant="body2" color="text.secondary">
                      Notes: {metric.notes}
                    </Typography>
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Record New Health Metrics</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Weight (kg)"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Blood Pressure Systolic"
              name="bloodPressureSystolic"
              type="number"
              value={formData.bloodPressureSystolic}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Blood Pressure Diastolic"
              name="bloodPressureDiastolic"
              type="number"
              value={formData.bloodPressureDiastolic}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Heart Rate (bpm)"
              name="heartRate"
              type="number"
              value={formData.heartRate}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Steps"
              name="steps"
              type="number"
              value={formData.steps}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Notes"
              name="notes"
              multiline
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HealthMetrics; 