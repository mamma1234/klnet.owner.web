/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from "@material-ui/core/FormControl";

export default function SearchSelects(props) {

  const {
    formControlProps,
    labelName,
    id,
    selectData,
    listName
  } = props;

  const defaultProps = {
    options: selectData,
    getOptionLabel: option => "["+option.carrier_code+"]"+option.carrier_name,
  };

  /* const flatProps = {
    options: selectData.map(option => option.data_name),
  }; */

  //const [value, setValue] = React.useState(null);

  return (
    <FormControl
      {...formControlProps}
    >
  <Autocomplete
        {...defaultProps}
        id={id}
        debug
        renderInput={params => <TextField {...params} label={labelName} fullWidth />}
      /> 
    </FormControl>
  );
}
