import { useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
// import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { Button, Container, Box, TextField } from "@material-ui/core";
import Identification from "./Identification";
import Center from "./Center";
import Alert from "./Alert";
import Details from "./Details";
const steps = ["Identification", "Vaccine Center", "Appoinment"];

function Register(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [idValue, setIdValue] = useState("");
  const [selectedId, setSelectedId] = useState("Adhar Id");
    const[selectedItem,setSelectedItem] = useState({})
  const handleNext = () => {
    if (activeStep === 0) {
      if (idValue === "") {
        setMessage("enter Id number");
        setOpen(true);
      } else {
        setActiveStep(activeStep + 1);
      }
    } else if (activeStep === 1) {
      setActiveStep(activeStep + 1);
    }
    // else if (activeStep===2){
    //     setActiveStep(activeStep+1)
    // }
  };

  return (
    <Container className="reg-div">
      <Alert open={open} message={message} setOpen={setOpen} />
      <h2 className="reg-heading">Registration</h2>
      <Stepper className="stepper" activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 0 && (
        <Identification
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          idValue={idValue}
          setIdValue={setIdValue}
        />
      )}
      {activeStep === 1 && <Center 
          setSelectedItem ={setSelectedItem}

      />}
        {activeStep === 2 && <Details
            selectedItem = {selectedItem}
        />}
      <Button className="button" onClick={handleNext}>
        {activeStep<2? "Next": "Finish"}
      </Button>
    </Container>
  );
}

export default Register;
