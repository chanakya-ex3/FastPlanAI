import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate()
  return (
    <AppBar
      position='fixed'
      sx={{
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '95%',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar>
        {/* Container for the left-aligned button */}
        <Box sx={{ flexGrow: 1 }} className='flex justify-start items-start'>
          <Button variant='h6' component='div' onClick={()=>{navigate('/home');window.location.reload()}} >
            FastPlanAI
          </Button>
        </Box>

        {/* Container for the right-aligned buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color='inherit' onClick={()=>{navigate('/team');window.location.reload()}}>Team</Button>
          {role === 'PM' && <Button color='inherit' onClick={()=>{navigate('/project');window.location.reload()}}>Project</Button>  }
          {role === 'TM' && <Button color='inherit' onClick={()=>{navigate('/tasks');window.location.reload()}}>Tasks</Button>  }
          <Button
            color='inherit'
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
