import React from "react";
import Dashboard from "./Dashboard";


export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div ref={ref}><Dashboard/></div>
    );
  });