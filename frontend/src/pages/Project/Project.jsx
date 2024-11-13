// Make ui even better
import { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Chip,
  InputLabel,
  Paper,
  Grid2,
} from '@mui/material';
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Project = () => {
  const token = localStorage.getItem('token');
  const [hasTeam, setHasTeam] = useState(false);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [techStacks, setTechStacks] = useState([]);
  const [selectedTechStack, setSelectedTechStack] = useState('');
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}team/view`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data?.inteam) {
          setHasTeam(true);
          setProject(data.team.project);
          setTeamMembers(data.team.members);
          if (data.team.project) {
            fetch(`${BASE_URL}project/get`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
            })
              .then((response) => (response.ok ? response.json() : null))
              .then((data) => {
                setRoadmap(data);
              })
              .catch((err) => console.error(err));
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  const startProject = () => {
    fetch(`${BASE_URL}project/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ tech_stack: selectedTechStack, project: roadmap }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  const handleGenerateTechStacks = () => {
    fetch(`${BASE_URL}project/techstack/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ projectDescription: description }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTechStacks(data.techStack);
      })
      .catch((err) => console.error(err));
  };

  const handleSelectTechStack = (stack) => {
    setSelectedTechStack(stack);
    fetch(`${BASE_URL}project/roadmap/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        techstack: stack,
        projectDescription: description,
        teammembers: teamMembers,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRoadmap(data);
      })
      .catch((err) => console.error(err));
  };
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  return hasTeam ? (
    project ? (
      <Box sx={{ mt: 3 }}>
        {roadmap && (
          <Box sx={{ mt: 3 }}>
            <Box sx={{ height: '50px' }}></Box>
            <Typography variant='h5' gutterBottom>
              Project Roadmap
            </Typography>
            {roadmap.roadmap.map((milestone, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: '12px',
                  backgroundColor: 'lightgray',
                }}
              >
                <Typography variant='h6'>{milestone.milestone}</Typography>
                <Typography variant='subtitle2' sx={{ mb: 2 }}>
                  Deadline: {milestone.deadline}
                </Typography>
                {milestone.tasks.map((task, taskIndex) => {
                  let backgroundColor;
                  switch (task.flags.type) {
                    case 'L':
                      backgroundColor = 'lightgreen';
                      break;
                    case 'I':
                      backgroundColor = 'lightblue';
                      break;
                    case 'A':
                      backgroundColor = 'red';
                      break;
                    default:
                      backgroundColor = 'red';
                  }
                  console.log(task);
                  const handleAssignedChange = (event) => {
                    task.assigned_to = event.target.value;
                    // Optional: update the state to reflect changes in the UI
                    setRoadmap((prevRoadmap) => ({
                      ...prevRoadmap,
                      roadmap: prevRoadmap.roadmap.map((m, i) =>
                        i === index
                          ? {
                              ...m,
                              tasks: m.tasks.map((t, ti) =>
                                ti === taskIndex
                                  ? { ...t, assigned_to: event.target.value }
                                  : t
                              ),
                            }
                          : m
                      ),
                    }));
                  };

                  return (
                    <Paper
                      key={taskIndex}
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
                      <Grid2
                        container
                        spacing={2}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          alignItems: 'start',
                          position: 'relative', // Make the parent a positioning reference
                        }}
                      >
                        <Chip
                          label={
                            task.flags.type === 'L'
                              ? 'Learning'
                              : task.flags.type === 'I'
                              ? 'Implementation'
                              : 'Analysis'
                          }
                          color={
                            task.flags.type === 'L'
                              ? 'success'
                              : task.flags.type === 'I'
                              ? 'info'
                              : 'error'
                          }
                          size='small'
                          sx={{
                            fontWeight: 500,
                            margin: '4px',
                            position: 'absolute', // Position the Chip relative to the parent
                            left: 0, // Position on the left within the parent
                            top: 0, // Adjust for vertical position if needed
                          }}
                        />
                        <div style={{ width: '100%', flex: 1 }}>
                          <Typography
                            variant='h6'
                            sx={{
                              fontWeight: 600,
                              color: backgroundColor,
                              mb: 1,
                            }}
                          >
                            {task.name}
                          </Typography>
                        </div>
                      </Grid2>

                      <Typography
                        variant='body2'
                        sx={{ color: 'darkslategray', mb: 2 }}
                      >
                        {task.description}
                      </Typography>

                      <Grid
                        container
                        spacing={2}
                        sx={{ alignItems: 'center', mb: 2 }}
                      >
                        <Grid item xs={6}>
                          <Typography variant='body2' sx={{ color: '#6d6d6d' }}>
                            <strong>Estimated Time:</strong>{' '}
                            {task.estimated_time} hours
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Chip
                            label={'Pending'}
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
                        <InputLabel>Assigned To</InputLabel>
                        <Select
                          value={task.assigned_to || ''}
                          onChange={handleAssignedChange}
                          label='Assigned To'
                          sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: '4px',
                          }}
                        >
                          {teamMembers.map((member, memberIndex) => (
                            <MenuItem key={memberIndex} value={member._id}>
                              {member.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Paper>
                  );
                })}
              </Paper>
            ))}
          </Box>
        )}
        {roadmap && (
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 3 }}
            onClick={() => startProject()}
          >
            Update Project
          </Button>
        )}
      </Box>
    ) : (
      <Box sx={{ mt: 4, px: 2 }}>
        <Typography variant='h4' gutterBottom>
          Project
        </Typography>
        <Typography variant='h6' sx={{ mb: 3 }}>
          Create project for your team
        </Typography>
        <TextField
          label='Project Description'
          variant='outlined'
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleGenerateTechStacks}
          sx={{ mb: 3 }}
        >
          Generate Tech Stacks
        </Button>

        {techStacks.length > 0 && (
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select a Tech Stack</InputLabel>
            <Select
              value={selectedTechStack}
              onChange={(e) => handleSelectTechStack(e.target.value)}
              label='Select a Tech Stack'
            >
              {techStacks.map((stack, index) => (
                <MenuItem key={index} value={stack}>
                  {stack.join(', ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {roadmap && (
          <Box sx={{ mt: 3 }}>
            <Typography variant='h5' gutterBottom>
              Project Roadmap
            </Typography>
            {roadmap.roadmap.map((milestone, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: '12px',
                  backgroundColor: 'lightgray',
                }}
              >
                <Typography variant='h6'>{milestone.milestone}</Typography>
                <Typography variant='subtitle2' sx={{ mb: 2 }}>
                  Deadline: {milestone.deadline}
                </Typography>
                {milestone.tasks.map((task, taskIndex) => {
                  let backgroundColor;
                  switch (task.flags.type) {
                    case 'L':
                      backgroundColor = 'green';
                      break;
                    case 'I':
                      backgroundColor = 'blue';
                      break;
                    case 'A':
                      backgroundColor = 'red';
                      break;
                    default:
                      backgroundColor = 'red';
                  }

                  const handleAssignedChange = (event) => {
                    task.assigned_to = event.target.value;
                    // Optional: update the state to reflect changes in the UI
                    setRoadmap((prevRoadmap) => ({
                      ...prevRoadmap,
                      roadmap: prevRoadmap.roadmap.map((m, i) =>
                        i === index
                          ? {
                              ...m,
                              tasks: m.tasks.map((t, ti) =>
                                ti === taskIndex
                                  ? { ...t, assigned_to: event.target.value }
                                  : t
                              ),
                            }
                          : m
                      ),
                    }));
                  };
                  console.log(task.flags.type);
                  return (
                    <Paper
                      key={taskIndex}
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
                      <Grid2
                        container
                        spacing={2}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          alignItems: 'start',
                          position: 'relative', // Make the parent a positioning reference
                        }}
                      >
                        <Chip
                          label={
                            task.flags.type === 'L'
                              ? 'Learning'
                              : task.flags.type === 'I'
                              ? 'Implementation'
                              : 'Analysis'
                          }
                          color={
                            task.flags.type === 'L'
                              ? 'success'
                              : task.flags.type === 'I'
                              ? 'info'
                              : 'error'
                          }
                          size='small'
                          sx={{
                            fontWeight: 500,
                            margin: '4px',
                            position: 'absolute', // Position the Chip relative to the parent
                            left: 0, // Position on the left within the parent
                            top: 0, // Adjust for vertical position if needed
                          }}
                        />
                        <div style={{ width: '100%', flex: 1 }}>
                          <Typography
                            variant='h6'
                            sx={{
                              fontWeight: 600,
                              color: backgroundColor,
                              mb: 1,
                            }}
                          >
                            {task.name}
                          </Typography>
                        </div>
                      </Grid2>

                      <Typography
                        variant='body2'
                        sx={{ color: 'darkslategray', mb: 2 }}
                      >
                        {task.description}
                      </Typography>

                      <Grid
                        container
                        spacing={2}
                        sx={{ alignItems: 'center', mb: 2 }}
                      >
                        <Grid item xs={6}>
                          <Typography variant='body2' sx={{ color: '#6d6d6d' }}>
                            <strong>Estimated Time:</strong>{' '}
                            {task.estimated_time} hours
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Chip
                            label={'Pending'}
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
                        <InputLabel>Assigned To</InputLabel>
                        <Select
                          value={task.assigned_to || ''}
                          onChange={handleAssignedChange}
                          label='Assigned To'
                          sx={{
                            backgroundColor: '#ffffff',
                            borderRadius: '4px',
                          }}
                        >
                          {teamMembers.map((member, memberIndex) => (
                            <MenuItem key={memberIndex} value={member._id}>
                              {member.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Paper>
                  );
                })}
              </Paper>
            ))}
          </Box>
        )}
        {roadmap && (
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 3 }}
            onClick={() => startProject()}
          >
            Start Project
          </Button>
        )}
      </Box>
    )
  ) : (
    <div>
      <Typography variant='h4'>Project</Typography>
      <Typography variant='h6'>Create a Team to Work on a Project</Typography>
    </div>
  );
};

export default Project;