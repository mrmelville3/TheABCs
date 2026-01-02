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