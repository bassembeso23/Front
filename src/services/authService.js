const API_BASE_URL = "http://localhost:8000/api";

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw {
      response: {
        data: {
          message: data.detail || data.message || "An error occurred",
          errors: data.errors || null,
        },
      },
    };
  }
  return { data };
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};
