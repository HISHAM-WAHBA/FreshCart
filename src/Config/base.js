const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const API_CONFIG = {
  baseURL: configuredBaseUrl || "/api/v1",
};

// Static demo mode is the default, so the project works on Vercel with no backend.
// Set VITE_API_BASE_URL to a real API URL to switch back to axios.
export const USE_MOCK_DATA =
  import.meta.env.VITE_USE_MOCK_DATA !== "false" && !configuredBaseUrl;
