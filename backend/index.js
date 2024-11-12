// basic express code
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./connection/connection');
const middleware = require('./middleware/middleware');
const auth = require('./routes/common/auth/auth');
const userData = require('./routes/member/userData/userData');
const team = require('./routes/common/team/team');
const techStack = require('./routes/manager/project/techstack/techstack');
const roadmap = require('./routes/manager/project/roadmap/roadmap');
const startProject = require('./routes/manager/project/projectdetails/projectdetails')
const tasks = require('./routes/manager/project/projectdetails/tasks');
const port = 3000;
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
// cors allow localhost 5173
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173','https://fastplanai.web.app/');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use('/api/v1/auth', auth);
app.use('/api/v1/userData',middleware, userData);
app.use('/api/v1/team',middleware, team);
app.use('/api/v1/project/techstack/',middleware, techStack);
app.use('/api/v1/project/roadmap/',middleware, roadmap);
app.use('/api/v1/project/',middleware, startProject);
app.use('/api/v1/project/tasks/',middleware, tasks);
app.get('/api/v1/check',middleware ,(req, res) => {
    res.status(200).json({ message: 'success' });
});
app.get('/', (req, res) => {
    res.send('FlastPlanAI on Vercel!');
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    }
);