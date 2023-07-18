import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import base_url from "../api/API";


const AdminLogin = () => {
    const [admin, setAdmin] = useState({
        admin_Id: '',
        decryptedPassword:''
    });

    const handleForm = (e) => {
      e.preventDefault();
    const count = postDataOnServer(admin);
    if(count != null){
      setAdmin({})
    }
    };
   // console.log(employee);
    const postDataOnServer = (data) => {
      axios.post(`${base_url}/Admin/login`, data).then(
        (response) => {
          console.log(response);
          toast.success("Login successfully!")
        },
        (error) => {
          console.log(error);
          toast.error("Something Went Wrong")
        }
      );
    };
  
  return (
    <div>
      <Row onSubmit={handleForm}>
        <Col sm="4" xs="6"></Col>
        <Col className="bg-light border pt-3 pb-2 " style={{marginTop: "10%"}}  sm="4" xs="6">
          <Form>
            <FormGroup>
              <Label >
                Admin Id
              </Label>

              <Input
                placeholder="Admin Id"
                type="text"
                onChange={(e) => {
                    setAdmin({ ...admin, admin_Id: e.target.value });
                  }}
                  value={admin.admin_Id}
                  
              />
            </FormGroup>
            <FormGroup>
              <Label >
                Password
              </Label>

              <Input
                placeholder="Password"
                type="password"
                onChange={(e) => {
                    setAdmin({ ...admin, decryptedPassword: e.target.value });
                  }}
                  value={admin.decryptedPassword}
                  
              />
            </FormGroup>


            <Button type="submit">Submit</Button>
          </Form>
        </Col>
        <Col sm="4"></Col>
      </Row>
    </div>
  );
}

export default AdminLogin
