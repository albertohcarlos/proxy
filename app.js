const express = require('express');
const routes = require('./src/routes/routes')
const cors = require('cors')

const app = express();

app.use(cors());
app.use('/', routes);
const port = 8081;
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));


module.exports = app;