import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(styles);

export default function CustomInput(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    vVal,
    radioData,
    labelProps,
    inputProps,
    error,
    success
  } = props;


  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  });

    const [value, setValue] = React.useState(vVal);

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className}
    >
      <RadioGroup aria-label={labelText} name={labelText} value={value} onChange={handleChange} row>

	  	 {radioData.map((prop,index,key) => {
                return (
                  <FormControlLabel key={index+"_radio"} value={index == 0 ?"ETA":"ETD"} control={<Radio color="primary" />} label={prop} labelPlacement="end" />
                );
			  })}
      </RadioGroup>

    </FormControl>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};
