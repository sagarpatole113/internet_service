import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

const EmployeeRow = ({ emp, onUpdate }) => {
  const [formattedRequestDate, setFormattedRequestDate] = useState("");
  const [formattedApprovalDate, setFormattedApprovalDate] = useState("");

  useEffect(() => {
    if (emp) {
      const formattedRequest = formatDate(emp.requested_Date);
      setFormattedRequestDate(formattedRequest);

      const formattedApproval = formatDate(emp.approval_Date);
      setFormattedApprovalDate(formattedApproval);
    }
  }, [emp]);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = dateObj.toLocaleString(undefined, options);
    return formattedDate;
  };

  return (
    <tr>
      <td>{emp.emp_Id}</td>
      <td>{emp.first_Name}</td>
      <td>{emp.last_Name}</td>
      <td>{emp.email}</td>
      <td>{emp.phone}</td>
      <td>{emp.department}</td>
      <td>{emp.position}</td>
      <td>{emp.status}</td>
      <td>{formattedRequestDate}</td>
      <td>{formattedApprovalDate}</td>
      <td>{emp.remark}</td>
      <td>
        <Button
         
          className="btn btn-primary"
          onClick={() => onUpdate(emp.id)}
        >
          Update
        </Button>
      </td>
    </tr>
  );
};
export default EmployeeRow;