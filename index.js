const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    let filePath = path.join(__dirname, "dist",(req.url === "/" ? "/index.html" : req.url));

    if (req.url.endsWith(".js")) {
      filePath = path.join(__dirname, "dist", req.url);
      return fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }

        res.writeHead(200, { "Content-Type": "text/javascript" });
        res.end(data);
      });
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  })
  .listen(port);
