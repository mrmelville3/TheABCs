import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8080;

const server = http.createServer(async (req, res) => {
	
	// ================================= START: API routing ==========================================
	const urlParts = req.url.split('/'); 

	if(urlParts[1] === 'api' && req.method === 'GET') {
		if(urlParts[2] === 'tableOfContents') {
			
			//const tocList = data.map(({pageId, name}) => ({pageId, name}));
			const tocData = await pool.query('SELECT pageid, "name" FROM Pages ORDER BY pageId ASC');
			
			//const tocList = tocData.rows.map(({pageid, name}) => ({pageId, name}));
			
			const tocList = tocData.rows.map(({ pageid, name }) => ({
			  pageId: pageid, // Map lowercase 'pageid' to camelCase 'pageId'
			  name: name
			}));
			
			res.writeHead(200, { 'Content-Type': 'application/json' });
			return res.end(JSON.stringify(tocList));
			
		}
		
		if(urlParts[2] === 'pagedata') {
			
			const recordId = parseInt(urlParts[3])// - 1;
			
			const page = await pool.query('SELECT * FROM Pages WHERE pageId=' + recordId);
			
			if(page.rows.length===1) {
				
				console.log("Response: ", page.rows[0]) // console.log("Response: ", data[recordId])
				
				 // Map lowercase 'pageid' to camelCase 'pageId' and other fields
				const pageData = {
					pageId: page.rows[0].pageid,
					name: page.rows[0].name,
					pageImageLoc: page.rows[0].pageimageloc,
					pageText: page.rows[0].pagetext
				}
				res.writeHead(200, { 'Content-Type': 'application/json' });
				return res.end(JSON.stringify(pageData)); // return res.end(JSON.stringify(data[recordId]));
			}
		}

		res.writeHead(404);
		return res.end('File Not Found');
    }
	// ================================= END: API routing ==========================================

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