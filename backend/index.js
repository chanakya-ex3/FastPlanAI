// basic express code
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./connection/connection');
const middleware = require('./middleware/middleware');
const middlewareTM = require('./middleware/middlewareTM');
const middlewarePM = require('./middleware/middlewarePM');
const auth = require('./routes/common/auth/auth');
const userData = require('./routes/member/userData/userData');
const createTeam = require('./routes/common/team/create');
const joinTeam = require('./routes/common/team/join');
const viewTeam = require('./routes/common/team/view');
const techStack = require('./routes/manager/project/techstack/techstack');
const roadmap = require('./routes/manager/project/roadmap/roadmap');
const startProject = require('./routes/manager/project/projectdetails/projectdetails')
const tasks = require('./routes/manager/project/projectdetails/tasks');
const port = 3000;
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
// cors allow localhost 5173
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173','https://fastplanai.web.app/');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     next();
// });
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow all headers
}));

app.use('/api/v1/auth', auth);
app.use('/api/v1/userData',middlewareTM, userData);
app.use('/api/v1/team/create',middlewarePM, createTeam);
app.use('/api/v1/team/join',middlewareTM, joinTeam);
app.use('/api/v1/team/view',middleware, viewTeam);

app.use('/api/v1/project/techstack/',middlewarePM, techStack);
app.use('/api/v1/project/roadmap/',middlewarePM, roadmap);
app.use('/api/v1/project/',middlewarePM, startProject);
app.use('/api/v1/tasks/',middlewareTM, tasks);
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