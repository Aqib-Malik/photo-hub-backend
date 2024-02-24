// main.js
const express = require('express');
const cors = require('cors');
const AuthRoutes = require('./routes/routes');
const imageRoutes = require('./routes/image');
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

app.use('/', AuthRoutes);
app.use('/images', imageRoutes);
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});





