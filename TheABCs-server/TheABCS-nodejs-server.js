const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const data = [
	{pageId: 0, name: 'Introduction', pageImageLoc: './images/logo.png', pageText: 'This is the intro.' },
	{pageId: 1, name: 'A is for...', pageImageLoc: './images/apple.png', pageText: 'A is for apple.' },
	{pageId: 2, name: 'B is for...', pageImageLoc: './images/boat.png', pageText: 'B is for boat.' },
	{pageId: 3, name: 'C is for...', pageImageLoc: './images/cat.png', pageText: 'C is for cat.' }
];

const server = http.createServer((req, res) => {
	
	const urlParts = req.url.split('/'); 

    // API Route
	if(urlParts[1] === 'api' && req.method === 'GET') {
		if(urlParts[2] === 'tableOfContents') {
			const tocList = data.map(({pageId, name}) => ({pageId, name}));
			res.writeHead(200, { 'Content-Type': 'application/json' });
			return res.end(JSON.stringify(tocList));
		}
		const recordId = parseInt(urlParts[3]);
		if(recordId >= data.length) {
            res.writeHead(404);
            return res.end('File Not Found');
		}
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(data[recordId]));
    }

    // Static File Handling
    let filePath = path.join(__dirname, 'static', req.url === '/' ? 'index.html' : req.url);
	
    const extname = path.extname(filePath);
    
    // Set basic MIME types
    const mimeTypes = { 
	'.html': 'text/html', 
	'.js': 'text/javascript', 
	'.css': 'text/css', 
	'.json': 'application/json', 
	  '.png': 'image/png',
	  '.jpg': 'image/jpeg',
	  '.gif': 'image/gif',
	  '.ico': 'image/x-icon',
	  '.svg': 'image/svg+xml'
	  };
	  
    const contentType = mimeTypes[extname] || 'application/octet-stream';
	
    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404);
            res.end('File Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => console.log(`Native server at http://localhost:${PORT}`));