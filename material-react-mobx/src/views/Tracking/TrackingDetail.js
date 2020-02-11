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
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Checkbox from '@material-ui/core/CheckBox';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Icon from '@material-ui/core/Icon';
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { slideDown, slideUp } from "components/Slide/Slide.js";

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
  state = { expanded: false , port: [], iconstate:"add_circle"};

  componentDidMount() {
	    this.scheduleToSearch();
	  }
  
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
	}).then(response => this.setState({port:response.data }));
    
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
  
  handleClickOpen = () => {
	  window.open('/cntrlist','_new','height=400,width=500');
  }
  
  
  render() {
    //const { data } = this.props;
     const { port } = this.state;
     let point =0;
     
     port.map((data, index) => {
     if (data[3] == "Y") {
    	 point = index;
     	}
     	});

    return [
      <TableRow  key={this.props.index}  >
        <TableCell style={{padding:'5px',textAlignLast:'center'}} onClick={this.handleClickOpen}>SNKO000000001</TableCell>	
        <TableCell style={{padding:'5px',textAlignLast:'center'}}><StarIcon /></TableCell>
        <TableCell style={{padding:'5px',textAlignLast:'center'}}>E</TableCell>
        <TableCell style={{padding:'5px',textAlignLast:'center'}}>SNKO</TableCell>
        <TableCell style={{padding:'5px',textAlignLast:'center'}}>SNKOTEST VESSL(EF003)</TableCell>
        <TableCell style={{padding:'5px',textAlignLast:'center'}}>입항</TableCell>
        <TableCell style={{padding:'5px',textAlignLast:'center'}}>KRPUS(2020-01-29)</TableCell>
        <TableCell style={{padding:'5px',textAlignLast:'center'}}>KRINC(2020-01-29)</TableCell>
        <TableCell style={{padding:'5px',textAlignLast:'center'}}><Icon color="primary" onClick={this.toggleExpander}>{this.state.iconstate}</Icon></TableCell>
      </TableRow>,
      this.state.expanded && (
        <TableRow key = {this.props.index+1} style={{marginTop:'5px',marginBottom:'5px'}}>
          <TableCell colSpan={9} style={{padding:'5px'}}>
            <div ref="expanderBody"> 
		          <Stepper classes={{padding: '10px'}}
		          	stepData ={[['POD: KRPUS','DT: 2020-01-29','T/T: 0'],['POD: KRINC','DT: 2020-01-29','T/T: 0']]}
		            active ={0}
		          />
		        <Grid>
		          	<GridContainer>
		          		<GridItem xs={12} sm={12} md={6}>
		          		<div>DEM / DET Service</div>
			          		<Card style={{marginTop:'5px',marginBottom:'5px'}}>
			          		
					          	<TableList
					                tableHeaderColor={this.props.color}
					                tableHead={["ACT", "DEM", "DET"]}
										tableData={[
							            ["DEPATURE 2020-01-29", "2020-01-29", "2020-01-29"],
							            ["LOGING 2020-01-29", "2020-01-29", "2020-01-29"]
							          ]}
					          	/>
				          	</Card>
			          	</GridItem>
			          	<GridItem xs={12} sm={12} md={6}>
			          		<div>CUSTOM</div>
				          	<Card style={{marginTop:'5px',marginBottom:'5px'}}>
				          	
					          	<TableList
					                tableHeaderColor={this.props.color}
					                tableHead={["EXPORT LICENSE", "INSPECT", "CLEARLANCE"]}
										tableData={[
							            ["Y", "N", "반입신고(2020-01-29 00:00)"],
							            ["N", "N", ""]
							          ]}
					          	/>
				          	</Card>			          
			          	</GridItem>
			          	</GridContainer>
			      </Grid> 
            </div>
          </TableCell>
        </TableRow>    
      )
    ];
  }
}
