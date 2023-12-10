import ScanningContext from "./context";
import React from "react";
import getStatistical from "@/handlers/getStatistical";
import { getCookie } from "@/utils/cookie";

export default function ScanningProvider({ children }) {
  // Statistical Data Context
  const [statisticalData, setStatisticalData] = React.useState(null);

  // Use Effect
  React.useEffect(() => {
    // Get Statistical Data
    const fetchStatis = async () => {
      // Token
      const token = getCookie('token');

      // User Data
      const user = getCookie('userData');

      // Check Login
      if(token && user) {
        // Response
        const data = await getStatistical('/statistical/get-statistical');

        //  Set Statis Data
        setStatisticalData(data);
      }
    }

    // Call getStatistical
    fetchStatis();
  }, []);


  // Shared Data
  const sharedData = {
    statis: statisticalData,
    setStatisticalData: setStatisticalData,
  }

  // Render
  return (
    <ScanningContext.Provider value={sharedData}>
      {children}
    </ScanningContext.Provider>
  );
}