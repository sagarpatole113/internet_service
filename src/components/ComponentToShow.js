import React from "react";
import Dashboard from "./Dashboard";


export const ComponentToShow = React.forwardRef((props, ref) => {
    return (
      <div ref={ref}><Dashboard /></div>
    );
  });