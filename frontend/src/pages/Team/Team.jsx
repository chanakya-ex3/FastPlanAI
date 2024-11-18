import { useEffect, useState } from 'react';
import {
  CircularProgress,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Box,
  Button,
  Tooltip,
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Team = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [team, setTeam] = useState(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [hasTeam, setHasTeam] = useState(false);
  const [loading, setLoading] = useState(true);
  const [teamCode, setTeamCode] = useState('');
  const [newTeamCode, setNewTeamCode] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Text copied to clipboard');
      },
      (err) => {
        console.error('Error copying text: ', err);
      }
    );
  };

  const joinTeam = () => {
    fetch(`${BASE_URL}team/join`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ code: newTeamCode }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data?.inteam) {
          setTeam(data.team);
          setHasTeam(true);
          window.location.reload();
        }
      })
      .catch((err) => console.error(err.message));
  };

  const createTeam = () => {
    fetch(`${BASE_URL}team/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ name: newTeamName }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data?.inteam) {
          setTeam(data.team);
          setHasTeam(true);
        }
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

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
          setTeam(data.team);
          setHasTeam(true);
          setTeamCode(data.team._id);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress color="secondary" thickness={6} />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading team data...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Team
      </Typography>
      {hasTeam ? (
        <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(255, 255, 255,1)', p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <Typography variant="h5">{team.name}</Typography>
                  <Typography variant="h6">Manager: {team.manager.name}</Typography>
                  <Typography variant="h6">Team Code: {teamCode}</Typography>
                  <Tooltip title="Copy to Clipboard">
                    <Button
                      sx={{ color: 'white', backgroundColor: 'blue', ml: 1 }}
                      onClick={() => copyToClipboard(teamCode)}
                      startIcon={<ContentCopy />}
                    >
                      Copy
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Skills</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {team.members.map((member, index) => (
                <TableRow key={index}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.skills.join(', ')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          textAlign="center"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 1)',
            p: 3,
            borderRadius: 2,
            boxShadow: 'none',
            backdropFilter: 'blur(5px)',
          }}
        >
          <Typography variant="h5" color="textSecondary" gutterBottom>
            No Team Found
          </Typography>
          {role === 'PM' && (
            <>
              <TextField
                label="Team Name"
                variant="outlined"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
              />
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={createTeam}>
                Create Team
              </Button>
            </>
          )}
          {role === 'TM' && (
            <>
              <TextField
                label="Team Code"
                variant="outlined"
                value={newTeamCode}
                onChange={(e) => setNewTeamCode(e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
              />
              <Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={joinTeam}>
                Join a Team
              </Button>
            </>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Team;
