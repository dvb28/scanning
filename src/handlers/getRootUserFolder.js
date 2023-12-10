const { fetcherGet } = require("@/utils/fetcher");
import { getCookie } from '@/utils/cookie';

//   Get Child Folders
const getRootUserFolder = async (route) => {
  // Get User Id
  const userId = getCookie('userData')?.userId;
  
  // Data
  const response = await fetcherGet('/folders/get-folder', { userId, id: 0 }, route);

  //  Return
  return response.data;
};

export default getRootUserFolder;
