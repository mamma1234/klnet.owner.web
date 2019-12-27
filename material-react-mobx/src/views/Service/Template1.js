import React, { useState, useEffect } from 'react';
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

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

  const [value, setValue] = useState(0);
  const [tableHead, setTableHead] = useState(["Carrier", "Ship Type", "CVessel Name", "Voyage", "Origin", "Destination"]);
  const [tableData, setTableData] = useState([
    ["ONE KOREA1", "Container Ship", "Aglaia", "0063", "TAURANGA 2019.11.22 (금)", "BUSAN 2019.12.06 (금)"],
    ["ONE KOREA2", "Container Ship", "Safmarine Mulanje", "0944", "TAURANGA 2019.12.03 (화)", "BUSAN 2019.12.17 (화)"],
    ["ONE KOREA3", "Container Ship", "Jpo Tucana", "0064", "TAURANGA 2019.12.06 (금)", "BUSAN 2019.12.20 (금)"],
    ["ONE KOREA4", "Container Ship", "Nyk Futago", "0060", "TAURANGA 2019.11.01 (금)", "BUSAN 2019.11.15 (금)"],
    ["ONE KOREA5", "Container Ship", "Maersk Garonne", "0941", "TAURANGA 2019.11.08 (금)", "BUSAN 2019.11.22 (금)"],
    ["ONE KOREA6", "Container Ship", "Nyk Furano", "0062", "TAURANGA 2019.11.15 (금)", "BUSAN 2019.11.29 (금)"]
  ]);


  useEffect(() => {
    console.log('effect');
    console.log(value);
    return () => {
      console.log('cleanup');
      console.log(value);
    };
  }, []);

  useEffect(() => {
    console.log('effect value');
    console.log(value);
    return () => {
      console.log('cleanup value');
      console.log(value);
    };
  }, [value]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // setUsername(e.target.elements.form1.value);
    axios.post("/ora/getTestQueryAttibuteSample", { param1:e.target.elements.form1.value, param2: e.target.elements.form2.value })
    .then(setTableHead(["Carrier", "Ship Type", "CVessel Name", "Voyage", "Origin", "Destination"]))
    .then(res => setTableData(res.data));
  }
  const handleSubmit2 = (e) => {
    e.preventDefault();
    // setUsername(e.target.elements.form1.value);
    axios.post("/pg/getTestQueryAttibuteSample", { param1:e.target.elements.form1.value, param2:e.target.elements.form2.value })
    // .then(res => console.log(res.data))
    .then(res => {setTableHead(res.data.field); setTableData(res.data.record)});
    // .then(res => setTableData(res.data.record));
  } 

  return (
    <GridContainer>
      <Card>
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="form1" placeholder="Enter 20111218:" />
                <input type="text" name="form2" placeholder="Enter 20111218:" />
                <button type="submit">oracle</button>
            </form>
            <form onSubmit={handleSubmit2}>
                <input type="text" name="form1" placeholder="Enter APL:" />
                <input type="text" name="form2" placeholder="Enter N:" />
                <button type="submit">postgresql</button>
            </form>
        </div >
      </Card>
      <Card>
        <CardBody>
        <p>
          현재 카운터 값은 <b>{value}</b> 입니다.
        </p>
        <p>
          React Hooks 예제임.
          useState : state 값 관리하는 Hook
          useEffect : Rendering 시작, 종료 효과를 관리하는 Hook 로 Console.log를 보면 확인 가능함.
        </p>
        <button onClick={() => setValue(value + 1)}>+1</button>
        <button onClick={() => setValue(value - 1)}>-1</button>
        </CardBody>
      </Card>
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