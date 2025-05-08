import { useState, useCallback } from "react";

/**
 * Custom hook for handling async operations with loading and error states
 * @param {Function} asyncFunction - The async function to execute
 * @returns {Object} An object containing:
 *   - execute: Function to execute the async operation
 *   - data: The result of the async operation
 *   - loading: Boolean indicating if the operation is in progress
 *   - error: Any error that occurred during the operation
 *   - setError: Function to manually set the error state
 */
const useAsync = (asyncFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const response = await asyncFunction(...args);
        setData(response);
        return response;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  return { execute, data, loading, error, setError };
};

export default useAsync;
