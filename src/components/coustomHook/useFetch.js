import { useEffect, useState } from "react";

function useFetch(url) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchapi = async () => {
      try {
        let response = await fetch(url);

        if (response.ok) {
          let data = await response.json();
          setProducts(data);
        } else {
          throw new Error("Data Not Found");
        }
      } catch (error) {
        setError(error.message);
       }
       finally {
        setIsLoading(false);
      }
    };

    fetchapi(); // MUST BE CALLED
  }, [url]);

  return { products, error, isLoading };
}

export default useFetch;
