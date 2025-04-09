import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';
import { RootState } from '../store';
import { fetchUserRecommendations, generateRecommendations } from '../store/slices/recommendationsSlice';

const Recommendations: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { recommendations, loading } = useSelector(
    (state: RootState) => state.recommendations
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserRecommendations(user.id));
    }
  }, [dispatch, user?.id]);

  const handleGenerateRecommendations = () => {
    if (user?.id) {
      dispatch(generateRecommendations(user.id));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
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
        <Typography variant="h4">Health Recommendations</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateRecommendations}
        >
          Generate New Recommendations
        </Button>
      </Box>

      <Grid container spacing={3}>
        {recommendations.map((recommendation) => (
          <Grid item xs={12} md={6} key={recommendation.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">{recommendation.title}</Typography>
                  <Chip
                    label={recommendation.priority}
                    color={getPriorityColor(recommendation.priority)}
                    size="small"
                  />
                </Box>
                <Typography variant="body1" paragraph>
                  {recommendation.description}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Chip
                    label={recommendation.category}
                    variant="outlined"
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    Valid until:{' '}
                    {new Date(recommendation.validUntil).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {recommendations.length === 0 && (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="text.secondary">
            No recommendations available. Click the button above to generate new recommendations.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Recommendations; 