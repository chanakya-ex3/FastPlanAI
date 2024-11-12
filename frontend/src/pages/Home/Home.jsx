import { Typography, Container, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import roadmapimage from '../../assets/homepage/roadmap.png'
import techstackimage from '../../assets/homepage/techstack.png'
import planimage from '../../assets/homepage/plan.png'

const features = [
    {
      image: planimage,
      title: 'AI-Powered Project Planning',
      description: 'Revolutionize your project management with AI-driven timelines and strategic milestones to boost productivity and meet deadlines effortlessly.',
    },
    {
      image: techstackimage,
      title: 'Smart Tech Stack Recommendations',
      description: 'Leverage AI insights to choose the optimal tech stack for your projects, ensuring high performance, scalability, and cost-efficiency.',
    },
    {
      image: roadmapimage,
      title: 'Comprehensive Learning Path Integration',
      description: 'Empower your team with integrated learning paths that enhance skills while aligning with project goals, fostering growth and innovation.',
    },
    // Add more features as needed
  ];
  
function Home() {
    const navigate = useNavigate();
  return (
    <Box>
      {/* AppBar */}
      

      {/* Welcome Section */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to FastPlanAI!
        </Typography>
        <Typography variant="h6" gutterBottom>
        Accelerate project kickoff with GenAI-powered planning and seamlessly integrated learning paths to upskill your team and drive project success.
        </Typography>
        <Button variant="contained" color="primary" onClick={()=>{navigate('/team');window.location.reload()}} sx={{ mt: 2 }}>
          Get Started
        </Button>
      </Container>

      {/* Features Section */}
      <Container sx={{ mt: 6 }}>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={feature.image}
                alt={feature.title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </Box>
  );
}

export default Home;
