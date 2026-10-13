
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStart,
  fetchSuccess,
  fetchError,
} from "./redux/actions";

function App() {
  const { loading, data, error } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLorem = async () => {
      dispatch(fetchStart());

      try {
        const response = await fetch(
          "https://api.lorem.com/ipsum"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Lorem Ipsum data");
        }

        const result = await response.json();
        dispatch(fetchSuccess(result));
      } catch (err) {
        dispatch(fetchError(err.message));
      }
    };

    fetchLorem();
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.body}</p>
    </div>
  );
}

export default App;
