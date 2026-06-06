/* Tiny static file server for local preview.
   Run:  node server.js   →  http://localhost:8123  */
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8123;
const ROOT = __dirname;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml", ".pdf": "application/pdf", ".ico": "image/x-icon",
  ".webp": "image/webp"
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  const filePath = path.join(ROOT, urlPath);
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end("Forbidden"); }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("404 Not Found"); }
    res.writeHead(200, {
      "Content-Type": TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store, no-cache, must-revalidate"
    });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Portfolio running → http://localhost:${PORT}`));
