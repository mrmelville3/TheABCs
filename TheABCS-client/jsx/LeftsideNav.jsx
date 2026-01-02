import React, { useState, useEffect } from 'react';

function LeftsideNav({updateActiveTab, activeTabId}) {

// ==================== START: fetch data from the API =========================

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
	// ==================== END: fetch data from the API =========================
	
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