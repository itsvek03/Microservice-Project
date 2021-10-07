const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const express = require('express');
const app = express();
const cors = require('cors')
const db = require('./models')
const PORT = 5000;
const indexRouter = require('./router')
app.use(express.json());
app.use(cors())

db.sequelize.sync({}, () => {
    console.log("Connected with the database")
})

app.use('/api', indexRouter)


app.listen(PORT, () => {
    console.log(` User Service is running on port ${PORT}`);
});
