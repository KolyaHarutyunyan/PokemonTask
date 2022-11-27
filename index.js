const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    let filePath = path.join(
      __dirname,
      "dist",
      req.url === "/" ? "/index.html" : req.url
    );

    if (req.url.endsWith(".js") || req.url.endsWith(".svg")) {
      filePath = path.join(__dirname, "dist", req.url);
      return fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }

        res.writeHead(200, {
          "Content-Type": req.url.endsWith(".svg")
            ? "image/svg+xml"
            : "text/javascript",
        });
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
