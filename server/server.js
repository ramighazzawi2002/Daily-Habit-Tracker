const express = require("express");

const habbitRouter = require("./routers/habbitRouter");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/habbits", habbitRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
