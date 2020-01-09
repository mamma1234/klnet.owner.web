import 'date-fns';
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
//import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  //KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import FormControl from "@material-ui/core/FormControl";

//const useStyles = makeStyles(styles);

export default function MaterialUIPickers(props) {


  //const classes = useStyles();
  // The first commit of Material-UI
  const {formControlProps,labelText,id,format,onChangeValue,setValue} = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
       <FormControl
      {...formControlProps}
    >
        <KeyboardDatePicker
          //disableToolbar
          //variant="inline"
          format={format}
          id={id}
          label={labelText}
          value={setValue}
          onChange={onChangeValue}
         /* {...inputProps}*/
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </FormControl>
    </MuiPickersUtilsProvider>
  );
}