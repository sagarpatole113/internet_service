import axios from "axios";
import React, { useState } from "react";
import base_url from "../api/API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
//import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Register = () => {
  const [employee, setEmployee] = useState({});

  const handleForm = (e) => {
    e.preventDefault();
    console.log(employee);
    const count = postDataOnServer(employee);
    if (count != null) {
      setEmployee({});
    }
  };
  // console.log(employee);
  const postDataOnServer = (data) => {
    axios.post(`${base_url}/Employee`, data).then(
      (response) => {
        console.log(response);
        toast.success("Registered successfully!");
      },
      (error) => {
        console.log(error);
        toast.error("Something Went Wrong");
      }
    );
  };

  return (
    <>
      <nav class="navbar navbar-light bg-light justify-content-end">
        <Link
          to={`/admin-login`}
          class="btn btn-outline-success me-2"
          type="button"
        >
          Admin Logn
        </Link>

        <div class="mr-3 d-flex flex-row    ">
          <div class="  d-flex  ">
            <input
              type="search"
              id="search"
              class="form-control me-1"
              placeholder="Employee ID"
            />
          </div>
        </div>

        <div class="  d-flex  ">
          <button type="button" class="btn btn-primary me-3">
            Search
          </button>
        </div>
      </nav>

      <div>
        <Container>
          <Row xs="2">
            <Col sm="4" xs="6"></Col>

            <Col className="" sm="4" xs="6" style={{ marginTop: "7%" }}>
              <Form onSubmit={handleForm}>
                <FormGroup>
                  <Label hidden>First Name</Label>
                  <Input
                    name="First Name"
                    onChange={(e) => {
                      setEmployee({ ...employee, first_name: e.target.value });
                    }}
                    value={employee.first_name}
                    required
                    placeholder="First Name"
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <Label hidden> Last Name</Label>
                  <Input
                    name=" Last Name"
                    onChange={(e) => {
                      setEmployee({ ...employee, last_name: e.target.value });
                    }}
                    value={employee.last_name}
                    required
                    placeholder=" Last Name"
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <Label hidden>Employee Id</Label>
                  <Input
                    name="Employee Id"
                    onChange={(e) => {
                      setEmployee({ ...employee, emp_Id: e.target.value });
                    }}
                    value={employee.emp_Id}
                    required
                    placeholder="Employee Id"
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <Label hidden>Phone</Label>

                  <Input
                    name="Phone"
                    onChange={(e) => {
                      setEmployee({ ...employee, phone: e.target.value });
                    }}
                    value={employee.phone}
                    required
                    placeholder="Phone"
                    type="number"
                  />
                </FormGroup>
                <FormGroup>
                  <Label hidden>Email Id</Label>
                  <Input
                    name="Email Id"
                    onChange={(e) => {
                      setEmployee({ ...employee, email: e.target.value });
                    }}
                    value={employee.email}
                    required
                    placeholder="Email Id"
                    type="email"
                  />
                </FormGroup>
                <FormGroup>
                  <Label hidden>Department</Label>
                  <Input
                    name="Department"
                    onChange={(e) => {
                      setEmployee({ ...employee, department: e.target.value });
                    }}
                    value={employee.department}
                    required
                    placeholder="Department"
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <Label hidden> Position</Label>
                  <Input
                    name=" Position"
                    onChange={(e) => {
                      setEmployee({ ...employee, position: e.target.value });
                    }}
                    value={employee.position}
                    required
                    placeholder=" Position"
                    type="text"
                  />
                </FormGroup>

                <Button type="submit">Submit</Button>
              </Form>
            </Col>

            <Col sm="4"></Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Register;
