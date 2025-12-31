import React from 'react';

function AbcHeader() {
	
	function showAlertBox() {
		alert('Alert!');
	}
	
	
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