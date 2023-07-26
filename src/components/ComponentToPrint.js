import React from "react";
//import Dashboard from "./Dashboard";
import DownloadDashboard from "./DownloadDashboard";


export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div ref={ref}><DownloadDashboard />
      </div>
    );
  });