/*
const http = require('http');
const fs = require('fs');
const path = require('path');
*/
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8080;

const data = [
	{pageId: 0, name: 'Introduction', pageImageLoc: './images/logo.png', pageText: 'This is the intro.' },
	{pageId: 1, name: 'Z is for...', pageImageLoc: './images/apple.png', pageText: 'A is for apple.' },
	{pageId: 2, name: 'B is for...', pageImageLoc: './images/boat.png', pageText: 'B is for boat.' },
	{pageId: 3, name: 'C is for...', pageImageLoc: './images/cat.png', pageText: 'C is for cat.' }
];

// Define the function as async
/*
const getTableOfContents = async () => {
  try {
    const tocList = await pool.query('SELECT page_id, "name" FROM page ORDER BY page_id ASC');
    return tocList.rows;
  } catch (err) {
    console.error("Query error", err);
  }
};
*/

const server = http.createServer(async (req, res) => {
	
	const urlParts = req.url.split('/'); 

    // API Route
	if(urlParts[1] === 'api' && req.method === 'GET') {
		if(urlParts[2] === 'tableOfContents') {
			//const tocList = data.map(({pageId, name}) => ({pageId, name}));
			
			const tocList = await pool.query('SELECT page_id, "name" FROM page ORDER BY page_id ASC');
			
			res.writeHead(200, { 'Content-Type': 'application/json' });
			return res.end(JSON.stringify(tocList.rows));
		}
		
		if(urlParts.length < 4) {
            res.writeHead(404);
            return res.end('File Not Found');
		}
		
		const recordId = parseInt(urlParts[3]);
		
		//console.log('SELECT * FROM page WHERE page_id=' + recordId);
		const page = await pool.query('SELECT * FROM page WHERE page_id=' + recordId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
		if(page.rows.length===1) {
			return res.end(JSON.stringify(page.rows[0]));
		}
        else{
            res.writeHead(404);
            return res.end('File Not Found');
		}
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