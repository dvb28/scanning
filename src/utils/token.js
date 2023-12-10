import jwt from 'jsonwebtoken';

// Check token expired
export const isTokenExpired = async (token) => {
  // Decoded Token
  const decodeToken = jwt.decode(token);

  // Get Current Time
  const currentTime = Date.now() / 1000;

  //   Check
  if (decodeToken?.exp === undefined) {
    return true;
  } else {
    // Check expired time
    return decodeToken?.exp < currentTime;
  }
};
