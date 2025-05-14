const express = require("express");
const app = express();
const os = require("os")
const hostname = os.hostname();

app.listen(8090, () => console.log("Visiting port 8090 on the host " + hostname));
app.get("/", (req, res) => res.send("Current host: " + hostname ));
