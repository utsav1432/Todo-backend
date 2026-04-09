const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./databaseConnect');

dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', require('./routes/taskRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});