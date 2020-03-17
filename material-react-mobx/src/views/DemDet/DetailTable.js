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
import TableSortLabel from "@material-ui/core/TableSortLabel"; 
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
import CntrDetail from "views/DemDet/CntrDetail.js";
import SimpleTable from "views/DemDet/CustomTable.js";
import axios from 'axios';
import Stepper from 'components/Navbars/Stepper.js';

import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import Slider from "components/Slide/Slider.js";
import Grid from '@material-ui/core/Grid';
import Access from "@material-ui/icons/AccessAlarm";
import Card from "components/Card/Card.js";
import TableList from "components/Table/TableSmallLine.js";



const classes = makeStyles(theme => ({
  root: {
    padding: 0,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow : 'hidden',
    padding : 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const useStyles = makeStyles(styles => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow : 'hidden',
    padding : 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
}));

const useStyles1 = makeStyles(theme => ({
	root:{
		flexShrink:0,
		marginLeft: theme.spacing(2.5),
	}
}));

const useStyles2 = makeStyles(styles);



function TablePageinationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const {count,page,rowsPerPage,onChangePage } =props;
	
	console.log(":"+count+":"+page+":"+rowsPerPage+":"+onChangePage);
	
	const handleFirstPageButtonClick = e => {
		onChangePage(e,0);
	}
	
	const handleBackButtonClick = e => {
		onChangePage(e,page -1);
	}
	
	const handleNextButtonClick = e => {
		onChangePage(e,page +1);
	}
	
	const handleLastPageButtonClick = e => {
		onChangePage(e,Math.max(0,Math.ceil(count / rowsPerPage)-1));
	}
	
	return (
		<div className = {classes.root}>
			<IconButton
				onClick = {handleFirstPageButtonClick}
				disabled={page === 0 }
				aria-label="first page"
			>
			{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon/>}
			</IconButton>
			<IconButton
				onClick = {handleBackButtonClick}
				disabled={page === 0 }
				aria-label="previous page"
			>
		{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
		</IconButton>
		<IconButton
			onClick = {handleNextButtonClick}
			disabled={page >= Math.ceil(count / rowsPerPage) -1 }
			aria-label="next page"
		>
	{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
	</IconButton>
		<IconButton
			onClick = {handleLastPageButtonClick}
			disabled={page >= Math.ceil(count / rowsPerPage)-1 }
			aria-label="last page"
		>
		{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon/>}
		</IconButton>
		</div>
	);
	
}

TablePageinationActions.propTypes = {
		count:	PropTypes.number.isRequired,
		onChangePage: PropTypes.func.isRequired,
		page: PropTypes.number.isRequired,
		rowsPerPage:PropTypes.number.isRequired,
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
  ? (a, b) => descendingComparator(a, b, orderBy)
  : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a,b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] = b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export default function ToggleTable(props) {


  const classes = useStyles2();
  const { tableHead, tableData, tableHeaderColor } = props;
  const [page,setPage] = React.useState(0);
  const [rowsPerPage,setRowsPerPage] = React.useState(5);
  console.log(">>> tableData : ",tableData);
  //console.log(props);

  const { order, orderBy, onRequestSort} = props;

  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage,tableData.length - page * rowsPerPage);
  
  const handleChagePage = (e,newPage) => {
	  setPage(newPage);
  }
  
  const handleChangeRowsPerPage = event => {
	  setRowsPerPage(parseInt(event.target.value,10));
	  setPage(0);
  }
  
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  }

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
                    align = "center"
                  >
                      <b>{prop}</b>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
           {
           (rowsPerPage > 0?  tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :  tableData).map((prop, idx, key) => {
                  return (
                    <TableRows key={idx} index={idx + 1} data={prop} />
                  );
                })}
                
           
        </TableBody>
        {(tableData.length >= 5 ?
        <TableFooter>
        	<TableRow>
        		<TablePagination 
        			rowsPerPageOptions={[5,10,15,{label:'All',value:-1}]}
        			colSpan={9}
        			count={tableData.length}
        		    rowsPerPage={rowsPerPage}
        			page={page}
        			SelectProps={{
        				inputProps: {'aria-label':'Rows Per Page'},
        			    native:true,
        			}}
        			onChangePage={handleChagePage}
        			onChangeRowsPerPage={handleChangeRowsPerPage}
        			ActionsComponent={TablePageinationActions}
        	/>
        	</TableRow>
        </TableFooter>: null )}
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
  state = {tarrifExpanded: false , cntrExpanded: false};

  tarrifExpander = () => {
    this.setState({ cntrExpanded: false });

    if (!this.state.tarrifExpanded) {
      this.setState({ tarrifExpanded: true }, () => {
        if (this.refs.expandTarrif) {slideDown(this.refs.expandTarrif);}
      });
    } else {
      slideUp(this.refs.expandTarrif, {onComplete: () => {this.setState({ tarrifExpanded: false });}});
    }
  }; 

  cntrExpander = () => {
    this.setState({ tarrifExpanded: false });

    if (!this.state.cntrExpanded) {
      this.setState({ cntrExpanded: true }, () => {
        if (this.refs.expandCntr) {slideDown(this.refs.expandCntr);}
      });
    } else {
      slideUp(this.refs.expandCntr, {onComplete: () => {this.setState({ cntrExpanded: false });}});
    }
  };

 


  
  render() {
    const { data, index } = this.props;
    const { list } = this.state;
    let point =0;

    

    
  
    
console.log("index:", index+3000)

    return [
      
      <TableRow  key={this.props.index}  >
        <TableCell align="center" >
          <Checkbox
          value="secondary"
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </TableCell>
        <TableCell align="center" onClick={this.tarrifExpander}><b><a>{this.props.data[0]}</a></b></TableCell>
        
        <TableCell align="center" onClick={this.cntrExpander} ><b><a>{this.props.data[3]}</a></b></TableCell>
        
         {/* <Popover
          anchorReference="anchorPosition"
          anchorPosition={{top:80,left:650}}
          anchorOrigin={{vertical:'bottom',horizontal:'center',}}
          transformOrigin={{vertical:'top',horizontal:'center',}}
          >
          테스트
        </Popover> */}
        
        <TableCell align="right">{this.props.data[31]} {this.props.data[33]}</TableCell>
        <TableCell align="right">{this.props.data[34]} {this.props.data[36]}</TableCell> 
        <TableCell align="right">{this.props.data[37]} {this.props.data[39]}</TableCell>
        <TableCell align="right">{this.props.data[40]} {this.props.data[42]}</TableCell>
        <TableCell >{this.props.data[43]}</TableCell>
        <TableCell align="center">
          <MButton
            variant="contained"
            //color="primary"
            size="small"
            style={{lineHeight:"1",}}
            //startIcon={<CancelIcon/>}
            onClick={null}
          >DO신청
          </MButton>
        </TableCell>
      </TableRow>
      ,this.state.tarrifExpanded && (
        <TableRow key = {index+8000} style={{marginTop:'5px',marginBottom:'5px'}}>
          <TableCell colSpan={11} style={{padding:'5px'}}>
            <div ref="expandTarrif"> 
            expandTarrif
            </div>
          </TableCell>
        </TableRow>    
      )
      ,this.state.cntrExpanded && (
        <TableRow key = {index+9000} style={{marginTop:'5px',marginBottom:'5px'}}>
          <TableCell colSpan={11} style={{padding:'5px'}}>
            <div ref="expandCntr"> 
              <TableList
                  tableHeaderColor={this.props.color}
                  tableHead={["SZ/TP","M-BL","H-BL","VSL","VOY","POL","POD","ATA","양하","GATE OUT","GATE IN"]}
                  tableData={[
                              [this.props.data[4], this.props.data[5], this.props.data[6]
                              ,this.props.data[8],this.props.data[10]
                              ,this.props.data[12],this.props.data[13]
                              ,this.props.data[18],this.props.data[22]
                              ,this.props.data[24],this.props.data[27]
                              ]
                            ]}
              />
            </div>
          </TableCell>
        </TableRow>    
      )
      
      
     
    ];
  }
}
