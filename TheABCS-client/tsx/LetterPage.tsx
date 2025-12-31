import React, { useState, useEffect } from 'react';

interface LetterPageProps {
	pageId: number;
}

interface PageData {
	pageId: number;
	name: string;
	pageImageLoc: string;
	pageText: string;
}

function LetterPage({pageId}: LetterPageProps) {
	
	
  console.log('page id', pageId);
  

  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // We define an async function inside the effect
    const fetchUser = async () => {
      try {
        setLoading(true);
		console.log("pageId", pageId);
        const response = await fetch(`/api/pagedata/${pageId}`);
        
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
  }, [pageId]); // The effect re-runs if pageId changes

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