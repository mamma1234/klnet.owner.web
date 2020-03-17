import React,{ useState, useEffect } from "react";

import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles,useTheme } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import MButton from '@material-ui/core/Button';

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { slideDown, slideUp } from "components/Slide/Slide.js";
import ExpandTable from "components/Table/Table.js";

import axios from 'axios';
import Stepper from 'components/Navbars/Stepper.js';

const classes = makeStyles(theme => ({
  root: {
    padding: 0,
  },
}));

const useStyles = makeStyles(styles);

const useStyles1 = makeStyles(theme => ({
	root:{
		flexShrink:0,
		marginLeft: theme.spacing(2.5),
	}
}));




export default function CntrDetail(props) {


  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, index } = props;
  // const [keysub,setKeysub] = useState(props.keysub);



  
  console.log(">>> tableHead : ",tableHead);
  console.log(">>> tableData : ",tableData);;
  console.log(props);
  
  return [
    // <div key={index}>{index}</div>
    <Table className={classes.table} >
      <TableHead className={classes[tableHeaderColor + "TableHeader"]} style={{padding:'5px',textAlignLast:'center'}}>
        <TableRow  className={classes.tableHeadRow} >
           {/* {tableHead.map((prop, index) => {
            return (
              <TableCell
                className={classes.tableCell + " " + classes.tableHeadCell}
                key={index}
                    align = "center"
              >
                {index}
              </TableCell>
            );
          })}  */}
          <TableCell>{tableHead[0]}</TableCell>
        <TableCell >{tableHead[1]}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      <TableRow key="9999999999">
        
        
        <TableCell key="21">{tableData[0]}</TableCell>
        <TableCell key="22">{tableData[1]}</TableCell>
        {/* <TableCell >{data[0]}</TableCell>
        <TableCell >{data[1]}</TableCell>
        <TableCell ></TableCell>
        <TableCell ></TableCell> 
        <TableCell ></TableCell>
        <TableCell ></TableCell>
        <TableCell ></TableCell> */}
      </TableRow>
         {/* {tableData.map((prop, index) => {
          
          return (
             <TableRows key={index}  data={prop} />
          );
         })} */}
      </TableBody>
    </Table>
  ];
}

CntrDetail.defaultProps = {
  tableHeaderColor: "gray"
};

CntrDetail.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
};


class TableRows extends React.Component {
  render() {
    const { data, key } = this.props;
    console.log(">>>> data :",data);
    console.log(">>>> key :",key);
    console.log(">>>> 0 :",this.props.data[0]);
    console.log(">>>> 1 :",this.props.data[1]);
    console.log(">>>> 2 :",this.props.data[2]);
    console.log(">>>> 3 :",this.props.data[3]);
    
    return [
      
      <TableRow key={key}>
        <TableCell key="11">{key}</TableCell>
        
        <TableCell key="11">{data[0]}</TableCell>
        <TableCell key="12">{data[1]}</TableCell>
        {/* <TableCell >{data[0]}</TableCell>
        <TableCell >{data[1]}</TableCell>
        <TableCell ></TableCell>
        <TableCell ></TableCell> 
        <TableCell ></TableCell>
        <TableCell ></TableCell>
        <TableCell ></TableCell> */}
      </TableRow>
    ];
  }
}
