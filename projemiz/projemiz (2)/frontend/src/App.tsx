import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import theme from './theme';

// Layout
import Layout from './components/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import HealthMetrics from './pages/HealthMetrics';
import Recommendations from './pages/Recommendations';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="health-metrics"
                element={
                  <ProtectedRoute>
                    <HealthMetrics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="recommendations"
                element={
                  <ProtectedRoute>
                    <Recommendations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
