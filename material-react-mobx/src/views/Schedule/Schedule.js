import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Select from '@material-ui/core/Select';

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
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>FCL Schedule</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>

          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Carrier", "Ship Type", "CVessel Name", "Voyage", "Origin", "Destination"]}
              tableData={[
                ["ONE KOREA", "Container Ship", "Aglaia", "0063", "TAURANGA 2019.11.22 (금)", "BUSAN 2019.12.06 (금)"],
                ["ONE KOREA", "Container Ship", "Safmarine Mulanje", "0944", "TAURANGA 2019.12.03 (화)", "BUSAN 2019.12.17 (화)"],
                ["ONE KOREA", "Container Ship", "Jpo Tucana", "0064", "TAURANGA 2019.12.06 (금)", "BUSAN 2019.12.20 (금)"],
                ["ONE KOREA", "Container Ship", "Nyk Futago", "0060", "TAURANGA 2019.11.01 (금)", "BUSAN 2019.11.15 (금)"],
                ["ONE KOREA", "Container Ship", "Maersk Garonne", "0941", "TAURANGA 2019.11.08 (금)", "BUSAN 2019.11.22 (금)"],
                ["ONE KOREA", "Container Ship", "Nyk Furano", "0062", "TAURANGA 2019.11.15 (금)", "BUSAN 2019.11.29 (금)"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
