import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "components/CustomButtons/Button.js";
import DeleteIcon from '@material-ui/icons/DeleteForever';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios';

const useStyless = makeStyles(theme => ({
	  root: {
	'& >*': {
		width:200,
	}  
  },
}));

const styles = {

  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardTitleBlack: {
	    textAlign: "left",
	    color: "#000000",
	    minHeight: "auto",
	    fontWeight: "300",
	    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
	    marginBottom: "3px",
	    textDecoration: "none",
	    "& small": {
	      color: "#777",
	      fontSize: "65%",
	      fontWeight: "400",
	      lineHeight: "1"
	    }
	  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  const classess = useStyless();
  
  const [selectData,setSelectData] = useState([]);
  const [ietype,setIetype] = useState("");
  const [open, setOpen] = useState(false);
  const [delSeq, setDelSeq] = useState("");
  
 /* const onClickDelete = () => {
	  confirm({description:'정말로 삭제 하시겠습니까?'}).then(()=>{});
	  console.log(">>>>>");
  };*/

  
  const handleClose = () => {
	setOpen(false);  
  };
  
  useEffect(() => {
	    console.log('호출....');
	    axios.post("/api/getHotInfo").then(res => setSelectData(res.data));
	    //.then(res => console.log(JSON.stringify(res.data)));
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
  const changeText = (id,name) => e => { 	     
	    const { 
	      target: { value } 
	    } = e; 

	    const tempRows = selectData.map(row => { 
	      if (row.SEQ == id) {
		    if(name == "vessel") {   
		      row["VESSEL_NAME"] = value; 
		    } else if (name == "ie") { 
		      row["IE_TYPE"] = value; 
		    } else if (name == "pol") { 
		      row["POL"] = value; 
		    } else if (name == "pod") { 
		      row["POD"] = value; 
		    } 
	      } 
	      return row; 
	    }); 
	  console.log("!!:"+JSON.stringify(tempRows)); 
	  setSelectData(tempRows); 
	  }; 

	  const addRow = () => { 
	    let data = { 
	      SEQ: selectData.length + 1, 
	      VESSEL_NAME: "", 
	      IE_TYPE:"", 
	      POL:"", 
	      POD:"" 
	    }; 
	    setSelectData([...selectData, data]); 
	  }; 
	  
	  const deleteRow = id => () => { 
		  setDelSeq(id);  
		  setOpen(true);  
	  };
	  
	  
	  const handleDelete = id => () => {
		  let tempRows = selectData.filter(row => {
		      return row.SEQ !== id; 
		    }); 
		    setSelectData(tempRows);
		    handleClose();
	  };
	    
  return (
        <Card>
        	<CardHeader color="warning" stats icon style={{paddingBottom:'2px'}}>
        		<CardIcon color="warning">
        			<Icon>content_copy</Icon>
        		</CardIcon>
        		<h4 className={classes.cardTitleBlack}>HOT Setting</h4>
        		<p className={classes.cardTitleBlack}>
        			Here is a subtitle for this table
        		</p>
        	</CardHeader>
        	<CardBody style={{paddingBottom:'2px'}}>   
	 	    	<GridItem style={{textAlignLast:'right'}}>
	 	    		<GridContainer>
	 	    			<GridItem xs={12}>
									<Button color="warning" onClick={addRow} size="sm">추가</Button>
									<Button color="warning" size="sm">저장</Button>
						</GridItem>
					</GridContainer>
				</GridItem>
		        <GridItem>
				    	<Table className={classes.table}>
				     		<TableHead>
				     			<TableRow className={classes.tableHeadRow}>
					     			<TableCell style={{color:"orange",padding:'8px'}}>Vessel</TableCell>
					     			<TableCell style={{color:"orange",padding:'8px'}}>I/E</TableCell>
					     			<TableCell style={{color:"orange",padding:'8px'}}>POL</TableCell>
					     			<TableCell style={{color:"orange",padding:'8px'}}>POD</TableCell>
					     			<TableCell style={{color:"orange",padding:'8px'}}>Action</TableCell>
				     			</TableRow>
				     		</TableHead>
				     		<TableBody>
				     		{selectData.length !== 0 && (
				     				
				             selectData.map((data, index,key) => {
				            	 
				              return (
				                <TableRow key={index} className={classes.tableBodyRow}>
				                      <TableCell className={classes.tableCell} style={{padding:'3px'}}>
					                      <input 
					                      	type="text" 
					                        onChange={changeText(data.SEQ,'vessel')} 
					                        value={data.VESSEL_NAME?data.VESSEL_NAME:""}
					                        style={{width:'150px',height:'21px'}}
					                      />
				                      </TableCell>
				                      <TableCell className={classes.tableCell} style={{padding:'3px'}}>
					                      <input 
					                      	type="text" 
					                      	onChange={changeText(data.SEQ,'ie')} 
					                      	value={data.IE_TYPE?data.IE_TYPE:""} 
					                        style={{width:'25px',height:'21px'}}
					                       />
				                      </TableCell>
				                      <TableCell className={classes.tableCell} style={{padding:'3px'}}>
					                      <input 
					                      	type="text"
					                      	onChange={changeText(data.SEQ,'pol')} 
					                      	value={data.POL?data.POL:""}
					                        style={{width:'60px',height:'21px'}}
					                      />
				                      </TableCell>
				                      <TableCell className={classes.tableCell} style={{padding:'3px'}}>
					                      <input 
					                      	type="text" 
					                      	onChange={changeText(data.SEQ,'pod')} 
					                      	value={data.POD?data.POD:""}
					                        style={{width:'60px',height:'21px'}}
					                      />
				                      </TableCell>
					                  <TableCell className={classes.tableCell} style={{padding:'5px'}}> 
					                  	<Button color="warning" size="sm" onClick={deleteRow(data.SEQ)}>삭제</Button> 
					                  </TableCell>
				                </TableRow>
				              );
				            }))}
				            <Dialog
			            		open={open}
			            		onClose={handleClose}
			            		aria-labelledby="alert-dialog-title"
				            >
				            <DialogTitle id="alert-dialog-title">{"선택한 즐겨찾기를 삭제 하시겠습니까?"}</DialogTitle>
				            <DialogActions>
				            	<Button onClick={handleClose} color="warning" size="sm" >Disagree</Button>
				            	<Button onClick={handleDelete(delSeq)} color="warning" size="sm" autoFocus>Agree</Button>
				            </DialogActions>
				           </Dialog>
				          </TableBody>
				     	</Table>	
				     </GridItem>
          </CardBody>
        </Card>
  );
}
