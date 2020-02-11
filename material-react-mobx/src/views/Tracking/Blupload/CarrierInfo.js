import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/TablePaging.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "components/CustomButtons/Button.js";

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
  const classess = useStyless();
  
  const [ietype,setIetype] = useState("");
  
  return (
        <Card>
        <CardHeader color="warning">
        <h4 className={classes.cardTitleWhite}>Carrier Code Search Service</h4>
        <p className={classes.cardCategoryWhite}>
          Here is a subtitle for this table
        </p>
      </CardHeader>
          <CardBody>
	 	     	<GridItem>
	 	     		<GridContainer>
			  			<GridItem xs={12} sm={12} md={9}>
			          		<TextField id="carrierKName" label="Korean Name" />
			        	</GridItem>
			        	<GridItem xs={12} sm={12} md={3}>
							<Button color="warning">조회</Button>
			        	</GridItem>
			        </GridContainer>
			     </GridItem>
		         <GridItem>
				     <Table
				          tableHeaderColor="warning"
				          tableHead={["Carrier Code", "English Name", "Korean Name"]}
				          tableData={[
				            ["SNKO", "sinokorea shipper", "시노코 코리아"],
				            ["KMD", "korea m shipper", "고려해운"],
				            ["SKR", "test shipper", "장금상선"],
				            ["DYS", "test shipper", "동영해운"],
				            ["APL", "test shipper", "APL"],
				          ]}
				        />
				     </GridItem>
          </CardBody>
        </Card>
  );
}
