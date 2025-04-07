import axios from "axios";

// Replace with your actual BASE_URL
export const API = "https://amme-api-pied.vercel.app/api";

// Default timeout
axios.defaults.timeout = 15000;

// Token handling via localStorage
// const getToken = () => {
//   const storedToken = localStorage.getItem("AUTH_TOKEN");
//   return storedToken ? JSON.parse(storedToken) : null;
// };

const errorHandling = {
  validateStatus: function (status) {
    return status >= 200 && status < 501;
  },
};

export const statusMessage = {
  200: "Success",
  400: "Invalid request format.",
  401: "Invalid API Key.",
  403: "The request is forbidden.",
  404: "The specified resource could not be found.",
  503: "We're temporarily offline for maintenance. Please try again later.",
};

// Toast fallback
export const Toast = (message = "") => {
  alert(message); // Replace with a proper toast library if needed
};

// POST request
export const POST = async (route, body = {}, onSuccess = () => {}, onError = () => {}, onFail = () => {
  Toast("Check Network, Try Again.");
}) => {
//   const token = getToken();
  try {
    const res = await axios({
      method: "POST",
      url: `${API}${route}`,
      data: body,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token?.access_token}`,
        Prefer: "code=200",
      },
      ...errorHandling,
    });

    if (res?.status === 200) {
      onSuccess(res?.data);
    } else {
      onError(res.data);
    }
  } catch (error) {
    console.error(error);
    onFail({ data: null, msg: "Network Error", status: "error" });
  }
};

// PATCH request
export const PATCH = async (route, body = {}, onSuccess = () => {}, onError = () => {}, onFail = () => {
  Toast("Check Network, Try Again.");
}) => {
  const token = getToken();
  try {
    const res = await axios({
      method: "PATCH",
      url: `${API}${route}`,
      data: body,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token?.access_token}`,
      },
      ...errorHandling,
    });

    if (res?.status === 200) {
      onSuccess(res?.data);
    } else {
      onError(res.data);
    }
  } catch (error) {
    console.error(error);
    onFail({ data: null, msg: "Network Error", status: "error" });
  }
};

// GET request
export const GET = async (route, onSuccess = () => {}, onError = () => {}, onFail = () => {
  Toast("Check Network, Try Again.");
}) => {
  const token = getToken();
  try {
    const res = await axios({
      method: "GET",
      url: `${API}${route}`,
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
        Accept: "application/json",
        Prefer: "code=200",
      },
      ...errorHandling,
    });

    if (res?.status === 200) {
      onSuccess(res?.data);
    } else {
      onSuccess(res?.data);
    }
  } catch (error) {
    console.error(error);
    onFail({ data: null, msg: "Network Error", status: "error" });
  }
};

// POST with token (custom header)
export const POST_WITH_TOKEN = async (route, body = {}, onSuccess = () => {}, onError = () => {}, onFail = () => {
  Toast("Check Network, Try Again.");
}, header = {}) => {
  const token = getToken();
  try {
    const res = await axios({
      method: "POST",
      url: `${API}${route}`,
      data: body,
      headers: {
        Authorization: token?.access_token || "",
        "Content-Type": "application/json",
        ...header,
      },
      ...errorHandling,
    });

    if (
      res?.data?.status === 200 ||
      res?.data?.status === true ||
      res?.status === 200
    ) {
      onSuccess(res?.data);
    } else {
      onError(res);
    }
  } catch (error) {
    console.error(error);
    onFail({ data: null, msg: "Network Error", status: "error" });
  }
};

// GET with token
export const GET_WITH_TOKEN = async (route, onSuccess = () => {}, onError = () => {}, onFail = () => {
  Toast("Something went wrong. Please try again.");
}) => {
  const token = getToken();
  try {
    const response = await axios({
      method: "GET",
      url: `${API}${route}`,
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
      },
    });

    if (response?.status === 200) {
      onSuccess(response?.data);
      return response?.data;
    } else {
      onError(response);
      return response;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        Toast("Request timed out. Please try again.");
      } else if (error.response?.status === 502) {
        Toast("Bad Gateway. Please try again.");
      } else {
        Toast("Network Error. Please check your connection.");
      }
      onError(error);
    } else {
      onFail({ data: null, msg: "Unknown Error", status: "error", error });
    }
    return { data: null, msg: "Network Error", status: "error" };
  }
};

// DELETE request
export const DELETE = async (route, onSuccess = () => {}, onError = () => {}, onFail = () => {}) => {
  const token = getToken();
  try {
    const res = await axios({
      method: "DELETE",
      url: `${API}${route}`,
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
      },
    });

    if (res?.status === 204) {
      onSuccess(res?.data);
    } else {
      onError(res);
    }
  } catch (error) {
    console.error(error);
    onFail({ data: null, msg: "Network Error", status: "error", error });
  }
};