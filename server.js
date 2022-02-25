const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extender: false }));

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;

app.use('/api/students', require('./routes/api/students'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
