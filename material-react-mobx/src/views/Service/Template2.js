import React, { useState, useEffect } from 'react';
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CouterSubmit from "components/Template/Template2.js";

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

const Counter = () => {
  const classes = useStyles();

  const [pform1, setPform1] = useState(0);
  const [pform2, setPform2] = useState(0);
  const [tableHead, setTableHead] = useState(["Carrier", "Ship Type", "CVessel Name", "Voyage", "Origin", "Destination"]);
  const [tableData, setTableData] = useState([
    ["ONE KOREA1", "Container Ship", "Aglaia", "0063", "TAURANGA 2019.11.22 (금)", "BUSAN 2019.12.06 (금)"],
    ["ONE KOREA2", "Container Ship", "Safmarine Mulanje", "0944", "TAURANGA 2019.12.03 (화)", "BUSAN 2019.12.17 (화)"]
  ]);


  useEffect(() => {
    console.log('effect');
    console.log(pform1);
    return () => {
      console.log('cleanup');
      console.log(pform1);
    };
  }, []);

  useEffect(() => {
    console.log('effect value');
    console.log(pform1);
    return () => {
      console.log('cleanup value');
      console.log(pform1);
    };
  }, [pform1]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('parent event call');
    console.log(e.target.elements.form1.value);
    console.log(e.target.elements.form2.value);

    setTableData([
      ["ONE KOREA1", "Container Ship", "Aglaia", "0063", "TAURANGA 2019.11.22 (금)", "BUSAN 2019.12.06 (금)"],
      ["ONE KOREA2", "Container Ship", "Safmarine Mulanje", "0944", "TAURANGA 2019.12.03 (화)", "BUSAN 2019.12.17 (화)"],
      ["ONE KOREA3", "Container Ship", "Jpo Tucana", "0064", "TAURANGA 2019.12.06 (금)", "BUSAN 2019.12.20 (금)"],
      ["ONE KOREA4", "Container Ship", "Nyk Futago", "0060", "TAURANGA 2019.11.01 (금)", "BUSAN 2019.11.15 (금)"],
      ["ONE KOREA5", "Container Ship", "Maersk Garonne", "0941", "TAURANGA 2019.11.08 (금)", "BUSAN 2019.11.22 (금)"],
      ["ONE KOREA6", "Container Ship", "Nyk Furano", "0062", "TAURANGA 2019.11.15 (금)", "BUSAN 2019.11.29 (금)"]
    ]);

    setPform1(e.target.elements.form1.value);
    setPform2(e.target.elements.form2.value);
  }
  const handleSubmit2 = ({...arg}) => {
    //e.preventDefault();
    arg.e.preventDefault();
    console.log('parent 2 event call');
    console.log(arg);
    console.log(arg.e);
    console.log(arg.form1);
    console.log(arg.form2);
    // console.log(e.target.elements.form1.value);
    // console.log(e.target.elements.form2.value);

    setTableData([
      ["ONE KOREA7", "Container Ship", "Aglaia", "0063", "TAURANGA 2019.11.22 (금)", "BUSAN 2019.12.06 (금)"],
      ["ONE KOREA8", "Container Ship", "Safmarine Mulanje", "0944", "TAURANGA 2019.12.03 (화)", "BUSAN 2019.12.17 (화)"],
      ["ONE KOREA9", "Container Ship", "Jpo Tucana", "0064", "TAURANGA 2019.12.06 (금)", "BUSAN 2019.12.20 (금)"],
      ["ONE KOREA10", "Container Ship", "Nyk Futago", "0060", "TAURANGA 2019.11.01 (금)", "BUSAN 2019.11.15 (금)"],
      ["ONE KOREA11", "Container Ship", "Maersk Garonne", "0941", "TAURANGA 2019.11.08 (금)", "BUSAN 2019.11.22 (금)"],
      ["ONE KOREA12", "Container Ship", "Nyk Furano", "0062", "TAURANGA 2019.11.15 (금)", "BUSAN 2019.11.29 (금)"]
    ]);

    setPform1(arg.form1);
    setPform2(arg.form2);    
  }


  return (
    <GridContainer>
      <CouterSubmit event1={handleSubmit} event2={handleSubmit2}/>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>FCL Schedule</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
            <p>form1 <b>{pform1}</b></p>
            <p>form2 <b>{pform2}</b></p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={tableHead}
              tableData={tableData}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
        
  );
};

export default Counter;