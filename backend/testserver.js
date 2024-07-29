const express = require('express');
const PORT = 5000;

const app = express();

app.use('/', (req, res) => {
	res.send('Welcome to the Support Desk API server')
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
