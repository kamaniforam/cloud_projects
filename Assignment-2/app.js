const express = require("express");
const bodyParser = require("body-parser");
const { dbConnect } = require("./db"); // Import the db connection module
const app = express();

//Middleware for parsing JSON requests
app.use(bodyParser.json());
app.get("/healthcheck", async (req, res) => {
  try {
    //Test the databse connection
    if (Object.keys(req.body).length > 0) {
      res
        .status(400)
        .header("Cache-Control", "no-cache, no-store, must-revalidate")
        .header("Pragma", "no-cache")
        .send();
      return;
    }
    if (Object.keys(req.query).length > 0) {
      res
        .status(400)
        .header("Cache-Control", "no-cache, no-store, must-revalidate")
        .header("Pragma", "no-cache")
        .send();
      return;
    }
    await dbConnect(); //Return HTTP 200 ok if the db is connected
    res
      .status(200)
      .header("Cache-Control", "no-cache, no-store, must-revalidate")
      .header("Pragma", "no-cache")
      .send();
  } catch (error) {
    console.error("DB connection error:", error);
    res
      .status(503)
      .header("Cache-Control", "no-cache, no-store, must-revalidate")
      .header("Pragma", "no-cache")
      .send();
  }
});

//handle unsuppported methods for /health
app.all("/healthcheck", (req, res) => {
  res
    .status(405)
    .header("Cache-Control", "no-cache, no-store, must-revalidate")
    .header("Pragma", "no-cache")
    .send();
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
