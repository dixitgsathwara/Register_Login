const express = require("express");
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv=require("dotenv");
const cookieParser=require('cookie-parser');
dotenv.config();
const connectionDB = require ("./config/connectionDB");
connectionDB();
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/user',require("./routes/userRoutes"))
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
