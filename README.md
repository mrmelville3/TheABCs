# TheABCs
A full stackweb app with client, server, and database . It's an alphabet book. Tech stack is similar to PERN (PostGreSQL, Express, React, Node.js) minus Express. There is also no React framework. One of the goals of this project was to use as few node installs as possible. The node_modules folder for the client app contians three folders: react, react-dom, and scheduler. Scheduler is part of the react/react-dom installation.

Project goals:
- avoid using a framework if possible (node.js, vue, vite, etc.)
- keep npm installs to a minimum
- use typescript
- create node.js server
- use database
- don't use VSCode or any IDE (do it the hard way to learn the benefits of an IDE)
  - use notepad++, Windows PowerShell terminal, Chrome browser, Windows Explorer

## steps
### 1) Setup Folder Structure
Create folder for project (TheABCs). Inside that folder create two sub folders. One folder for the server application (TheABCs-server), one folder for the client (TheABCs-client). Continue and mimic this folder structure:

- TheABCs (parent project folder)
  - TheABCs-client
    - dist (output of the client build)
      - images (contains image files for all `<img />` tags)
    - tsx (for react components)
  - TheABCs-server
    - static (for static files)
  - README.md (this file)

### 2) Install react
Navigate to `TheABCs > TheABCs-client`. Right click and select 'open in terminal'. Type command:
`npm install react react-dom`. This will create the following files and folder in `TheABCs > TheABCs-client`: 
- package.json
- package-lock.json
- node_modules
  - react
  - react-dom
  - scheduler

### 3) Make React Base project

In `TheABCs > TheABCs-client > dist`, make index.html file with the following contents:

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
In `TheABCs > TheABCs-client > tsx`, make index.tsx file with the following contents:

```
import React from 'react';
import { createRoot } from 'react-dom/client';
import AbcHeader from './AbcHeader';
import NavAndMainPane from './NavAndMainPane';

const root = createRoot(document.getElementById('root')!);
root.render(
  <div>
    <AbcHeader />
  </div>
);
```
### 4) Create App UI Header
In `TheABCs > TheABCs-client > tsx`, create AbcHeader.tsx file with the following contents:
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
Create and add images to `TheABCs > TheABCs-client > dist > images` folder needed for header `<img />` tags.
- logo.png
- user.png

In `TheABCs > TheABCs-client > dist`, create styles.css and add styles for the header as shown below:

```
* { color: #4B5564; }

.app-header {
  display: flex;
  justify-content: space-between; /* This creates the left/middle/right gap */
  align-items: center;           /* Centers items vertically */
  border-bottom: 1px solid #4B5564;
}
```
Now build the application to view the header with the following command in the powershell window:
`npx esbuild ./tsx/index.tsx --bundle --outfile="./dist/bundle.js"`

In windows explorer, navigate to `TheABCs > TheABCs-client > dist` and double click on index.html. Assuming when you double click the index.html, it opens in an internet browser like Chrome or Edge, you should see a webpage with a header at the top that includes:
- a logo displayed on the far left
- the title in the middle ("The ABC's")
- another image to the right

### 5) 


## build process
esbuild produces bundle.js
copy bundle.js to static folder in server project

## database
PostGreSQL
