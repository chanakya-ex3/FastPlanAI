const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const auth = require('./Router/Authentication/auth');
const port = 3000;

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1",auth)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});