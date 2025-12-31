import React, {useState} from 'react';
import LeftsideNav from './LeftsideNav';
import LetterPage, { PageData } from './LetterPage';

function NavAndMainPane() {
	
	// NEXT: get this from a new api for table of contents. doon't need pageImageLoc and pageText here.
	// shoudl not use PageData. Should be TableOfContnets or some other new object/schema/type.
	const pagesData: PageData[] =  [
		{pageId: 0, name: 'Introduction', pageImageLoc: '', pageText: '' },
		{pageId: 1, name: 'A is for...', pageImageLoc: '', pageText: '' },
		{pageId: 2, name: 'B is for...', pageImageLoc: '', pageText: '' },
		{pageId: 3, name: 'C is for...', pageImageLoc: '', pageText: '' },
	];
	
	const [activeTab, setActiveTab] = useState(0);
	
	return (
	<div className="container">
		<LeftsideNav updateActiveTab={setActiveTab} activeTabId={activeTab} navItems={pagesData} />
		<LetterPage pageId={activeTab} />
	</div>
	);
}

export default NavAndMainPane;