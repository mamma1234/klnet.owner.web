import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '0px',
  },
  button: {
    marginRight: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
	marginBottom: theme.spacing(2),  
  },
  resetContainer: {
	  padding:theme.spacing(3),
  },
}));

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
	switch(step) {
		case 0:
			return 'test1';
		case 1:
			return 'test2';
		case 2:
			return 'test3';
		default:
			return 'unknown step';
	}
}



export default function HorizontalNonLinearAlternativeLabelStepper(props) {
  const classes = useStyles();
  const { stepData,  active} = props;
  const [activeStep, setActiveStep] = React.useState(active);
  //const [completed, setCompleted] = React.useState(new Set());
  //const [skipped, setSkipped] = React.useState(new Set());
  //const steps = getSteps();
  
  
  const steps = stepData;
  
  const handleNext = () => {
	  setActiveStep(preActiveStep => preActiveStep +1);
  };
  
  const handleBack = () => {
	  setActiveStep(preActiveStep => preActiveStep -1);
  };
  
  const handleReset = () => {
	  setActiveStep(0);
  };
  
  return (
		    <div className={classes.root}>
		      <Stepper activeStep={activeStep} orientation="vertical" style={{paddingTop: '0px',paddingBottom: '0px'}}>
		        {steps.map((label, index) => (
		        	<Step key={label}>
		        		<StepLabel>{label[0]}<br/>Event:{label[1]}<br/>Location:{label[2]}</StepLabel>
		        	</Step>
		        	))}
		        </Stepper>
		    </div>
		  );
}