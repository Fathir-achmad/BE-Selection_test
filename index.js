const express = require('express');
const PORT = 8000;
const server = express();
const db = require('./models');
const cors = require('cors');


server.use(express.json());
server.use(cors());
server.use(express.static("./public"));

const { authRouter, absenRouter, positionRouter, } = require('./routers');
server.use('/api/auth', authRouter);
server.use('/api/absen', absenRouter);
server.use('/api/position', positionRouter);


server.get('/', (req, res) => {
    res.status(200).send('This is my API for backend');
})


server.listen(PORT, () => {
    console.log(`Server running at Port ${PORT}`);
    // db.sequelize.sync( {alter:true} ) //------------------- Synchronize

})