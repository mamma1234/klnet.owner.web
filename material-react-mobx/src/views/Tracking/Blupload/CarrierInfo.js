import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
//import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/TablePaging.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import Icon from "@material-ui/core/Icon";
//import CardIcon from "components/Card/CardIcon.js";
import TextField from '@material-ui/core/TextField';
//import MenuItem from '@material-ui/core/MenuItem';
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import IconM from "@material-ui/core/Icon";
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
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  //const classess = useStyless();
  
  const [ietype,setIetype] = useState("");
  const [selectData,setSelectData] = useState([]);
  const [openJoin,setOpenJoin] = useState(false);
  
  React.useEffect(() => {
	    console.log('effect');
	    getCarrierInfo();
	    //.then(res => console.log(JSON.stringify(res.data)));
	    
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
  function getCarrierInfo() {
	  return axios.post("/com/getCarrierInfo").then(setSelectData([])).then(res => setSelectData(res.data))
	    .catch(err => {
		       //console.log(err.response.status);
		        if(err.response.status == "403") {
		        	setOpenJoin(true);
		        }
		    });
  }
  
  const handleOpenJoin = () => {
	  setOpenJoin(true);
  };
  
  const handleJoinClose = () => {
	  setOpenJoin(false);
  }
  
  return (
        <Card>
 		<CardHeader color="info" stats icon >
		<CardIcon color="info" style={{height:'26px'}}>
			<IconM style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</IconM>
        </CardIcon>
        <h4 style={{textAlign: "left",color:"#000000"}}>Carrier Code Search</h4>
  </CardHeader>
          <CardBody>
	 	     	<GridItem>
	 	     		<GridContainer>
			  			<GridItem xs={12} sm={12} md={9}>
			          		<TextField id="carrierKName" label="Korean Name" />
			        	</GridItem>
			        	<GridItem xs={12} sm={12} md={3}>
							<Button color="info">조회</Button>
			        	</GridItem>
			        </GridContainer>
			     </GridItem>
		         <GridItem>
				     <Table
				          tableHeaderColor="info"
				          tableHead={["Carrier", "Line Carrier", "Korean ShipperName","English ShipperName"]}
				          tableData={selectData}
				        />
				     </GridItem>
          </CardBody>
          <Modal
	   		open={openJoin}
	  		onClose={handleJoinClose}
	      >
	      <JoinPage mode="0" page="/svc/tracking" reTurnText="Login" />
	   </Modal>
        </Card>
  );
}
