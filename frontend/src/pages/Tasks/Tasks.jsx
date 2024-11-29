import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  LinearProgress,
} from '@mui/material';
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${BASE_URL}tasks/get`, {
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

    fetch(`${BASE_URL}tasks/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({"tasks":[{ _id:taskId, status:newStatus }]}),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        console.log(data);
        setTasks(updatedTasks);
      })
      .catch((err) => console.error(err));
  };

  // Calculate progress based on completed tasks
  const completedTasksCount = tasks.filter(
    (task) => task.status === 'completed'
  ).length;
  const totalTasksCount = tasks.length;
  const progress =
    totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <CircularProgress color='secondary' thickness={6} />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 7 }}>
      <Typography variant='h4' gutterBottom>
        My Assigned Tasks
      </Typography>

      {/* Progress Bar */}
      <Box sx={{ width: '100%', mb: 3 }}>
        <Typography variant='subtitle1' gutterBottom>
          Overall Progress: {Math.round(progress)}%
        </Typography>
        <LinearProgress
          variant='determinate'
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '#e0e0e0', // Background color for the progress track
            '& .MuiLinearProgress-bar': {
              backgroundColor: progress === 100 ? '#4caf50' : '#2196f3', // Green if 100%, else Blue
            },
          }}
        />
      </Box>

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
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: 'space-around',
              alignItems: 'start',
              position: 'relative',
            }}
          >
            {/* Type Chip */}
            <Chip
              label={
                task.flags === 'L'
                  ? 'Learning'
                  : task.flags === 'I'
                  ? 'Implementation'
                  : 'Analysis'
              }
              color={
                task.flags === 'L'
                  ? 'success'
                  : task.flags === 'I'
                  ? 'info'
                  : 'error'
              }
              size='small'
              sx={{
                fontWeight: 500,
                position: 'absolute',
                left: 0,
                top: 0,
                margin: '4px',
              }}
            />

            <Grid item xs={12}>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 600,
                  color: '#333',
                  mb: 1,
                }}
              >
                {task.name}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant='body2' sx={{ color: 'darkslategray', mb: 2 }}>
            {task.description}
          </Typography>

          <Grid container spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
            <Grid item xs={6}>
              <Typography variant='body2' sx={{ color: '#6d6d6d' }}>
                <strong>Estimated Time:</strong> {task.estimated_time} hours
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Chip
                label={
                  task.status === 'completed'
                    ? 'Completed'
                    : task.status === 'in_progress'
                    ? 'In Progress'
                    : 'Pending'
                }
                color={
                  task.status === 'completed'
                    ? 'success'
                    : task.status === 'in_progress'
                    ? 'primary'
                    : 'warning'
                }
                size='small'
                sx={{ fontWeight: 500 }}
              />
            </Grid>
          </Grid>

          <FormControl fullWidth size='small' sx={{ mb: 1 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={task.status}
              onChange={(e) => handleStatusChange(task._id, e.target.value)}
              label='Status'
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '4px',
              }}
            >
              <MenuItem value='pending'>Pending</MenuItem>
              <MenuItem value='in_progress'>In Progress</MenuItem>
              <MenuItem value='completed'>Completed</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      ))}
    </Box>
  );
};

export default Tasks;
