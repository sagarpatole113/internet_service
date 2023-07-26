import {Col,Label,Form
} from "reactstrap";
import ColumnsToPrint from "./ColumnsToPrint";
import base_url from "../api/API";
import axios from "axios";
import { useEffect, useState } from "react";
import "./DownloadDashboard.css"; 

const DownloadDashboard = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [chooseStatus, setChooseStatus] = useState({ status: "" });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
   
    fetchStatus(chooseStatus.status);
  }, [chooseStatus.status]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/Employee`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStatus = async (status = "") => {
    try {
      if (status) {
        const response = await axios.get(
          `${base_url}/Employee/GetByStatus/${status}`
        );
        setFilteredData(response.data);
        console.log(response.data);
      } else {
        // If the status is not selected (empty string), fetch all employees
        setData([]); // Clear existing data to avoid displaying old data
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleClearFilter = () => {
    setChooseStatus({ status: "" });
    setFilteredData([]); 
 };

  return (
    <>
      <div className="status-dropdown">
        <Form>
          <Col>
            <Label className="form-label">Status</Label>
            <select
              className="form-select"
              onChange={(e) => {
                setChooseStatus({ ...chooseStatus, status: e.target.value });
              }}
              value={chooseStatus.status}
            >
              <option disabled>Choose an option</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
            {console.log(chooseStatus)}
          </Col>
        </Form>
        <button onClick={handleClearFilter} className="btn btn-outline-secondary float-end  mt-4">
        Clear Filter
      </button>
      </div>

      <div className="container">
        <h3 style={{ textAlign: "center", marginTop: '2%', marginBottom: '2%' }}>Employee Record</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Employee Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Department</th>
              <th scope="col">Position</th>
              <th scope="col">Status</th>
              <th scope="col">Requested Date</th>
              <th scope="col">Approval Date</th>
              <th scope="col">Remark</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0
              ? filteredData.map((emp) => (
                  <ColumnsToPrint key={emp.id} emp={emp} />
                ))
              : data.map((emp) => (
                  <ColumnsToPrint key={emp.id} emp={emp} />
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DownloadDashboard;
