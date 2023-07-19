import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Form, FormGroup, Input, Row } from "reactstrap";
import base_url from "../api/API";
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
    const [admin, setAdmin] = useState({
        admin_Id: '',
        decryptedPassword:''
    });

const navigate = useNavigate();


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
          if(response){
            navigate('/dashboard')
          }
        },
        (error) => {
          console.log(error);
          toast.error("Invalid Credintials")
        }
      );
    };
  
  return (
    <div>
      <Row onSubmit={handleForm}>
        <Col sm="4" xs="6"></Col>
        <Col className=" pt-3 pb-2 " style={{marginTop: "10%"}}  sm="4" xs="6">
          <Form>
            <FormGroup>
            

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
