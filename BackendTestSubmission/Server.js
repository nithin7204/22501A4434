const express = require('express');
const app = express();
const shortenerRouter = require('./shortener/route');

app.use(express.json());
app.use('/', shortenerRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));