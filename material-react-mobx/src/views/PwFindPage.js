import React from "react";
import { Redirect} from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import localimage from 'assets/img/local.png';
import naverimage from 'assets/img/naver.png';
import facebookimage from 'assets/img/facebook.png';
import kakaoimage from 'assets/img/kakao.png';
import googleimage from 'assets/img/google.png';

import GoogleIcon from 'assets/img/sns/google.png';
import FaceIcon from 'assets/img/sns/face.png';
import KakaoIcon from 'assets/img/sns/kakao.png';
import NaverIcon from 'assets/img/sns/naver.png';
import Collapse from '@material-ui/core/Collapse';
import image from "assets/img/bg2.jpg";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(styles);

export default function LoginPage(props) {

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [loginId, setLoginId] = React.useState('');
  const [loginPw, setLoginPw] = React.useState('');
  const [check, setCheck] = React.useState("N");
  const [openNum, setOpenNum] = React.useState(false);
  const [scTitle, setScTitle] = React.useState("인증번호전송");
 
  
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  //인증번호 입력 폼
  const  handleSendNum = () => {
	   setScTitle("인증번호 재전송");
	   setOpenNum(true);
  };
  
  const onChangeIDValue = (event) => {
	  console.log (">>>>ID:"+event.target.value);
	  setLoginId(event.target.value);

  };
  
  const onChangePWValue = (event) => {

	  setLoginPw(event.target.value);

  };
  
  const handleClick = () => {

	  alert(">>id:"+loginId+"pw:"+loginPw);
	 // componentDidMount(loginId,loginPw);

	/* if (check != "Y") {
		 window.location.href = "/own/tracking";
	 } else {
		 alert("로그인 정보를 확인해 주세요.");
	 }  */
	  try{
		  //login({loginId,loginPw});
	  } catch(e) {
		  alert("failed to login");
		  setLoginId('');
		  setLoginPw('');
	  }
  };
  
  //const {from} = location.state || { from : {pathname:"/"}};
  //if(authenticated) return <Redirect to={from} />; 
  		
  const componentDidMount = (id,pw) => {
	  
	  return axios ({
			// url:'/api/getUserInfoSample',
			url:'/login',
			method:'POST',
			data: {id : id,pw : pw,}
    }).then(response => setCheck("Y"));
      
   }

   const login = () => {

    axios.post("/auth/login", {id : loginId, pw : loginPw,})
    .then(res => {
        console.log(res);
        if (res.data.message) alert(res.data.message);
        else alert(res.data.userid + " 로그인 성공");
    })
    .catch(err => {
        console.log(err);
    })
  }
  
  //  const kakao = () => {

  //   axios.get("/auth/login/kakao", {id : loginId, pw : loginPw,})
  //   .then(res => {
  //       console.log(res);
  //       if (res.data.message) alert(res.data.message);
  //       else alert(res.data.userid + " 로그인 성공");
  //   })
  //   .catch(err => {
  //       console.log(err);
  //   })
  // }
  

  // const responseKakao = () => {
  //   // console.log(res);
  // }
  
  // const responseFail = () => {
  //   // console.log(err);
  // }
  
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Plism+"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
        <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
              <Card className={classes[cardAnimaton]} style={{width:'94%'}}>
                  <CardHeader color="info" className={classes.cardHeader} style={{paddingBottom:'2px'}}>
                    <h4 style={{marginTop:'0px',marginBottom:'0px'}}>PassWord Find</h4>
                    <p style={{marginTop:'0px'}}>회원가입시 입력하셨던 이메일과 이름, 연락처를 입력해주세요.</p>
                  </CardHeader> 
                  <CardBody>
	                  <GridContainer justify="center">
	                  	<GridItem xs={12} sm={12} md={8}>
		                  <TextField id="userEmail" label="Email Address" type="text" fullWidth />
		                  <TextField id="userName" label="Name" type="text" fullWidth />
		            		<Grid container spacing={2}>
			                	<Grid item xs={12} sm={12} md={8} style={{height:'48px'}}>
			                		<TextField id="userPhone" label="Phone" type="text" placeholder="'-' 제외 하고 입력해주세요." helperText="'-' 제외 하고 입력해주세요." fullWidth />
			                	</Grid>
			                	<Grid item xs={12} sm={12} md={1}>
		                        	<Button  style={{minWidth:'100px'}} color="info" onClick={handleSendNum} fullWidth>{scTitle}</Button>
		                        </Grid>
		                    </Grid>
				            <Collapse in={openNum} timeout="auto" unmountOnExit>
		              			<TextField id="reNumber" placeholder="인증번호를 입력해주세요" type="text" style={{marginTop:'15px'}} fullWidth />
			                </Collapse>
			                <br/>   
				             <Button color="info" size="lg" onClick={handleClick} fullWidth>확인</Button>
			                </GridItem>
		                </GridContainer> 
                  </CardBody>
                  <br/> 
              </Card>
              </GridItem>
              </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
