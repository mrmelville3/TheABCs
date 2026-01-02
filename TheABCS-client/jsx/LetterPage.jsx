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