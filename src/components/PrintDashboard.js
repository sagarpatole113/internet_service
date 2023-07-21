import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { ComponentToPrint } from './ComponentToPrint';
import { Button } from 'reactstrap';

export const PrintDashboard = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <Button onClick={handlePrint}>Print</Button>
      <ComponentToPrint ref={componentRef} />
    </div>
  );
};