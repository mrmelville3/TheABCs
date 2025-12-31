import React, { useState, useEffect } from 'react';
import { PageData } from './LetterPage';

interface tocEntry {
	pageId: number;
	name: string;
}

interface LeftsideNavProps {
		updateActiveTab: React.Dispatch<React.SetStateAction<number>>;
		activeTabId: number;
	}
	
function LeftsideNav({updateActiveTab, activeTabId}: LeftsideNavProps) {

  const [tocEntries, setTocEntries] = useState<tocEntry[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []); // The effect re-runs if pageId changes

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