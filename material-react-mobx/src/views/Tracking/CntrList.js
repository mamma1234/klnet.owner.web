import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "components/Table/TablePaging.js";
// core components
///import Grid from '@material-ui/core/Grid';
//import GridItem from "components/Grid/GridItem.js";
//import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";

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
  //const classess = useStyless();
  
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
	    axios.post("/loc/getHotInfo").then(res => setSelectData(res.data));
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
        		<h4 className={classes.cardTitleBlack}>Container List</h4>
        	</CardHeader>
        	<CardBody style={{paddingBottom:'2px'}}>   
	        	<Table
	            tableHeaderColor="primary"
	            tableHead={["no", "Container No", "Move"]}
	            tableData={[
	              ["1", "AAAA1233456", "YARD"],
	              ["2", "AAAA1233457", "GATE PICKUP"],
	              ["3", "AAAA1233458", "LOADING"],
	              ["4", "AAAA1233459", "DISCHARGING"],
	              ["5", "AAAA1233450", "GATE OUT FULL"],
	              ["6", "AAAA1233452", "EMPTY"],
	            ]}
	          />	
          </CardBody>
        </Card>
  );
}
