import { useEffect, useState } from "react"
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
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
  } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Tasks = () => {
    const [tasks,setTasks] = useState([]);
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
            console.log(data.tasks);
            setTasks(data.tasks);
            setLoading(false);
        })
        .catch((err) => console.error(err));
    }
    , [token]);
    const handleStatusChange = (taskId, newStatus) => {
        const updatedTasks = tasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
    
        // Call a function to update status on the server
        // updateTaskStatus(taskId, newStatus);
      };
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
        <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Assigned Tasks
      </Typography>
      {tasks.map((task) => (
        <Paper key={task._id} elevation={3} sx={{ p: 3, mb: 2, borderRadius: '12px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                <AssignmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                {task.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {task.description}
              </Typography>
              <FormControl fullWidth variant="outlined" sx={{ mb: 1 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  label="Status"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
              <Chip
                label={`Current Status: ${task.status}`}
                color={task.status === 'completed' ? 'success' : 'warning'}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4} textAlign="right">
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                <AccessTimeIcon sx={{ mr: 0.5, verticalAlign: 'middle' }} fontSize="small" />
                Estimated Time: {task.estimated_time} hours
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
      );
}

export default Tasks