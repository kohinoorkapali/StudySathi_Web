import { useState, useCallback } from "react";
import { apiRequest } from "../utils/api";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const callApi = useCallback(
    async (method, endpoint, data = null) => {
      setLoading(true);
      setError("");

      try {
        const res = await apiRequest(method, endpoint, { data });
        setLoading(false);
        return res;
      } catch (err) {
        setLoading(false);
        setError(err.message);
        throw err;
      }
    },
    [] // no dependencies → function is stable
  );

  return { loading, error, callApi };
};
