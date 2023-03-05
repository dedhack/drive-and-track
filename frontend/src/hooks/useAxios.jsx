import { useState, useEffect } from "react";
import axios from "axios";
import { makeUseAxios } from "axios-hooks";
// take note of the idea to use options here
// const options = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

// const useAxios = makeUseAxios({
//   axios: axios.create({
//     baseURL: "http://localhost:5001",
//   }),
// });

const useAxios = (url, options = {}, shouldFetch = true) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios(`http://localhost:5001/${url}`, options);
      setData(response.data);
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useAxios;
