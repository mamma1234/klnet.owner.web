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
import FontButton from "@material-ui/core/Button";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomInputSendNum from "components/CustomInput/CustomInputSendNum.js";
import Collapse from '@material-ui/core/Collapse';
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

import image from "assets/img/bg2.jpg";
import axios from 'axios';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Parallax from "components/Parallax/Parallax.js";
import TextField from '@material-ui/core/TextField';
import PerfectScrollbar from "perfect-scrollbar";
import { NavLink } from "react-router-dom";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import CloseIcon from "@material-ui/icons/HighlightOff";

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	
	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
		    id={'full-width-tabpanel-${index}'}
			aria-labelledby={'full-width-tab-${index}'}
			{...other}
		 >
		 {value === index && <Box p={3}>{children}</Box>}
		 </Typography>
	);
}

function allyProps(index) {
	return {
		id: 'full-width-tab-${index}','aria-controls':'full-width-tabpanel-${index}',
	};
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};


function rand() {
	return Math.round(Math.random()*20)-10;
}

function getModalStyle() {
	const top = 15 + rand();
	const left = 25 + rand();

	return {
		top: `${top}%`,
		left:`${left}%`,
		trasform:`translate(-${top}%,-${left}%)`,
	};
}

const useStyles = makeStyles(styles);

let ps;

export default function LoginPage(props) {

  const classes = useStyles();
  const {mode, reTurnText,page} = props;
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [loginId, setLoginId] = React.useState('');
  const [loginPw, setLoginPw] = React.useState('');
  const [check, setCheck] = React.useState("N");
  
  const [klnetcheck1, setKlnetcheck1] = React.useState(false);
  const [klnetcheck2, setKlnetcheck2] = React.useState(false);
  const [klnetcheck3, setKlnetcheck3] = React.useState(false);
  const [klnetAllcheck, setKlnetAllcheck] = React.useState(false);
  const [scTitle, setScTitle] = React.useState("인증번호전송");
  const [openNum, setOpenNum] = React.useState(false);
  const [openNum2, setOpenNum2] = React.useState(false);
  const [openNum3, setOpenNum3] = React.useState(false);
  const [phoneValues,setPhoneValues] = React.useState({
	  textmask:'   -    -    ',
	  numberfomat:'',
  });
  const mainPanel = React.createRef();
  
    React.useEffect(() => {

	    if (window.innerWidth >= 960) {
	    	document.getElementById("modal").style.height = "554px";  
	    	document.getElementById("modal").style.marginTop = "10%";
	    } else {
	    	document.getElementById("modal").style.height = "100%";
	    	document.getElementById("modal").style.marginTop = "0";
	    }
    	
	    if (navigator.platform.indexOf("Win") > -1) {
	      ps = new PerfectScrollbar(mainPanel.current, {
	        suppressScrollX: true,
	        suppressScrollY: false
	      });
	      document.body.style.overflow = "hidden";   
	      
	    }
	    window.addEventListener("resize", resizeFunction);
	    // Specify how to clean up after this effect:
	    
	    
	    return function cleanup() {
	      if (navigator.platform.indexOf("Win") > -1) {
	        ps.destroy();
	      }
	      window.removeEventListener("resize", resizeFunction);
	    };
	  }, [mainPanel]);
  
  const resizeFunction = () => {
	    if (window.innerWidth >= 960) {
	    	document.getElementById("modal").style.marginTop = "10%";
	    	document.getElementById("modal").style.height = "554px";  
	    } else {
	    	document.getElementById("modal").style.height = "100%";
	    	document.getElementById("modal").style.marginTop = "0";
	    }
	  };
  
  
  const [value,setValue] = React.useState(Number.parseInt(mode));
  
  const [titlemsg, setTitlemsg] = React.useState(reTurnText);
  
  const openLoginTab = () => {
	  setValue(0); 
	  setTitlemsg("Login");
  }
  const openJoinTab = () => {
	  setValue(1); 
	  setTitlemsg("KLNET 회원가입");
  }
  const openIdFindTab = () => {
	  setValue(2);
	  setTitlemsg("KLNET ID 찾기");
  }
  const openPwFindTab = () => {
	  setValue(3); 
	  setTitlemsg("KLNET PW 찾기");
  }
  
  const handleChangeIndex = index => {
	  setValue(index);
  };
 
 
  
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  
  const { ...rest } = props;


  const onChangeIDValue = (event) => {
	  setLoginId(event.target.value);

  };
  
  const onChangePWValue = (event) => {

	  setLoginPw(event.target.value);

  };

   const login = () => {

	   if(loginId != "" && loginPw != "") {
		   axios.post("/auth/login", {id : loginId, pw : loginPw,})
		    .then(res => {

		        if (res.data.message) alert(res.data.message);
		        else window.location.href = page; //alert(res.data.userid + " 로그인 성공");
		       // else window.location.href ="/";
		    })
		    .catch(err => {
		        console.log(err);
		    })
	   } else {
		   if(loginId == "") {
			   alert("로그인 아이디 는 필수 입력 값입니다.");
		   } else {
			   alert("로그인 패스워드는 필수 입력 값입니다.");
		   }
		   
	   }
    
  };
   
   const allChecked = () => {
	   
	   if (klnetAllcheck) {
		   setKlnetAllcheck(false);
		   setKlnetcheck1(false);
		   setKlnetcheck2(false);
		   setKlnetcheck3(false); 	   
	   } else {
		   setKlnetAllcheck(true);
		   setKlnetcheck1(true);
		   setKlnetcheck2(true);
		   setKlnetcheck3(true);   
	   }
	   
   };
   //인증번호 입력 폼
   const  handleSendNum = () => {
	   setScTitle("인증번호 재전송");
	   setOpenNum(true);
   };
   
   const  handleSendNum2 = () => {
	   setScTitle("인증번호 재전송");
	   setOpenNum2(true);
   };
   
   const  handleSendNum3 = () => {
	   setScTitle("인증번호 재전송");
	   setOpenNum3(true);
   };
   
   const onHandleRemark = () => {
	   console.log(">>>>>>>>>>>");
   };
    
  return (

		  <div  id="modal" ref={mainPanel} style={{maxWidth:'600px',minWidth:'340px',height:'554px',marginLeft:'auto',marginRight:'auto',marginTop:'10%'}} >
          <Card className={classes[cardAnimaton]} style={{marginBottom:'5px',marginTop:'10px'}}>
          <div style={{textAlign:'right',marginTop:'5px',marginRight:'5px'}}>
          <CloseIcon onClick={()=>props.onClose()} />
          </div>
              <CardHeader color="info" className={classes.cardHeader} style={{padding:'1px',marginLeft:'40px',marginRight:'40px'}}>
                <h4 style={{marginTop:'5px',marginBottom:'0px'}}>{titlemsg}</h4>
                <p className={classes.divider} style={{marginTop:'5px'}}>Welcome to Plism Plus. </p>
              </CardHeader>  
              <CardBody style={{padding:'0px'}}>
              
              	<SwipeableViews
                  	index={value}
                  	onChangeIndex={handleChangeIndex}
                 >
              		<TabPanel value={value} index={0}>
	              		<GridContainer>
		                  	<GridItem xs={12} sm={12} md={7} style={{textAlignLast:'center'}}>
		                  		<p className={classes.divider} style={{marginTop:'10px'}}>KLNET Account Login</p><br/>
		                  		<CustomInput
			                      labelText="Email Address"
			                      id="userId"
			                      formControlProps={{
			                        fullWidth: true
			                      }}
			                      inputProps={{
			                        type: "text",
			                        endAdornment: (
			                          <InputAdornment position="end">
			                            <People className={classes.inputIconsColor} />
			                          </InputAdornment>
			                        ),
			                        onChange:({target:{value} }) => setLoginId(value)
			                      }}
			                    />
			                    <CustomInput
			                      labelText="Password"
			                      id="passWord"
			                      formControlProps={{
			                        fullWidth: true
			                      }}
			                      inputProps={{
			                        type: "password",
			                        endAdornment: (
			                          <InputAdornment position="end">
			                            <Icon className={classes.inputIconsColor}>
			                              lock_outline
			                            </Icon>
			                          </InputAdornment>
			                        ),
			                        autoComplete: "off",
			                        onChange:({target:{value} }) => setLoginPw(value)
			                      }}
			                    />
		                  		<FontButton  size="small" style={{lineHeight:'initial'}} href="/pwfind"><font color="#3f51b5" style={{textDecoration:'underline'}}>ID & PW Find</font></FontButton>
			                    <Button color="info" size="lg" onClick={login} fullWidth>Login</Button>
					            <br/>
					            <CardFooter style={{margin:'0px'}}>
				         			New Here? <FontButton onClick={openJoinTab} size="small" style={{lineHeight:'initial',fontWeight:'blod'}} ><font color="#3f51b5" style={{textDecoration:'underline'}}>Create an account</font></FontButton>
				         		</CardFooter>
			                    </GridItem>
			                    <GridItem xs={12} sm={12} md={5} >
			                    	<p className={classes.divider} style={{marginTop:'10px',marginBottom:'10px'}}>Social Account Login</p>
				                        <div className="button-container">
				                        <Button
			                            style={{backgroundColor:'white',borderRadius:'10px',borderStyle:'solid',borderColor:'#ffe812',color:'#6f6e6e',fontWeight:'bolder',padding:'3px',placeContent:'initial',margin:'3px'}}
			                            href="https://kauth.kakao.com/oauth/authorize?client_id=0b6d98316119442e856dd2ad7497df14&redirect_uri=http://localhost:5000/auth/kakao/callback&response_type=code&state=12345"
			                            target="_blank"
			                            fullWidth
			                          >&nbsp;&nbsp;<img src={KakaoIcon} alt="카카오SNS" width="40" height="40"></img>&nbsp;&nbsp;&nbsp;&nbsp;Kakao Login
			                          </Button>
				                        </div>
				                        <div className="button-container">
				                        <Button
				                        style={{backgroundColor:'white',borderRadius:'10px',borderStyle:'solid',borderColor:'#1EC800',color:'#6f6e6e',fontWeight:'bolder',padding:'3px',placeContent:'initial',margin:'3px'}}
				                          fullWidth
				                          href="https://nid.naver.com/oauth2.0/authorize?client_id=5vSPppBEGLWEwMT8p9kZ&redirect_uri=http://localhost:5000/auth/naver/callback&response_type=code&state=12345"
				                          target="_blank"
				                        >&nbsp;&nbsp;<img src={NaverIcon} alt="네이버SNS" width="40" height="40"></img>&nbsp;&nbsp;&nbsp;&nbsp;Naver Login
				                        </Button>
				                      </div>
				                        <div className="button-container">
				                          <Button
				                            style={{backgroundColor:'white',borderRadius:'10px',borderStyle:'solid',borderColor:'#3b5998',color:'#6f6e6e',fontWeight:'bolder',padding:'3px',placeContent:'initial',margin:'3px'}}
				                            href="https://www.facebook.com/v5.0/dialog/oauth?client_id=184064786168643&redirect_uri=http://localhost:5000/auth/facebook/callback&response_type=code&state=12345"
				                            target="_blank"
				                            fullWidth
				                          >&nbsp;&nbsp;<img src={FaceIcon} alt="페이스북SNS" width="40" height="40"></img>&nbsp;&nbsp;&nbsp;&nbsp;FaceBook Login
				                          </Button>
				                        </div>
				                      <div className="button-container">
				                        <Button
				                          style={{backgroundColor:'white',borderColor:'red',borderRadius:'10px',borderStyle:'solid',borderColor:'#db3236',color:'#6f6e6e',fontWeight:'bolder',padding:'3px',placeContent:'initial',margin:'3px'}}
				                          fullWidth
				                          href="https://accounts.google.com/o/oauth2/v2/auth?client_id=684197542136-kkba8s7e8a1l6pnqdio46vgdgkfkhsmn.apps.googleusercontent.com&redirect_uri=http://localhost:5000/auth/google/callback&response_type=code&scope=profile&state=12345"
				                          target="_blank"
				                        >&nbsp;&nbsp;<img src={GoogleIcon} alt="구글SNS" width="40" height="40"></img>&nbsp;&nbsp;&nbsp;&nbsp;Google Login
				                        </Button>
				                        </div>
			                    </GridItem>
		                 </GridContainer>
	                </TabPanel>
	                <TabPanel value={value} index={1}>
			                <GridContainer>
			                  	<GridItem xs={12} sm={12} md={6} style={{textAlignLast:'center'}}>
			                  		{/*}<CustomInput
				                      labelText="Email Address"
				                      id="userId"
				                      formControlProps={{
				                        fullWidth: true
				                      }}
				                      inputProps={{
				                        type: "text",
				                        endAdornment: (
				                          <InputAdornment position="end">
				                            <People className={classes.inputIconsColor} />
				                          </InputAdornment>
				                        ),
				                        onChange:({target:{value} }) => setLoginId(value)
				                      }}
				                    />*/}
				                    <TextField id="userEmail" label="Email Address" type="text" fullWidth />
				                    <TextField id="passWord" label="Password" type="password" 
				                    	placeholder="8자 이상의 영문,숫자를 함께 입력해주세요."
				                    	autoComplete="current-password" fullWidth />
				                    {/* <CustomInput
				                      labelText="Password"
				                      id="passWord"
				                      formControlProps={{
				                        fullWidth: true
				                      }}
				                      inputProps={{
				                        type: "password",
				                        placeholder:"8자 이상의 영문,숫자를 함께 입력해주세요.",
				                        endAdornment: (
				                          <InputAdornment position="end">
				                            <Icon className={classes.inputIconsColor}>
				                              lock_outline
				                            </Icon>
				                          </InputAdornment>
				                        ),
				                        autoComplete: "off",
				                        onChange:({target:{value} }) => setLoginPw(value)
				                      }}
				                    />
			                  		<CustomInput
				                      labelText="Password Confirm"
				                      id="pass"
				                      formControlProps={{
				                        fullWidth: true
				                      }}
				                      inputProps={{
				                        type: "password",
				                        endAdornment: (
				                          <InputAdornment position="end">
				                            <Icon className={classes.inputIconsColor}>
				                              lock_outline
				                            </Icon>
				                          </InputAdornment>
				                        ),
				                        autoComplete: "off",
				                        onChange:({target:{value} }) => setLoginPw(value)
				                      }}
				                    />*/}
				                    <TextField id="passWord_confirm" 
				                    		   label="Password Confirm" 
				                    		   type="password" 
				                    		   autoComplete="current-password"
				                    		   placeholder="8자 이상의 영문,숫자를 함께 입력해주세요."
				                    		   helperText="다시한번 입력해주세요." fullWidth />
				                    <TextField id="userName" label="Name" type="text" fullWidth />
				                    <TextField id="comName" label="Company Name" type="text" fullWidth />
				                    {/*}<CustomInput
					                      labelText="Name"
					                      id="userName"
					                      formControlProps={{
					                        fullWidth: true
					                      }}
					                      inputProps={{
					                        type: "text",
					                        onChange:({target:{value} }) => setLoginId(value)
					                      }}
					                    />
					                    <CustomInput
					                      labelText="Company Name"
					                      id="comName"
					                      formControlProps={{
					                        fullWidth: true
					                      }}
					                      inputProps={{
					                        type: "text",
					                        onChange:({target:{value} }) => setLoginId(value)
					                      }}
					                    />
			                  		<CustomInputSendNum
						               labelText="Phone"
						               id="userPhone" 
						               formControlProps={{
						                 fullWidth: true
						               }}
						               inputProps={{
						                 type: "text",
						                 placeholder:"'-' 제외 하고 입력해주세요.",
						                 //helperText:"'-' 제외 하고 입력해주세요.",
						                 onChange:({target:{value} }) => setLoginId(value),
						                 fullWidth: true
						                }}
			            		      handleProps={{
			            		    	  onClick:handleSendNum3,
			            		    	  fullWidth: true
			               		      }}
				                      title={scTitle}
						            />*/}
			                  		<Grid container spacing={1}>
			                      	<Grid item xs={12} sm={12} md={7} style={{height:'48px'}}>
			                      	<TextField id="userPhone" label="Phone" type="text" placeholder="'-' 제외 하고 입력해주세요." fullWidth />
			                      	</Grid>
			                        <Grid item xs={12} sm={12} md={1}>
			                        <Button  style={{minWidth:'100px'}} color="info" onClick={handleSendNum3} fullWidth>인증번호전송</Button>
			                        </Grid>
			                        </Grid>
						            <Collapse in={openNum3} timeout="auto" unmountOnExit>
				                  		{
				                  		/*<CustomInput
				                  		
					                      labelText="인증번호입력"
					                      id="first"
					                      formControlProps={{
					                        fullWidth: true
					                      }}
					                      inputProps={{
					                        type: "text",
					                        //onChange:({target:{value} }) => setLoginId(value)
					                      }}
					                    />*/}
				                  		<TextField id="reNumber" placeholder="인증번호를 입력해주세요" type="text" fullWidth />
					                   </Collapse>
				                    </GridItem>
				                    
				                    <GridItem xs={12} sm={12} md={6} >    	
			                    	<p className={classes.divider}>약관 동의</p>
			                    	<Checkbox value="Y" checked={klnetAllcheck} style={{padding:'0px'}} onChange={allChecked} /><font size="2">이용약관 및 선택항목에 모두 동의합니다.</font><br/>
			                    	&nbsp;<Checkbox style={{padding:'0px'}} value="Y" checked={klnetcheck1} onChange={e => setKlnetcheck1(!klnetcheck1)} />
			                    	<font size="1">케이엘넷 서비스 이용약관&nbsp;<a onClick={onHandleRemark}>[내용보기]</a></font><br/>
			                    	&nbsp;<Checkbox style={{padding:'0px'}} value="Y" checked={klnetcheck3} onChange={e => setKlnetcheck3(!klnetcheck3)} /><font size="1">개인정보 수집 이용 동의&nbsp;<a>[내용보기]</a></font><br/>
			                    	<br/><br/>
			                    	<img src={require("assets/img/logo.png")} />
			                    	</GridItem>
				                    
			                 </GridContainer>
			                 <CardFooter style={{margin:'0px'}}>
			                 <Button color="info" onClick={openLoginTab} fullWidth>Login</Button>|
			                 <Button color="info" fullWidth>Join Membership</Button>
			         		  </CardFooter>
	                </TabPanel> 
	          
                  </SwipeableViews>
              </CardBody>
          </Card>
    </div>
  );
}
