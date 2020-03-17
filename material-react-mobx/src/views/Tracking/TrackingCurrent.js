import React,{useState} from "react";

import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles,useTheme } from "@material-ui/core/styles";
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
import Grid from '@material-ui/core/Grid';
import GridContainer from "components/Grid/GridContainer.js";
import TableList from "components/Table/TableSmallLine.js";
import GridItem from "components/Grid/GridItem.js";
import Popover from  '@material-ui/core/Popover';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Card from "components/Card/Card.js";
import Access from "@material-ui/icons/AccessAlarm";
import Assign from "@material-ui/icons/AssignmentTurnedIn";
import CardHeader from "components/Card/CardHeader.js";
import Icon from '@material-ui/core/Icon';
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { slideDown, slideUp } from "components/Slide/Slide.js";

import axios from 'axios';
import VerticalStepper from 'components/Navbars/VerticalStepper.js';

import CntrListTable from "views/Tracking/TrackingCntrList.js";

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

export default function ToggleTable(props) {


  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  const [page,setPage] = React.useState(0);
  const [rowsPerPage,setRowsPerPage] = React.useState(10);
  console.log(tableData);
  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage,tableData.length - page * rowsPerPage);
  
  const handleChagePage = (e,newPage) => {
	  setPage(newPage);
  }
  
  const handleChangeRowsPerPage = event => {
	  setRowsPerPage(parseInt(event.target.value,10));
	  setPage(0);
  }
  
  
  return (
    <div className={classes.tableResponsive} style={{marginTop:'0px'}}>
      <Table className={classes.table} >
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]} style={{padding:'5px',textAlignLast:'center'}}>
            <TableRow className={classes.tableHeadRow} style={{height:'1px'}}>
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
           {(rowsPerPage > 0?tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :  tableData).map((prop, key) => {
                  return (
                    <TableRows key={key} index={key + 1} data={prop} color={tableHeaderColor} />
                  );
                })}
           
        </TableBody>
        {(tableData.length >= 10 ?
        <TableFooter>
        	<TableRow>
        		<TablePagination 
        			rowsPerPageOptions={[10,15,20,{label:'All',value:-1}]}
        			colSpan={11}
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
  state = { expanded: false , cntrData: [], iconstate:"add_circle"};
  componentDidMount() {
	  axios ({
    		url:'/loc/getCntrDetailList',
    		method:'POST',
    		data: {carriercode : this.props.data[0],
    			   blno : this.props.data[1],
    			   cntrno : this.props.data[2]
    			   }
    		}).then(response => this.setState({cntrData:response.data }));
      //.then(res => console.log(JSON.stringify(res.data)));

	  }
 
  // 로우 생성
  toggleExpander = () => {
    if (!this.state.expanded) {
      this.setState({ expanded: true ,iconstate:"remove_circle"}, () => {
        if (this.refs.expanderBody) {
          slideDown(this.refs.expanderBody);
        }
      });
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => {
          this.setState({ expanded: false , iconstate:"add_circle" });
        }
      });
    }

  };

  
  
  render() {
     const { data } = this.props;
     const { cntrData } = this.state;
    return [
      <TableRow  key={this.props.index}  onClick={this.toggleExpander}>
      	<TableCell style={{padding:'5px',textAlignLast:'center'}}>{this.props.index}</TableCell>
        <TableCell style={{padding:'5px',textAlignLast:'center'}}>{data[2]}</TableCell>
        <TableCell style={{padding:'5px',textAlignLast:'center'}}>{data[4]}/{data[5]}{data[6]!=""?"("+data[6]+")":data[6]}</TableCell>
        <TableCell style={{padding:'5px',textAlignLast:'center'}}>{data[7]}</TableCell>
        <TableCell style={{padding:'5px',textAlignLast:'center'}}>{data[8]}</TableCell>
      </TableRow>,
      this.state.expanded && (
        <TableRow key = {this.props.index+1} style={{marginTop:'5px',marginBottom:'5px'}}>
          <TableCell colSpan={5} style={{padding:'5px'}}>
            <div ref="expanderBody"> 
		          <VerticalStepper
		          	stepData ={cntrData}
		            active ={cntrData.length-1}
		          />
            </div>
          </TableCell>
        </TableRow>    
      )
    ];
  }
}
