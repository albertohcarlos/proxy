const path = require('path');
const envPath = path.join(__dirname, 'env', '.env.development');
require('dotenv').config({ path: envPath });

const express = require('express');
const routes = require('./src/routes/routes')
const cors = require('cors')

const app = express();

app.use(cors());
app.use('/', routes);
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));


module.exports = app;
