const { fetcherGet } = require("@/utils/fetcher");

// Get Statistical Data
const getStatistical = async (route) => {
  // Response
  const response = fetcherGet('/statistical/get-statistical', {}, route);

  //  Set Statis Data
  return (await response).data;
};

export default getStatistical;
