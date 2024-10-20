// basic express code
const express = require('express');
const app = express();
const connection = require('./connection/connection');
const middleware = require('./middleware/middleware');
const auth = require('./routes/auth/auth');
const userData = require('./routes/userData/userData');
const team = require('./routes/team/team');

const port = 3000;
app.use(express.json());

app.use('/api/v1/auth', auth);
app.use('/api/v1/userData',middleware, userData);
app.use('/api/v1/team',middleware, team);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);
