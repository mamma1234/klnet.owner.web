import React from "react";

//import ReactDom from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { makeStyles } from "@material-ui/core/styles";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

const useStyles = makeStyles(theme => ({
  App: {
	fontFamily: "sans-sefif",
  textAlign: "center",
  backgroundColor: "white",
	height: 500
    }
}));

const indate = new Date();

const enddate = new Date();

const myEventsList = [
  {
    title:"test",
    start: indate,
    end: enddate
  },
  {
	    title:"test2",
	    start: indate,
	    end: enddate
  }
];

export default function App() {

  const classes = useStyles();
  return (
    <div className={classes.App}>
      <BigCalendar 
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        />
      </div>
  );

}