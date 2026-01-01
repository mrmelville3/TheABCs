# TheABCs
A full stack web app with client, server, and database . It's an alphabet book. Tech stack is similar to PERN (PostGreSQL, Express, React, Node.js) minus Express. There is also no React framework. One of the goals of this project was to use as few node installs as possible. The node_modules folder for the client app contians three folders: react, react-dom, and scheduler. Scheduler is part of the react/react-dom installation.

Project goals:
- avoid using a framework if possible (node.js, vue, vite, etc.)
- keep npm installs to a minimum
- use typescript
- create node.js server
- use database
- don't use VSCode or any IDE (do it the hard way to learn the benefits of an IDE)
  - use notepad++, Windows PowerShell terminal, Chrome browser, Windows Explorer

### Setup Folder Structure For client and server projects
Create folder for project (TheABCs). Inside that folder create two sub folders. One folder for the server application (TheABCs-server), one folder for the client (TheABCs-client). Continue and mimic this folder structure:

- TheABCs (parent project folder)
  - TheABCs-client
    - dist (output of the client build)
      - images (contains image files for all `<img />` tags)
    - tsx (for react components)
  - TheABCs-server
    - static (for static files)
  - README.md (this file)

## Create Basic Front End in react
### Install react
Navigate to `TheABCs > TheABCs-client`. Right click and select 'open in terminal'. Type command:
`npm install react react-dom`. This will download the necessary react node packages from the npm node package repository and create the following files and folders in `TheABCs > TheABCs-client`: 
- package.json
- package-lock.json
- node_modules
  - react
  - react-dom
  - scheduler

### Make React Base project

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

const root = createRoot(document.getElementById('root')!);
root.render(
  <div>
    <AbcHeader />
  </div>
);
```
### Create App UI Header
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
Now build the application with the following command in the powershell window. This will be the client application build command throughout the project.
`npx esbuild ./tsx/index.tsx --bundle --outfile="./dist/bundle.js"`

Let's look at what we've done! In windows explorer, navigate to `TheABCs > TheABCs-client > dist` and double click on index.html. Assuming when you double click the index.html, it opens in an internet browser like Chrome or Edge, you should see a webpage with a header at the top that includes:
- a logo displayed on the far left
- the title in the middle ("The ABC's")
- another image to the right

### Create navigation and display
In order to do this you will need a parent component and two child components. One child will be the navigation menu and the other will be the main display pane for content. The navigation clicks will direct the parent component to upate the content displayed in the main display pane.

In `TheABCs > TheABCs-client > tsx`, create NavAndMainPane.tsx file with the following contents:
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
In `TheABCs > TheABCs-client > tsx`, create LeftsideNav.tsx file with the following contents:
```
import React from 'react';

function LeftsideNav() {

	return (
		<nav className="sidebar">
		  <div className="sidebar-content">
			<ul className="nav-list">
			  <li className="nav-item"><a href="#" className="nav-link"><span className="nav-label">Introduction</span></a></li>
			  <li className="nav-item"><a href="#" className="nav-link"><span className="nav-label">A is for...</span></a></li>
			  <li className="nav-item"><a href="#" className="nav-link"><span className="nav-label">B is for...</span></a></li>
			  <li className="nav-item"><a href="#" className="nav-link"><span className="nav-label">C is for...</span></a></li>
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
In `TheABCs > TheABCs-client > tsx`, create LetterPage.tsx file with the following contents:
```
import React from 'react';

function LetterPage() {
	
	return (
	  <div className="letter-page">
		<h1>A is for...</h1>
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
Now build the client application again using the same build command:
`npx esbuild ./tsx/index.tsx --bundle --outfile="./dist/bundle.js"`

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
- A main content page that displays "A is for..." as the title and "A is for apple." below that in smaller font. All centered.

## Create Server
### Create Static File Server 
### Create API

## Add API calls to React Components
### Get table of contents data and display it
### Get Letter Page Data and display it

## Enable Navigation
### Update NavAndMainPane
### Update LeftsideNav
### Update LetterPage

## Setup Database

## Connect Server to Database


