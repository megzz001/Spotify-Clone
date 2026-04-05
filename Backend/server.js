const app = require('./src/app');
const connectDB = require('./src/db/db');
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

