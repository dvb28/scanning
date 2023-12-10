const { fetcherGet } = require("@/utils/fetcher");
import { getCookie } from '@/utils/cookie';

//   Get Child Folders
const getChildFolders = async (parentId, route) => {
  // Get User Id
  const userId = getCookie('userData')?.userId;
  
  // Data
  const response = await fetcherGet('/folders/get-child-folders', { userId, parentId }, route);

  //  Return
  return response.data;
};

export default getChildFolders;
