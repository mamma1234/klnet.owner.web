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
  const [rowsPerPage,setRowsPerPage] = React.useState(5);
  console.log(tableData);
  console.log(props);
  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage,tableData.length - page * rowsPerPage);
  
  const handleChagePage = (e,newPage) => {
	  setPage(newPage);
  }
  
  const handleChangeRowsPerPage = event => {
	  setRowsPerPage(parseInt(event.target.value,10));
	  setPage(0);
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
                    <TableRows key={key} index={key + 1} data={prop} />
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
  state = { tarrifExpanded: false , cntrExpanded: false, list: []};

  componentDidMount() {
	    //this.scheduleToSearch();
	  }
  
  // ���̺� ��ȸ
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
	}).then(response => this.setState({list:response.data }));
    
  }
 
  // �ο� ���� 
  toggleExpander = (id,col) => {
    return(event) => {

      console.log(col);
      this.setState({ tarrifExpanded: false });
      this.setState({ cntrExpanded: false });

      if (col=="LINE_CODE") {
        if (!this.state.tarrifExpanded) {
          this.setState({ tarrifExpanded: true }, () => {
            if (this.refs.expandTarrif) {slideDown(this.refs.expandTarrif);}
          });
        } else {
          slideUp(this.refs.expandTarrif, {onComplete: () => {this.setState({ tarrifExpanded: false });}});
        }
      } else if (col=="CNTR_NO") {
        if (!this.state.cntrExpanded) {
          this.setState({ cntrExpanded: true }, () => {
            if (this.refs.expandCntr) {slideDown(this.refs.expandCntr);}
          });
        } else {
          slideUp(this.refs.expandCntr, {onComplete: () => {this.setState({ cntrExpanded: false });}});
        }
      }

      
      
    }
  };


  
  render() {
    //const { data } = this.props;
     const { list } = this.state;
     let point =0;


     list.map((data, index) => {
     if (data[3] == "Y") { 
    	 point = index;
     	}
     	});
    
    return [
      <TableRow  key={this.props.index}  >
        <TableCell >
          <Checkbox
          value="secondary"
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </TableCell>
        <TableCell onClick={this.toggleExpander(this.props.data.id,"LINE_CODE")}>{this.props.data.LINE_CODE}</TableCell>
        <TableCell onClick={this.toggleExpander(this.props.data.id,"CNTR_NO")}>{this.props.data.CNTR_NO}</TableCell>
        <TableCell >{this.props.data.DET}</TableCell>
        <TableCell >{this.props.data.DEM}</TableCell> 
        <TableCell >{this.props.data.COMBINE}</TableCell>
        <TableCell >{this.props.data.STORAGE}</TableCell>
        <TableCell >{this.props.data.REMARK}</TableCell>
        <TableCell >
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
      </TableRow>,
      this.state.tarrifExpanded && (
        

            <div ref="expandTarrif"> 
           <Table
              tableHeaderColor="primary"
              tableHead={["1","2"]}
              tableData={["1","2"]}
            />
            </div>

        
      ),
      this.state.cntrExpanded && (
        <TableRow key = {this.props.index+1}>
          <TableCell colSpan={9}>
            <div ref="expandCntr"> 
            <GridContainer>
              <GridItem xs={12} sm={2}>
                규격
              </GridItem>
            </GridContainer>
            </div>
          </TableCell>
        </TableRow>
      )
    ];
  }
}
