import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
//import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
//import TextField from '@material-ui/core/TextField';
//import MenuItem from '@material-ui/core/MenuItem';
import Button from "components/CustomButtons/Button.js";
//import DeleteIcon from '@material-ui/icons/DeleteForever';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
//import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from '@material-ui/core/Modal';
import JoinPage from "components/Form/Common/JoinPage.js";
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

export default function TableList(props) {
  const classes = useStyles();
//  const classess = useStyless();
  
  const [selectData,setSelectData] = useState([]);
  //const [ietype,setIetype] = useState("");
  const [open, setOpen] = useState(false);
  const [delSeq, setDelSeq] = useState("");
  const [openJoin,setOpenJoin] = useState(false);
 /* const onClickDelete = () => {
	  confirm({description:'정말로 삭제 하시겠습니까?'}).then(()=>{});
	  console.log(">>>>>");
  };*/

  const handleOpenJoin = () => {
	  setOpenJoin(true);
  };
  
  const handleJoinClose = () => {
	  setOpenJoin(false);
  }
  
  const handleClose = () => {
	setOpen(false);  
  };
  
  useEffect(() => {
	    console.log('호출....');
	    axios.post("/loc/getBookMark").then(setSelectData([])).then(res => setSelectData(res.data))
	    //.then(res => console.log(JSON.stringify(res.data)))
	    .catch(err => {
		       //console.log(err.response.status);
		        if(err.response.status == "403") {
		        	setOpenJoin(true);
		        }
		    });
	    
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
  const changeText = (id,name) => e => { 	     
	    const { 
	      target: { value } 
	    } = e; 

	    const tempRows = selectData.map(row => { 
	    	console.log(">>>"+row[0]);
	      if (row[0] == id) {
		    if(name == "vessel") {   
		      row[1] = value; 
		    } else if (name == "ie") { 
		      row[2] = value; 
		    } else if (name == "pol") { 
		      row[3] = value; 
		    } else if (name == "pod") { 
		      row[4] = value; 
		    } 
	      } 
	      return row; 
	    }); 
	  console.log("!!:"+JSON.stringify(tempRows)); 
	  setSelectData(tempRows); 
	  }; 

	  const addRow = () => { 
		  console.log("add row"+selectData.length);
		  const seq = selectData.length +1;
	    let data = [seq,"","","",""]; 
	    
	    setSelectData([...selectData, data]); 
	  }; 
	  
	  const deleteRow = id => () => { 
		  setDelSeq(id);  
		  setOpen(true);  
	  };
	  
	  
	  const handleDelete = id => () => {
		  let tempRows = selectData.filter(row => {
		      return row[0] !== id; 
		    }); 
		    setSelectData(tempRows);
		    handleClose();
	  };
	    
  return (
        <Card>
        	<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
	    		<CardIcon color="info" style={{height:'26px'}}>
				<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
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
									<Button color="info" onClick={addRow} size="sm">추가</Button>
									<Button color="info" size="sm">저장</Button>
						</GridItem>
					</GridContainer>
				</GridItem>
		        <GridItem>
				    	<Table className={classes.table}>
				     		<TableHead>
				     			<TableRow className={classes.tableHeadRow}>
					     			<TableCell style={{color:"#00acc1",padding:'8px'}}>Vessel</TableCell>
					     			<TableCell style={{color:"#00acc1",padding:'8px'}}>I/E</TableCell>
					     			<TableCell style={{color:"#00acc1",padding:'8px'}}>POL</TableCell>
					     			<TableCell style={{color:"#00acc1",padding:'8px'}}>POD</TableCell>
					     			<TableCell style={{color:"#00acc1",padding:'8px'}}>Action</TableCell>
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
					                        onChange={changeText(data[0],'vessel')} 
					                        value={data[1]?data[1]:""}
					                        style={{width:'150px',height:'21px'}}
					                      />
				                      </TableCell>
				                      <TableCell className={classes.tableCell} style={{padding:'3px'}}>
					                      <input 
					                      	type="text" 
					                      	onChange={changeText(data[0],'ie')} 
					                      	value={data[2]?data[2]:""} 
					                        style={{width:'25px',height:'21px'}}
					                       />
				                      </TableCell>
				                      <TableCell className={classes.tableCell} style={{padding:'3px'}}>
					                      <input 
					                      	type="text"
					                      	onChange={changeText(data[0],'pol')} 
					                      	value={data[3]?data[3]:""}
					                        style={{width:'60px',height:'21px'}}
					                      />
				                      </TableCell>
				                      <TableCell className={classes.tableCell} style={{padding:'3px'}}>
					                      <input 
					                      	type="text" 
					                      	onChange={changeText(data[0],'pod')} 
					                      	value={data[4]?data[4]:""}
					                        style={{width:'60px',height:'21px'}}
					                      />
				                      </TableCell>
					                  <TableCell className={classes.tableCell} style={{padding:'5px'}}> 
					                  	<Button color="info" size="sm" onClick={deleteRow(data[0])}>삭제</Button> 
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
				            	<Button onClick={handleClose} color="info" size="sm" >Disagree</Button>
				            	<Button onClick={handleDelete(delSeq)} color="info" size="sm" autoFocus>Agree</Button>
				            </DialogActions>
				           </Dialog>
				          </TableBody>
				     	</Table>	
				     </GridItem>
				        <Modal
			     		open={openJoin}
			    		onClose={handleJoinClose}
			        >
			        <JoinPage mode="0" page="/svc/tracking" onClose ={()=>setOpenJoin(false)} reTurnText="Login" />
			     </Modal>
          </CardBody>
        </Card>
  );
}
