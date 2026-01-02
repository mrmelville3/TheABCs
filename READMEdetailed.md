# The ABCs - A Simple Full Stack Web Applicaiton
A full stack web app with client, server, and database . It's an alphabet book. The tech stack is similar to PERN (PostGreSQL, Express, React, Node.js) minus Express. There is also no React framework. One of the goals of this project was to use as few node installs as possible and keep it as simple as possible.  
  
Project goals:
- Use react and JSX with NO REACT FRAMEWORK (node.js, vue, vite, etc.)
- keep npm installs to a minimum
- Use node.js 
- use a database
- use esbuild to build jsx react components into JavaScript bundle
- create a node.js server to serve static files and also provide APIs
- don't use VSCode or any IDE (do it the hard way to learn the benefits of an IDE)
  - instead, use notepad++, Windows PowerShell terminal, Chrome browser, Windows Explorer
## You will need
- node.js - Download installer from https://nodejs.org/
  - needed for terminal commands: npm, npx, node
- PostGreSQL - Download installer from https://www.postgresql.org/ 
- Notepad++ (or notepad, I like notepad++ for the line numbers)
- git and gitHub if you want a repository and change tracking

## Getting started
These instructions are specific to Windows. I assume the same things can be done on other operating systems in similar fashion.

### Setup Folder Structure For client and server projects
Create folder for project (TheABCs). Inside that folder create two sub folders. One folder for the server application (TheABCs-server), one folder for the client (TheABCs-client). Continue and mimic this folder structure:

- TheABCs (parent project folder)
  - TheABCs-client
    - dist (output of the client build. The files in here will be hosted on the server)
      - images (contains image files for all `<img />` tags)
    - jsx (for react components)
  - TheABCs-server
    - static (for static files)
  - README.md (this file)

## Create Basic Front End in react
### Install react
Navigate to `TheABCs/TheABCs-client` in Windows explorer. Right click and select 'open in terminal'. Type command:
`npm install react react-dom`. This will download the necessary react node packages from the npm node package repository and create the following files and folders in `TheABCs/TheABCs-client`: 
- package.json
- package-lock.json
- node_modules
  - react
  - react-dom
  - scheduler

### Make React Base project

In `TheABCs/TheABCs-client/dist`, make a new file called index.html. Open it in notepad++. Add the following to the file:

```
<!DOCTYPE HTML>
<html>
	<head>
	  <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>esbuild project</title>
	  <link rel="stylesheet" href="styles.css" />
	</head>
	<body>
	  <div id="root"></div>
	  <script src="bundle.js"></script>
	</body>
</html>
```

### Start Creating compoenents (.jsx files)
In `TheABCs/TheABCs-client/jsx`, make index.jsx file with the following contents:

```
import React from 'react';
import { createRoot } from 'react-dom/client';
import AbcHeader from './AbcHeader';

const root = createRoot(document.getElementById('root')!);
root.render(
  <div>
    <AbcHeader />
  </div>
);
```
### Create App UI Header
In `TheABCs/TheABCs-client/jsx`, create AbcHeader.jsx file with the following contents:
```
import React from 'react';

function AbcHeader() {
	
	return (
		<header className="app-header">
			<div className="app-header-left">
			  <img src="./images/logo.png" alt="Logo" />
			</div>
			<div className="app-header-middle">
				<h1>The ABC's</h1>
			</div>
			<div className="app-header-right">
			  <img src="./images/user.png" alt="Logo" />
			</div>
		</header>

	);
}

export default AbcHeader;
```
Create and add images to `TheABCs/TheABCs-client/dist/images` folder needed for header `<img />` tags.
- logo.png
- user.png

In `TheABCs/TheABCs-client/dist`, create styles.css and add styles for the header as shown below:

```
* { color: #4B5564; }

.app-header {
  display: flex;
  justify-content: space-between; /* This creates the left/middle/right gap */
  align-items: center;           /* Centers items vertically */
  border-bottom: 1px solid #4B5564;
}
```

### Do The First Build
Now build the application with the following command in the powershell window. This will be the client application build command throughout the project.
`npx esbuild ./jsx/index.jsx --bundle --outfile="./dist/bundle.js"`

The build process processes the .jsx files and bundles them up into one JavaScript file called `bundle.js' in the dist folder. 

Let's look at what we've done. In windows explorer, navigate to `TheABCs/TheABCs-client/dist` and double click on index.html. Assuming when you double click the index.html, it opens in an internet browser like Chrome or Edge, you should see a webpage with a header at the top that includes:
- a logo displayed on the far left
- the title in the middle ("The ABC's")
- another image to the right

### Create navigation and display
In order to do this you will need a parent component (NavAndMainPane) and two child components (LeftsideNav and LetterPage). One child will be the left-hand navigation menu and the other will be the main display pane for content on the right. Eventually, the navigation clicks will direct the parent component to upate the content displayed in the main display pane.

In `TheABCs/TheABCs-client/jsx`, create the parent NavAndMainPane.jsx file with the following contents:
```
import React from 'react';
import LeftsideNav from './LeftsideNav';
import LetterPage from './LetterPage';

function NavAndMainPane() {
	
	return (
	<div className="container">
		<LeftsideNav />
		<LetterPage />
	</div>
	);
}

export default NavAndMainPane;
```
In styles.css add styles as shown below. This puts the LeftsideNav and LetterPage side-by-side instead of stacked vertically.
```
.container {
  display: flex;
  align-items: flex-start; /* Aligns both to the top */
  width: 100%;
}
```
In `TheABCs/TheABCs-client/jsx`, create LeftsideNav.jsx file with the following contents:
```
import React from 'react';

function LeftsideNav() {

	return (
		<nav className="sidebar">
		  <div className="sidebar-content">
			<ul className="nav-list">
			  <li className="nav-item"><a href="#" className="nav-link"><span className="nav-label">Introduction</span></a></li>
			  <li className="nav-item"><a href="#" className="nav-link"><span className="nav-label">A is for...</span></a></li>
			</ul>
		  </div>
		</nav>
	);
}

export default LeftsideNav;
```
In styles.css add styles as shown below. This styles the list items.
```

.nav-list {
  list-style-type: none; /* Removes bullets */
}

.nav-link {
  text-decoration: none; /* Removes underlining */
  display: flex;       
  align-items: center;
  gap: 12px;
  padding: 10px 16px 8px 8px;
  border-radius: 8px;    /* Rounded corners for a modern feel */
  transition: all 0.2s ease; /* Smooth hover effect */
}
/* Hover state: when the mouse is over the link */
.nav-link:hover {
  background-color: #f3f4f6; /* Very light gray */
  color: #111827;           /* Darker text color */
}

/* Active state: when the user is currently on that page */
.nav-link.active {
  background-color: #eef2ff; /* Light blue tint */
  color: #4f46e5;           /* Primary brand color (Indigo) */
  font-weight: 600;
}
```
In `TheABCs/TheABCs-client/jsx`, create LetterPage.jsx file with the following contents:
```
import React from 'react';

function LetterPage() {
	
	return (
	  <div className="letter-page">
		<h1>A is for...</h1>
		<img src="./images/apple.png" alt="Letter Image" />
		<p>A is for apple.</p>
	  </div>
	);
}

export default LetterPage;
```
In styles.css add styles as shown below. This centers the content displayed in the content dislpay pane.
```
.letter-page {
  display: flex;
  flex-direction: column; /* Stack children vertically */
  align-items: center;    /* Center children horizontally */
  width: 100%;
}
```
### Draw an Apple
Open MS Paint and draw a picture of an apple. Or use the one in this github repository. Save it in `TheABCs/TheABCs-client/dist/images/` folder as `apple.png`. 

### Build Again and View

Now build the client application again using the same build command:
`npx esbuild ./jsx/index.jsx --bundle --outfile="./dist/bundle.js"`

Now view the index.html file again in a browser. If it's still open from last time, just hit the refresh button on the browser. You should see:

- The header from before
  - a logo displayed on the far left 
  - the title in the middle ("The ABC's")
  - another image to the right
- Left side navigation list with the items listed below. Each should change color has you hover over them with the mouse.
  - Introduction
  - A is for...
  - B is for...
  - C is for...
- A main content page that displays:
- "A is for..." as the title
- the drawing of an apple (`apple.png`)
- "A is for apple." below that in smaller font. All centered.

## Create Server
### Create Static File Server 
In windows, navigate to `TheABCs\TheABCs-server\` and make a new file called TheABCs-nodejs-server.js. Add the following to the file:
```
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8080;

const server = http.createServer(async (req, res) => {


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
```
### Deploy the React project to the server
In Windows, copy all of the files from `TheABCs\TheABCs-client\dist` into `TheABCs\TheABCs-server\static`. This is how you 'delpoy' the react applicaiton to the server. So when a web browser makes a request to the server it is delivered to the browser for display.

Start the server using this command: `node TheABCs-nodejs-server.js`. 

Open a new browser (Chrome or Edge) window and go to this url: `http://localhost:8080/`. You should see the appliction displayed with header, left hand nav, and content page to the right.

### Create API request handler
Modify the TheABCs-nodejs-server.js file by adding two code new code sctions. Each starts with the folllowing comment lines:
- temporary hard-coded json data
- API routing

```
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8080;

// ========================== START: temporary hard-coded json data =====================================
const data = [
	{pageId: 1, name: 'Introduction', pageImageLoc: './images/logo.png', pageText: 'This is the intro.' },
	{pageId: 2, name: 'A is for...', pageImageLoc: './images/apple.png', pageText: 'A is for apple.' },
	{pageId: 3, name: 'B is for...', pageImageLoc: './images/boat.png', pageText: 'B is for boat.' },
	{pageId: 4, name: 'C is for...', pageImageLoc: './images/cat.png', pageText: 'C is for cat.' }
];
// ========================== END: temporary hard-coded json data ======================================

const server = http.createServer(async (req, res) => {

	// ================================= START: API routing ==========================================

	const urlParts = req.url.split('/'); 

	if(urlParts[1] === 'api' && req.method === 'GET') {
		if(urlParts[2] === 'tableOfContents') {
			const tocList = data.map(({pageId, name}) => ({pageId, name}));
			
			res.writeHead(200, { 'Content-Type': 'application/json' });
			return res.end(JSON.stringify(tocList));
		}
		
		if(urlParts[2] === 'pagedata') {
			
			const recordId = parseInt(urlParts[3]) - 1;
			
			if(recordId >= 0 && recordId < data.length) {
			res.writeHead(200, { 'Content-Type': 'application/json' });
				console.log("Response: ", data[recordId])
				return res.end(JSON.stringify(data[recordId]));
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
```
### Draw a Boat and a Cat
Open MS Paint and draw a picutres of a boat and a cat. Or use the ones in this github repository. Save them in `TheABCs/TheABCs-client/dist/images/` folder as `boat.png` and `cat.png`. 

### Test the Table of Contents API
In an internet browser, go to the the link below and verify proper response.
- url: http://localhost:8080/api/tableOfContents
  - reponse: `[{"pageId":0,"name":"Introduction"},{"pageId":1,"name":"A is for..."},{"pageId":2,"name":"B is for..."},{"pageId":3,"name":"C is for..."}]`
- url: http://localhost:8080/api/pagedata/1
  - response: `{"pageId":0,"name":"Introduction","pageImageLoc":"./images/logo.png","pageText":"This is the intro."}`
- url: http://localhost:8080/api/pagedata/2
  - response: `{"pageId":1,"name":"A is for...","pageImageLoc":"./images/apple.png","pageText":"A is for apple."}`
- url: http://localhost:8080/api/pagedata/3
  - response: `{"pageId":2,"name":"B is for...","pageImageLoc":"./images/boat.png","pageText":"B is for boat."}`
- url: http://localhost:8080/api/pagedata/4
  - response: `{"pageId":3,"name":"C is for...","pageImageLoc":"./images/cat.png","pageText":"C is for cat."}`

## Add API calls to React Components
Go back to the client project jsx folder located here: `TheABCs\TheABCS-client\jsx`. The next few tasks will involve chnages to the .jsx files.

### Get table of contents data and display it
The LeftsideNav component will make an API call to the server we created when it is loaded. The navigation links will be based on the data returned from the table of contents API function.  
  

In the file LeftsideNav.jsx:
- add useState and useEffect to the react import statement
- add the code above the return statement to fecth data from the API 
- modify the html code in the return statement to base the values displayed on the data returned from the API  
  
The updated LeftsideNav.jsx source code is below.
```
import React, { useState, useEffect } from 'react';

function LeftsideNav() {

// ==================== START: fecth data from the API =========================

	const [tocEntries, setTocEntries] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

  useEffect(() => {
	// We define an async function inside the effect
	const fetchTocData = async () => {
	  try {
		setLoading(true);
		const response = await fetch(`/api/tableOfContents`);
		
		if (!response.ok) {
		  throw new Error('Page not found');
		}

		const data = await response.json();
		setTocEntries(data);
	  } catch (err) {
		setError(err.message);
	  } finally {
		setLoading(false);
	  }
	};

		fetchTocData();
	  }, []); 
	// ==================== END: fecth data from the API =========================
	
	  if (loading) return <p>Loading...</p>;
	  if (error) return <p>Error: {error}</p>;
  
	return (
		<nav className="sidebar">
		  <div className="sidebar-content">
			<ul className="nav-list">
			  {tocEntries.map((item) => (
				<li key={item.pageId} className="nav-item">
				  <a href="#" className="nav-link">
					<span className="nav-label">{item.name}</span>
				  </a>
				</li>
			  ))}
			</ul>
		  </div>
		</nav>
	);
}

export default LeftsideNav;
```
Notice the list of items displayed on the left now includes "B is for..." and "C is for...". You can also see the api call if you open up devloper tools in the browser and look at the network tab. There is a new request for "tableOfContents". This is the API call that returns the data that builds the left-hand navigation list.

### Show page 1 by default
In the file NavAndMainPane.jsx:
- Add page_id="1" as a property of LetterPage in NavAndMainPane.jsx.

```
import React from 'react';
import LeftsideNav from './LeftsideNav';
import LetterPage from './LetterPage';

function NavAndMainPane() {
	
	return (
	<div className="container">
		<LeftsideNav />
		<LetterPage page_id="1" />
	</div>
	);
}

export default NavAndMainPane;
```

### Get Letter Page Data and display it
In the file LetterPage.jsx:
- add useState and useEffect to the react import statement
- add {page_id} property as an input paramter to the LetterPage function.
- add the code above the return statement to fecth data from the API 
- modify the html code in the return statement to base the values displayed on the data returned from the API  
Make API call from the LetterPage component to retrieve page data from server API. 

```
import React, { useState, useEffect } from 'react';

function LetterPage({page_id}) {
	
	// ==================== START: fecth data from the API =========================
	const [page, setPage] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	
	useEffect(() => {
    // We define an async function inside the effect
		const fetchUser = async () => {
		  try {
			setLoading(true);
			//console.log("page_id", page_id);
			const response = await fetch(`/api/pagedata/${page_id}`);
			
			if (!response.ok) {
			  throw new Error('Page not found');
			}

			const data = await response.json();
			setPage(data);
		  } catch (err) {
			setError(err.message);
		  } finally {
			setLoading(false);
		  }
		};

		fetchUser();
	}, [page_id]); // The effect re-runs if pageId changes
	// ==================== END: fecth data from the API =========================

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
	
	return (
	  <div className="letter-page">
		<h1>{page.name}</h1>
		<img src={page.pageImageLoc} alt="Letter Image" />
		<p>{page.pageText}</p>
	  </div>
	);
}

export default LetterPage;
```
### Deploy the React project to the server and test
- Build: Build the client application just as before using `npx esbuild ./jsx/index.jsx --bundle --outfile="./dist/bundle.js"`. Make sure this command is run from the folder `TheABCs\TheABCs-client\`.
- Deploy: In Windows, copy bundle.js from `TheABCs\TheABCs-client\dist` into `TheABCs\TheABCs-server\static`. 
- if you need to restart the server do that as before using command `node TheABCs-nodejs-server.js`. This must be run from the the folder `TheABCs\TheABCs-server\`.
- In the internet browser, go to: http://localhost:8080/

## Enable Navigation
### Update NavAndMainPane Parent Component
In the file NavAndMainPane.jsx:
- add useState the react import statement
- Add activeTab state to track which navigation item is selected
- Add properties to LeftsideNav element to allow it to know activeTab state value and setActiveTab setter function to allow LeftsideNav component to set the value of the activeTab.
- change hardcoded page_id="1" to page_id={activeTab}
```
import React, {useState}  from 'react';
import LeftsideNav from './LeftsideNav';
import LetterPage from './LetterPage';

function NavAndMainPane() {
	
	const [activeTab, setActiveTab] = useState(1);
	
	return (
	<div className="container">
		<LeftsideNav updateActiveTab={setActiveTab} activeTabId={activeTab} />
		<LetterPage page_id={activeTab} />
	</div>
	);
}

export default NavAndMainPane;
```
### Update LeftsideNav Component
In the file LeftsideNav.jsx:
- add {updateActiveTab, activeTabId} as properties to function LeftsideNav
- change the <a> element in the return statment to include onClick fucntion and dynamic className

```
import React, { useState, useEffect } from 'react';

function LeftsideNav({updateActiveTab, activeTabId}) {

// ==================== START: fecth data from the API =========================

	const [tocEntries, setTocEntries] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

  useEffect(() => {
	// We define an async function inside the effect
	const fetchTocData = async () => {
	  try {
		setLoading(true);
		const response = await fetch(`/api/tableOfContents`);
		
		if (!response.ok) {
		  throw new Error('Page not found');
		}

		const data = await response.json();
		setTocEntries(data);
	  } catch (err) {
		setError(err.message);
	  } finally {
		setLoading(false);
	  }
	};

		fetchTocData();
	  }, []); 
	// ==================== END: fecth data from the API =========================
	
	  if (loading) return <p>Loading...</p>;
	  if (error) return <p>Error: {error}</p>;
  
	return (
		<nav className="sidebar">
		  <div className="sidebar-content">
			<ul className="nav-list">
			  {tocEntries.map((item) => (
				<li key={item.pageId} className="nav-item">
				  <a onClick={() => updateActiveTab(item.pageId)} href="#" className={`nav-link ${item.pageId === activeTabId ? 'active' : ''}`}>
					<span className="nav-label">{item.name}</span>
				  </a>
				</li>
			  ))}
			</ul>
		  </div>
		</nav>
	);
}

export default LeftsideNav;
```
### Deploy the React project to the server and test

- Build: Build the client application just as before using `npx esbuild ./jsx/index.jsx --bundle --outfile="./dist/bundle.js"`. Make sure this command is run from the folder `TheABCs\TheABCs-client\`.
- Deploy: In Windows, copy bundle.js from `TheABCs\TheABCs-client\dist` into `TheABCs\TheABCs-server\static`. 
- if you need to restart the server do that as before using command `node TheABCs-nodejs-server.js`. This must be run from the the folder `TheABCs\TheABCs-server\`.
- In the internet browser, go to: http://localhost:8080/

## Setup Database
Launch pgAdmin application installed with PostGreSQL. Enter password if prompted. In the left-side navigation tree, go to Servers > PostgreSQL > Databases. Right click on Databases and select `create > Database`. In the Database field type in TheABCs-Database. Leave OID blank. Leave Onwer as postgres. Add comment if you want to.  

Right click on TheABCs-Database and select `Query Tool`. In the text editing window add this statement to create the Pages table:
```
CREATE TABLE Pages (
    pageId SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    pageImageLoc TEXT,
    pageText TEXT
);
```
Find the "play" button. If you hover over it, it will show `exectue script`. Click it. The table is  created. Delete the CREATE TABLE command and replace it with this select statement: `Select * from Pages`. You shoule see an empty table displayed in the "Data Ouput" window below. Add the following rows to this table using the UI of this view. The rows should look like this:

```
"pageid"	"name"       	"pageimageloc"      	"pagetext"
1       	"Introduction"	"./images/logo.png" 	"This is the intro."
2       	"A is for..."	"./images/apple.png"	"A is for apple."
3       	"B is for..."	"./images/boat.png" 	"B is for boat."
4       	"C is for..."	"./images/cat.png"  	"C is for cat."
```

## Connect Server to Database
### Add DB connection string to .env file
Create a file called `.env` in `TheABCs\TheABCs-server\`. Add this line of text to it: `DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@localhost:5432/TheABCs-Database`. But instead of YOUR_PASSWORD, you need to use the password you used when setting up the PostGreSQL database server.

### Create db.js
Create a file called `db.js` in `TheABCs\TheABCs-server\`. Add the following code to it:
```
import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
```

### Install dotenv and pg
Open a terminal in `TheABCs\TheABCs-server\`. Type the following command: `npm install dotenv pg`.

### Add module information to pckage.json
We need to add this since we are using import statments that are part of the more modern ECMAScript Modules (ESM) instead of the older CommonJS (CJS) method. We didn't need this until installing dotenv and pg. That installation added the package.json file and node_modules folder. Until then we were only importing from packages that are included in the node.js installation. 

In the folder `TheABCs\TheABCs-server\` open the file package.json and make the following chagnes:
- add name, version, and type above dependencies
```
{
  "name": "theabcs-server",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "dotenv": "^17.2.3",
    "pg": "^8.16.3"
  }
}

```

### Add Database Queries to Server API
In the folder `TheABCs\TheABCs-server\` open the file TheABCs-nodejs-server.js and make the following chagnes:
- add import statement to include db.js
- remove "temporary hard-coded json data" section
- modify the code in the API routing section to do database queries instead of using the temporary hardcoded json data for the table of contents. You will need to map the lowercase database column names to the camelCase names used in the rest of the application.
- Remove the "-1" in this statement: `const recordId = parseInt(urlParts[3]) - 1;`. It was needed to deal with the index of the arrary starting at 0. The database rows start with 1.
- modify the code in the API routing section to do database queries instead of using the temporary hardcoded json data for the letter page data. The code should look like this:

```
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
```
### Deploy the React project to the server and test

- Build: Build the client application just as before using `npx esbuild ./jsx/index.jsx --bundle --outfile="./dist/bundle.js"`. Make sure this command is run from the folder `TheABCs\TheABCs-client\`.
- Deploy: In Windows, copy bundle.js from `TheABCs\TheABCs-client\dist` into `TheABCs\TheABCs-server\static`. 
- if you need to restart the server do that as before using command `node TheABCs-nodejs-server.js`. This must be run from the the folder `TheABCs\TheABCs-server\`.
- In the internet browser, go to: http://localhost:8080/

## Create Git and GitHub repositories
### Create .gitignore file
In the parent poject folder `TheABCs\` create a file called .gitignore. Add the following lines:
```
node_modules/
static/
dist/bundle.js
.env
```
### Create repository in GitHub
- go to https://github.com/ and log in
- create no repository as public and NO README file
- find the url for the repository under the green code button. It should look something like this: `https://github.com/[your-user-id]/TheABCs.git`. Copy it.

### Initilize local git repo
- open up a terminal in the parent poject folder `TheABCs\`
- Create local git repo: In the terminal type: `git init -b main`
- Check file list status: In the terminal type: `git status`
- Add files identified in previous step to the repo: In the terminal type: `git add -A`
- Check file list status: In the terminal type: `git status`
- Create first snapshot: In the terminal type: `git commit -m "Initial commit"`

### Connect local git to github
- link local git repo to GitHub repo: `git remote add origin https://github.com/[your-user-id]/TheABCs.git`
  - This https address is an example. You need to use the one copied from the github website in the previous section.
- push changes to github: `git push -u origin main`
NOTE: from this point foward, to checkin the latest changes to github, just use this command: `git push`
