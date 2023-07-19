import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";
import EmployeeRow from "./EmployeeRow";
import base_url from '../api/API'
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const toggle = (emp_Id) => {
    setModal(!modal);
    setSelectedUserId(emp_Id);
  };
  const [updateEmp, setUpdateEmp] = useState({
    status: "",
    remark: "",
  });
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/Employee`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const results = data.filter((emp) =>
      emp.emp_Id.toLowerCase().includes(query)
    );
    setSearchResults(results);
  };
  

  const handleUpdateUser = async () => {
    try {
      await axios.put(`${base_url}/Employee/${selectedUserId}`, updateEmp);
      fetchData();
      toggle(null);
      toast.success("Request updated")
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong")
    }
  };
  return (
<div className="container">
  <div className="d-flex justify-content-end mb-3">
        <Input
          type="text"
          placeholder="Search by Employee ID"
          value={searchQuery}
          onChange={handleSearch}
          className="w-25 mt-2"
        />
   </div>
      <Table >
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
            <th scope="col">Action</th>
          </tr>
        </thead>
        {searchResults.length > 0
            ? searchResults.map((emp) => (
                <EmployeeRow
                  key={emp.id}
                  emp={emp}
                  onUpdate={toggle}
                />
              ))
            : data.map((emp) => (
                <EmployeeRow
                  key={emp.id}
                  emp={emp}
                  onUpdate={toggle}
                />
              ))}
              </Table>

      <Modal isOpen={modal} toggle={() => toggle(null)}>
        <ModalHeader toggle={() => toggle(null)}>Update Status</ModalHeader>
        <ModalBody>
          <Form>
            <Col>
              <Label className="form-label">Status</Label>
              <Input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setUpdateEmp({ ...updateEmp, status: e.target.value });
                }}
                value={updateEmp.status}
              />
            </Col>
            <Col>
              <Label className="form-label">Remark</Label>
              <Input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setUpdateEmp({ ...updateEmp, remark: e.target.value });
                }}
                value={updateEmp.remark}
              />
            </Col>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateUser}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={() => toggle(null)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
</div>
  
  );
};

export default Dashboard;