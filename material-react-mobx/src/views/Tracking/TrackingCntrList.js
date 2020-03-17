import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "components/Table/TablePaging.js";
import TableS from "views/Tracking/TrackingCurrent.js";
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

export default function TableList(props) {
  const classes = useStyles();
  //const classess = useStyless();
  
  const {blNo,carrierCode} = props;
  
  console.log(blNo);
  
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
	  console.log("blNo:"+blNo+"carrer:"+carrierCode);
	    axios.post("/loc/getCntrList",{ carriercode:carrierCode,blno: blNo, }).then(res => setSelectData(res.data))
	    //.then(res => console.log(JSON.stringify(res.data)));
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
  
  
  return (
        <Card>
        	<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
        		<CardIcon color="info">
        			<Icon>content_copy</Icon>
        		</CardIcon>
        		<h4 className={classes.cardTitleBlack}>Container List</h4>
        		<p className={classes.cardTitleBlack}>BL & BKG NO :{blNo}</p>
        	</CardHeader>
        	<CardBody style={{paddingBottom:'2px'}}>   
	        	<TableS
	            tableHeaderColor="info"
	            tableHead={["no", "Container No", "TIME/VESSEL VOYAGE","EVENT","LOCATION"]}
	            tableData={selectData}
	          />	
          </CardBody>
        </Card>
  );
}
