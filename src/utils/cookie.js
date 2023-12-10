import Cookies from "js-cookie";

// Set Cookie with expired time
export const setCookie = async (key, data, expires = 300) => {
     // Data to string
     const strData = JSON.stringify(data);

     // Create Expiration Date
     const expirationDate = new Date();

     // Create Expiration Time
     expirationDate.setTime(expirationDate.getTime() + expires * 60 * 1000);

     // Set Token and save to Cookie
     Cookies.set(key, strData, { expires: expirationDate });
}

// Get Cookie Data
export const getCookie = (key) => {
     // Get Cookie
     const result  = Cookies.get(key);

     // Check result
     if(result && result !== 'undefined') {
          // Parse
          const parseResult = JSON.parse(result);

          // Return
          return parseResult;
     } else {
          return null;
     }
};

// Get Cookie Data
export const deleteCookie = (key) => Cookies.remove(key);