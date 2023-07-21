import axios from "axios";
import React, { useEffect, useState } from "react";
import base_url from "../api/API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
//import { toast } from "react-toastify";
//import { Link } from "react-router-dom";

const Register = () => {
  const [employee, setEmployee] = useState({emp_Id: "",
  phone: "",});
  const [single, setSingle] = useState([]);
  const [empId,setEmpId] = useState('');
  const [showResults, setShowResults] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formattedRequestDate, setFormattedRequestDate] = useState("");
  const [formattedApprovalDate, setFormattedApprovalDate] = useState("");


  const handleEmployeeIdChange = (e) => {
    const empIdValue = e.target.value;
    const numericEmpId = empIdValue.replace(/\D/g, "");
    if (numericEmpId.length <= 8) {
    setEmployee({ ...employee, emp_Id: numericEmpId });
    }
    };
    
    const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    const numericPhone = phoneValue.replace(/\D/g, "");
    if (numericPhone.length <= 10 ) {
    setEmployee({ ...employee, phone: numericPhone });
    }
    };

  useEffect(() => {
    if (single) {
      const formattedRequest = formatDate(single.requested_Date);
      setFormattedRequestDate(formattedRequest);
      
      const formattedApproval = formatDate(single.approval_Date);
      setFormattedApprovalDate(formattedApproval)
    }
  }, [single]);

  const formatDate = (dateString) => {
    if (!dateString) {
      return " "; // Or any other meaningful default value you prefer
      }
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
      return "Invalid Date"; // Handle invalid date strings, if necessary
      }
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


  const handleForm = (e) => {
    e.preventDefault();
    if(employee.phone.length !== 10){
      toast.error("Phone number must be 10")
    }  
   if(employee.emp_Id.length !==8){
    toast.error("Enter 8 digit Employee Id")
  }
  if(employee.phone.length == 10 && employee.emp_Id.length == 8)
  {
    setIsSubmitted(true);
    const count = postDataOnServer(employee);
    if (count != null) {
      setEmployee({});
    }
   }
  };
  // console.log(employee);
  const postDataOnServer = (data) => {
    axios.post(`${base_url}/Employee`, data).then(
      (response) => {
        toast.success("Registered successfully!");
        response.data && window.location.replace(`/`)
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/Employee/${empId}`);
        setSingle(response.data);
        setShowResults(true)
      } catch (error) {
        console.error(error);
      }
    };
      
  return (
    <>
      <div>
        <Container>
          <Row xs="2">
            
            <Col sm="4" xs="6"></Col>
              
            <Col className="" sm="4" xs="6" style={{ marginTop: "7%" }}>
            <Label style={{fontSize : '25px'}}>
             Employee Registration
            </Label>
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
                    onChange={handleEmployeeIdChange}
                    value={employee.emp_Id}
                    required
                    placeholder="Enter 8 digit Employee Id"
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <Label hidden>Phone</Label>

                  <Input
                    name="Phone"
                    onChange={handlePhoneChange}
                    value={employee.phone}
                    required
                    placeholder="Phone"
                    type="text"
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

            <Col sm="4">
              <Container>
              <div className="d-flex justify-content-end mb-3 mt-2">
        <Input
          type="text"
          placeholder="Check Status"
          onChange={(e)=>{setEmpId(e.target.value)}}
          className="w-30 me-2"
        />
        <Button onClick={fetchData} >Search</Button>
        </div>
        { showResults ? 
                <div >
                  <Card
                    className="my-2"
                    color="primary"
                    outline
                    style={{
                      width: "18rem",
                    }}
                  >
                    <CardHeader tag="h5">Employee Status <a class="btn btn-primary btn-close "style={{marginLeft:"29%"}} href="/" role="button"></a></CardHeader>
                    <CardBody>
                      <CardText>Employee Id : {single.emp_Id}</CardText>
                      <CardText>First Name : {single.first_Name}</CardText>
                      <CardText>Last Name : {single.last_Name}</CardText>
                      <CardText>Status : {single.status}</CardText>
                      <CardText>
                        Requested Date : {formattedRequestDate}
                      </CardText>
                      <CardText>Approval Date : {formattedApprovalDate}</CardText>
                      <CardText>Remark : {single.remark}</CardText>
                    </CardBody>
                  </Card>
                </div>
                 : null }
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Register;
