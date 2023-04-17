import {
  Box,
  Button,
  Card,
  CardContent,
  Step,
  StepLabel,
  Stepper
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React, { useState } from 'react';
import Developer from './pages/Developer';
import Financials from './pages/Financials';
import Project from './pages/Project';
import Unit from './pages/Unit';


export default function StepperPages({empData}) {
  const steps = [
    { stepName: 'Developer', component: <Developer empData={empData}/> },
    { stepName: 'Project', component: <Project empData={empData}/> },
    { stepName: 'Unit', component: <Unit empData={empData}/> },
    { stepName: 'Financials', component: <Financials empData={empData}/> }
  ];
  
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box padding={{ sm: '2em 1em', md: '2em' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel>{step.stepName}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection={{
          xs: 'column',
          sm: 'row'
        }}
      >
        {/* show in mobile view */}
        <Box
          display={{
            xs: 'flex',
            sm: 'none'
          }}
        >
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            <ArrowBackIosIcon />
          </Button>
          <Button
            disabled={activeStep === steps.length - 1}
            onClick={handleNext}
          >
            <ArrowForwardIosIcon />
          </Button>
        </Box>
        {/* show in mobile view */}
        <Box
          item
          sm={1}
          justifyContent="center"
          display={{
            xs: 'none',
            sm: 'flex'
          }}
          sx={{ justifyContent: 'left' }}
        >
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            <ArrowBackIosIcon />
          </Button>
        </Box>

        <Card sx={{ width: '100%' }}>
          <CardContent>{steps[activeStep].component}</CardContent>
        </Card>

        <Box
          item
          sm={1}
          display={{
            xs: 'none',
            sm: 'flex'
          }}
          sx={{ justifyContent: 'right' }}
        >
          <Button
            disabled={activeStep === steps.length - 1}
            onClick={handleNext}
          >
            <ArrowForwardIosIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
