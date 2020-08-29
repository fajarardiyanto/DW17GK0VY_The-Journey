const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const multiparty = require("connect-multiparty");

const MultipartyMiddleware = multiparty({ uploadDir: "images" });

const app = express();
const port = 8080;

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use("/Images", express.static("images"));
// app.use(bodyParser.urlencoded({ extended: false }));

app.post("/upload", MultipartyMiddleware, (req, res) => {
  console.log(req.files.upload);
  var TempFile = req.files.upload.path;

  res.status(200).json({
    uploaded: true,
    url: `http://localhost:8080/${TempFile}`,
  });
});

const router = require("./routes/routers");

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use("/api/v1", router);
