import React from 'react';
import { PageData } from './LetterPage';

    interface LeftsideNavProps {
		updateActiveTab: React.Dispatch<React.SetStateAction<number>>;
		activeTabId: number;
		navItems: PageData[];
	}
	
function LeftsideNav({updateActiveTab, activeTabId, navItems}: LeftsideNavProps) {
	
	return (
		<nav className="sidebar">
		  <div className="sidebar-content">
			<ul className="nav-list">
			  {navItems.map((item) => (
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