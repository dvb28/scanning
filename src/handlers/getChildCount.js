const { fetcherGet } = require("@/utils/fetcher");

//   Get Child Folders
const getChildCount = async (parentId, route) => {
  
  // Data
  const response = await fetcherGet('/folders/get-child-count', { parentId }, route);

  //  Return
  return response.data;
};

export default getChildCount;
