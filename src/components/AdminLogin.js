import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import base_url from "../api/API";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import { ComponentToShow } from "./ComponentToShow";
import { ComponentToPrint } from "./ComponentToPrint";

const AdminLogin = () => {

  const [isPrintClicked, setPrintClicked] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [admin, setAdmin] = useState({
    admin_Id: '',
    decryptedPassword:''
});

const logout = () => {
  localStorage.removeItem('token-info');
  setIsLoggedin(false);
};

const handleDownload =()=>{
  setPrintClicked(true); 
}
const changeView =()=>{
  setPrintClicked(false);
 
}

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
      localStorage.setItem('token-info', JSON.stringify(admin));
      setIsLoggedin(true)  
    },
    (error) => {
      console.log(error);
      toast.error("Invalid Credintials")
    }
  );
};

 const componentRef = useRef();
 const handlePrint = useReactToPrint({
   content: () => componentRef.current,
 });


  return (
    <>
    {!isLoggedin ? (
					<>
          <Container>
            
     <div className="mt-2">
                  <Link to={'/'}>
                  <Button>Back</Button>
                  </Link>
                </div>
<div>
      <Row >
        <Col sm="4" xs="6"></Col>
        <Col className=" pt-3 pb-2 " style={{marginTop: "10%"}}  sm="4" xs="6">
          <Form onSubmit={handleForm}>
            <FormGroup>
              <Label style={{fontSize : '25px'}}>
             Admin Login
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
              <Input
                placeholder="Password"
                type="password"
                onChange={(e) => {
                    setAdmin({ ...admin, decryptedPassword: e.target.value });
                  }}
                  value={admin.decryptedPassword}
                  
              />
            </FormGroup>


            <Button type="submit">Login</Button>
          </Form>
        </Col>
        <Col sm="4"></Col>
      </Row>
    </div>
    </Container>
    </>
    				) : (
              <>
              <Container> 
                <div style={{marginTop:'2%'}} >
                {isPrintClicked?(<button  class="btn btn-outline-secondary me-3 " onClick={handlePrint}>Download</button>):null}
             
                {!isPrintClicked? ( <button class="btn btn-outline-secondary me-3 " onClick={handleDownload} >Print Preview</button>):null}
               {isPrintClicked? (<button class="btn btn-outline-secondary me-3 " onClick={changeView} >Dashboard</button>):null}
               
               
              
                <button  class="btn btn-outline-secondary float-end " onClickCapture={logout}>Logout</button>
            
              {isPrintClicked ? (<ComponentToPrint ref={componentRef}  />  )
              :(<ComponentToShow ref={componentRef}/>)}                
              </div>
              
                </Container>
                
              </>
            )}

    </>

  );
}

export default AdminLogin
