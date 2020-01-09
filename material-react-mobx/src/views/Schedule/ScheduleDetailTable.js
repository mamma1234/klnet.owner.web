import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { slideDown, slideUp } from "components/Slide/Slide.js";
import ExpandTable from "components/Table/Table.js";

import axios from 'axios';
import Stepper from 'components/Navbars/Stepper.js';

const classess = makeStyles(theme => ({
  root: {
    padding: 0,
  },
}));

const useStyles = makeStyles(styles);

export default function ToggleTable(props) {
   const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
           {tableData.map((prop, key) => {
                  return (
                    <TableRows key={key} index={key + 1} data={prop} />
                  );
                })}
        </TableBody>
      </Table>
    </div>
  );
}

ToggleTable.defaultProps = {
  tableHeaderColor: "gray"
};

ToggleTable.propTypes = {
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
  state = { expanded: false , port: []};

  // 테이블 조회
  scheduleToSearch = () => {

    return axios ({
		url:'/api/getScheduleDetailList',
		method:'POST',
		data: {carrierCode : this.props.data.LINE_CODE,
			   startPort : this.props.data.START_PORT,
			   endPort : this.props.data.END_PORT,
			   voyage : this.props.data.VOYAGE_NO,
			   vesselName : this.props.data.VESSEL_NAME
			   }
	}).then(response => this.setState({port:response.data}));
    
  }
 
  // 로우 생성
  toggleExpander = () => {
    if (!this.state.expanded) {
      this.setState({ expanded: true }, () => {
        if (this.refs.expanderBody) {
          slideDown(this.refs.expanderBody);
           this.scheduleToSearch();
        }
      });
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => {
          this.setState({ expanded: false });
        }
      });
    }

   


  };


  render() {
    //const { data } = this.props;
     const { port } = this.state;
/*     let obj = [];
     port.map((port,index) => (
      obj[index] = [port.WEEKDAY,port.PORT_CODE,port.LIST_TT]

    ))*/
    return [
      <TableRow  key={this.props.index} onClick={this.toggleExpander} >
        <TableCell >{this.props.data.LINE_CODE}</TableCell>
        <TableCell >{this.props.data.VESSEL_NAME}</TableCell>
        <TableCell >{this.props.data.VOYAGE_NO}</TableCell>
        <TableCell >{this.props.data.START_PORT}<br/>{this.props.data.START_DAY}</TableCell>
        <TableCell >{this.props.data.END_PORT}<br/>{this.props.data.END_DAY}</TableCell>
      </TableRow>,
      this.state.expanded && (
        <TableRow key = {this.props.index+1}>
          <TableCell colSpan={5}>
            <div ref="expanderBody"> 
	          <Stepper 
	          	stepData ={port}
	          />  
            </div>
          </TableCell>
        </TableRow>
      )
    ];
  }
}
