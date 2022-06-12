import React from "react";

export default function useApi(apiFunc) {
  const [{ data, error, loading }, dispatch] = React.useReducer(
    (s, a) => ({ ...s, ...a }),
    {
      data: null,
      error: null,
      loading: null,
    }
  );

  const request = async (...args) => {
    dispatch({ loading: true });
    const response = await apiFunc(...args);
    let error = "";
    if (!response.ok) {
      console.log(response.status);
      switch (response.problem) {
        case "CLIENT_ERROR":
          error = response.data?.detail || response?.error?.message;
          break;
        case "NETWORK_ERROR":
          error = "Network error, Please check your connection.";
          break;
        case "SERVER_ERROR":
          error = "There was a problem in server please try again later.";
          break;
        default:
          error =
            "An Unexpected error has ocured, The status has been reported.";
          break;
      }
    }
    dispatch({
      error: error,
      data: response.ok ? response.data : null,
      loading: false,
    });
    return response;
  };

  function setError(error) {
    dispatch({
      error,
    });
  }

  return { data, error, loading, request, setError };
}
