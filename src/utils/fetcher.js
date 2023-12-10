import { getCookie } from "./cookie";

// Server IP
const IP = 'localhost';

// Server Port
const port = '2820';

// Base Url
const baseUrl = `http://${IP}:${port}`;

// Fetcher
const fetcher = async (response, route = null) => {
     // Get Status
     const status = response.status;

     // Check and change error route
     route && typeof route == 'function' && status !== 200 && route(`/${status}`);

     // Fetch response data
     const data = await response.json();

     // Return Data
     return { status: response.status, data };
}

// Custom Fetcher
export const fetcherPost = async (url, reqData, route = null) => {
     // Token
     const accessToken = getCookie('token')?.accessToken;

     // Create Fetch
     const response = await fetch(`${baseUrl}${url}`, {
          method: "POST",
          headers: {
               'Authorization': `Bearer ${accessToken}`,
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(reqData)
     });

     // Return Fetcher
     return fetcher(response, route);
}

// Fetcher Get
export const fetcherGet = async (url, params = null, route = null) => {
     // String params
     const strParams = params && Object.keys(params).length > 0 ? Object.keys(params).map(key => `${key}=${params[key]}`).join('&') : null;

     // Token
     const accessToken = getCookie('token')?.accessToken;

     // Fetch get
     const response = await fetch(`${baseUrl}${url}${strParams ? `?${strParams}` : ''}`, {
          method: "GET",
          headers: {
               'Authorization': `Bearer ${accessToken}`,
               'Content-Type': 'application/json'
          }
     });

     // Return Fetcher
     return fetcher(response, route);
};

// Default Fetcher
export const fetcherDelete = async (url, params = null, route = null) => {
     // String params
     const strParams = params ? Object.keys(params).map(key => `${key}=${params[key]}`).join('&') : null;

     // Token
     const accessToken = getCookie('token')?.accessToken;

     // Create Fetch
     const response = await fetch(
          `${baseUrl}${url}${strParams ? `?${strParams}` : ''}`, 
          {
               method: "DELETE",
               headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
               }
          }
     );

     // Return Fetcher
     return fetcher(response, route);
};