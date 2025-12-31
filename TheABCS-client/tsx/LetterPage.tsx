import React, { useState, useEffect } from 'react';

interface LetterPageProps {
	page_id: number;
}

interface PageData {
	page_id: number;
	name: string;
	page_image_loc: string;
	page_teext: string;
}

function LetterPage({page_id}: LetterPageProps) {
	
	
  // console.log('page id', page_id);

  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

console.log("name: ", page);
	return (
	  <div className="letter-page">
		<h1>{page.name}</h1>
		<img src={page.page_image_loc} alt="Letter Image" />
		<p>{page.page_teext}</p>
	  </div>
	);
}

export default LetterPage;