import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  Tooltip,
  InputLabel,
  Chip,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${BASE_URL}project/tasks/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        setTasks(data.tasks);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [token]);

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress color="secondary" thickness={6} />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        My Assigned Tasks
      </Typography>
      {tasks.map((task) => (
        <Paper
          key={task._id}
          elevation={3}
          sx={{
            p: 3,
            mb: 2,
            backgroundColor: '#f9f9f9',
            borderRadius: '12px',
            border: '1px solid #e0e0e0',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Type Chip (Positioned at the top-left, not centered) */}
          <Chip
            label={
              task.flags?.type === 'L' ? 'Learning' :
              task.flags?.type === 'I' ? 'Implementation' : 'Analysis'
            }
            color={
              task.flags?.type === 'L' ? 'success' :
              task.flags?.type === 'I' ? 'info' : 'error'
            }
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              fontWeight: 500,
            }}
          />

          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {/* Task Details */}
            <Grid item xs={12} sm={8} textAlign="center">
              <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                <Tooltip title="Task Name">
                  <AssignmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                </Tooltip>
                {task.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {task.description}
              </Typography>
              <FormControl fullWidth size="small" sx={{ mb: 1, maxWidth: '200px', mx: 'auto' }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  label="Status"
                  sx={{ backgroundColor: '#ffffff', borderRadius: '4px' }}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
              <Chip
                label={`Current Status: ${task.status}`}
                color={
                  task.status === 'completed' ? 'success' :
                  task.status === 'in_progress' ? 'primary' : 'warning'
                }
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </Grid>

            {/* Estimated Time */}
            <Grid item xs={12} sm={4} textAlign="center">
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Tooltip title="Estimated Time to Complete">
                  <AccessTimeIcon sx={{ mr: 0.5, verticalAlign: 'middle' }} fontSize="small" />
                </Tooltip>
                Estimated Time: {task.estimated_time} hours
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default Tasks;
