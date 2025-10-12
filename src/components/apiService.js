// File: src/apiService.js
const API_URL =
  "https://script.google.com/macros/s/AKfycbzmOeAjswP3abz_iwMUORtyIuypnZgcB_043i8i3fztIjWfU-gU_2YO18M5QXhsGA9S3w/exec"; // Replace with your own deployed Apps Script URL

/**
 * Handles all communication with the Apps Script backend (UNSECURED).
 * @param {object} payload - The data to send in the body.
 * @param {string} method - 'GET' or 'POST'.
 * @returns {Promise<object>} - The parsed JSON response from the server.
 */
export const apiCall = async (payload = {}, method = "POST") => {
  const isPost = method.toUpperCase() === "POST";
  
  let url = API_URL;
  let options = {
    method: method,
    headers: {},
  };

  if (isPost) {
    options.body = JSON.stringify(payload);
  } else {
    // GET requests have no body
  }

  const res = await fetch(url, options);
  const text = await res.text();

  let result;
  try {
    result = JSON.parse(text);
  } catch (error) {
    console.error("API response text:", text);
    throw new Error("Invalid JSON response from server.");
  }

  if (!result.success) {
    throw new Error(result.error || "Operation failed due to an unknown server error.");
  }

  return result;
};