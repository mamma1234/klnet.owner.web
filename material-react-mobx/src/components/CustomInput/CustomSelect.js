import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(styles);

export default function CustomSelects(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    option,
    inputProps,
    setValue,
    error,
    success
  } = props;

  const [value, setvalue] = React.useState(setValue);

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });

    const handleChange = event => {
   setvalue(event.target.value);
  };

  return (
    <FormControl
      {...formControlProps}
    >
        <InputLabel className={classes.labelRoot + labelClasses}>{labelText}</InputLabel>
        <Select
          id = {id}
          value={value}
          {...inputProps}
        >
        {option.map((prop) => {
                return (
                  <MenuItem key={prop} value={prop}>{prop}</MenuItem>
                );
              })}
        </Select>
    </FormControl>
  );
 
}

CustomSelects.propTypes = {
  labelText: PropTypes.node,
  //labelProps: PropTypes.object,
  id: PropTypes.string,
  formControlProps: PropTypes.object
};
