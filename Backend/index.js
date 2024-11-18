const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const postRouter = require("./router/postRouter");
const authRouter = require("./router/authRouter");

require("dotenv").config();

const app = express();
const port = process.env.PORT;
const url = process.env.MongoDB_URL;

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,  
  allowedHeaders: ['Content-Type', 'Authorization'],  
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect(url)
  .then(() => {
    console.log("mongodb connection established...");
  })
  .catch((error) => {
    console.error("error in connection...", error.message);
  });


app.options('*', cors());

app.use(postRouter);
app.use(authRouter);

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
