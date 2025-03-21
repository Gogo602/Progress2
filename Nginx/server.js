import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const port = 5175;

// Use this to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = http.createServer((req, res) => {
  // Construct the file path
  const filePath = path.join(
    __dirname,
    req.url === '/' ? 'index.html' : req.url.slice(1) // Remove the leading slash from req.url
  );

  console.log(filePath); // For debugging
  const extName = String(path.extname(filePath)).toLowerCase();

  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript', // Corrected MIME type for JS
    '.png': 'image/png',             // Corrected MIME type for PNG
    '.jpg': 'image/jpg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.json': 'application/json',
  };

  const contentType = mimeTypes[extName] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // 404: File Not Found
        res.writeHead(404, { 'Content-Type': 'text/html' }); // Corrected header
        res.end('404: File Not Found');
      } else {
        // 500: Server Error (for other errors, e.g., permission issues)
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`500: Server Error: ${err.code}`); // Include error details
      }
    } else {
      // 200: OK
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8'); // Specify encoding if content is text
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
