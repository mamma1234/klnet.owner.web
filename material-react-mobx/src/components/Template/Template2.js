import React, { useState, useEffect } from 'react';
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";

const CounterSubmit = (props) => {

  const [form1, setForm1] = useState(0);
  const [form2, setForm2] = useState(0);

  useEffect(() => {
    console.log('effect');
    console.log(form1);
    return () => {
      console.log('cleanup');
      console.log(form1);
    };
  }, []);

  useEffect(() => {
    console.log('effect value');
    console.log(form1);
    return () => {
      console.log('cleanup value');
      console.log(form1);
    };
  }, [form1]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // this.props.onCreate(this.state);
    console.log('child event call');
    console.log(props);
    props.event1(e);
    setForm1(e.target.elements.form1.value);
    setForm2(e.target.elements.form2.value);
  }
  const handleSubmit2 = (e) => {
    e.preventDefault();
    // this.props.onCreate(this.state);
    console.log('child 2 event call');
    //console.log(props);
    props.event2({e:e, form1:e.target.elements.form1.value, form2:e.target.elements.form2.value});
    setForm1(e.target.elements.form1.value);
    setForm2(e.target.elements.form2.value);
  }

  return (
    <Card>
      <div>
          <p>form1 <b>{form1}</b></p>
          <p>form2 <b>{form2}</b></p>
          <form onSubmit={handleSubmit}>
              <input type="text" name="form1" placeholder={form1} />
              <input type="text" name="form2" placeholder={form2} />
              <button type="submit">이벤트전달</button>
          </form>
          <form onSubmit={handleSubmit2}>
              <input type="text" name="form1" placeholder={form1} />
              <input type="text" name="form2" placeholder={form2} />
              <button type="submit">이벤트전달spread</button>
          </form>
      </div >
    </Card>
  );
};

export default CounterSubmit;