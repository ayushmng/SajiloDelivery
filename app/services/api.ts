import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://mybaserurl.com/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const submitRequestToApi = (data) => {
  //Note: Sorry couldn't find free source API to make a GET and POST request for me. Also, couldn't allocate much time to do backed using Firebase,
  // as I haven't tried backend using Firebase earlier, so didn't get much time to research and try them all from scratch. My sincere apologies on that!!
};

export const getRequest = async <T>(url: string, params?: any): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url, { params });
    return response.data;
  } catch (error: any) {
    console.error("GET request error:", error.message);
    throw error;
  }
};

export const postRequest = async <T>(url: string, data?: any): Promise<T> => {
  try {
    const response = await apiClient.post<T>(url, data);
    return response.data;
  } catch (error: any) {
    console.error("POST request error:", error.message);
    throw error;
  }
};

export default apiClient;
