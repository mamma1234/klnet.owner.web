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

import Link from '@material-ui/core/Link';

import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

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

export default function LoginPage(props) {

  const {mode, reTurnText} = props;
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [loginId, setLoginId] = React.useState('');
  const [loginPw, setLoginPw] = React.useState('');
  const [check, setCheck] = React.useState("N");
  
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
  const classes = useStyles();
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
		        console.log(res);
		        if (res.data.message) alert(res.data.message);
		        else window.location.href = "/"; //alert(res.data.userid + " 로그인 성공");
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
    
  }
    
  return (
		  <div style={{maxWidth:'max-content',height:'460px',position:'absolute',top:'10%',left:'25%',right:'25%'}} >
          <Card className={classes[cardAnimaton]}>
            <form className={classes.form}>
              <CardHeader color="warning" className={classes.cardHeader} style={{padding:'1px'}}>
                <h4 style={{marginBottom:'0px'}}>{titlemsg}</h4>
                <p className={classes.divider} style={{marginTop:'5px'}}>Plism Plus 방문을 환영 합니다.</p>
              </CardHeader>  
              <CardBody style={{padding:'0px'}}>
              	<SwipeableViews
                  	index={value}
                  	onChangeIndex={handleChangeIndex}
                 >
              		<TabPanel value={value} index={0}>
	              		<GridContainer>
		                  	<GridItem xs={12} sm={12} md={6} style={{textAlignLast:'center'}}>
		                  		<p className={classes.divider}>KLNET 계정으로 로그인</p>
		                  		<CustomInput
			                      labelText="Login ID"
			                      id="login"
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
			                    />
			                    <pre>  </pre>
			                    <Button color="warning" size="lg" onClick={login} fullWidth>
					               Login
					             </Button>
							          <CardFooter style={{margin:'0px'}}>
					         			<FontButton onClick={openIdFindTab} size="small">아이디 찾기</FontButton>|
					         			<FontButton onClick={openPwFindTab} size="small">비밀번호 재설정</FontButton>|
					         			<FontButton onClick={openJoinTab} size="small">회원가입</FontButton>
					         		  </CardFooter>
			                    </GridItem>
			                    <GridItem xs={12} sm={12} md={6} >
			                    	<p className={classes.divider}>SNS계정으로 로그인</p>
				                        <div className="button-container">
				                        <Button
			                            style={{backgroundColor:'#f5f500',color:'black',padding:'5px',placeContent:'initial'}}
			                            href="https://kauth.kakao.com/oauth/authorize?client_id=0b6d98316119442e856dd2ad7497df14&redirect_uri=http://localhost:5000/auth/kakao/callback&response_type=code&state=12345"
			                            target="_blank"
			                            fullWidth
			                          >&nbsp;&nbsp;<img src={KakaoIcon} alt="카카오SNS" width="40" height="40"></img>&nbsp;&nbsp;&nbsp;&nbsp;카카오계정으로 로그인
			                          </Button>
				                        </div>
				                        <div className="button-container">
				                        <Button
				                        style={{backgroundColor:'#008000c7',padding:'5px',placeContent:'initial'}}
				                          fullWidth
				                          href="https://nid.naver.com/oauth2.0/authorize?client_id=5vSPppBEGLWEwMT8p9kZ&redirect_uri=http://localhost:5000/auth/naver/callback&response_type=code&state=12345"
				                          target="_blank"
				                        >&nbsp;&nbsp;<img src={NaverIcon} alt="네이버SNS" width="40" height="40"></img>&nbsp;&nbsp;&nbsp;&nbsp;네이버계정으로 로그인
				                        </Button>
				                      </div>
				                        <div className="button-container">
				                          <Button
				                            style={{backgroundColor:'#3f51b5',padding:'5px',placeContent:'initial'}}
				                            href="https://www.facebook.com/v5.0/dialog/oauth?client_id=184064786168643&redirect_uri=http://localhost:5000/auth/facebook/callback&response_type=code&state=12345"
				                            target="_blank"
				                            fullWidth
				                          >&nbsp;&nbsp;<img src={FaceIcon} alt="페이스북SNS" width="40" height="40"></img>&nbsp;&nbsp;&nbsp;&nbsp;페이스북계정으로 로그인
				                          </Button>
				                        </div>
				                      <div className="button-container">
				                        <Button
				                          style={{backgroundColor:'white',padding:'5px',color:'black',placeContent:'initial'}}
				                          fullWidth
				                          href="https://accounts.google.com/o/oauth2/v2/auth?client_id=684197542136-kkba8s7e8a1l6pnqdio46vgdgkfkhsmn.apps.googleusercontent.com&redirect_uri=http://localhost:5000/auth/google/callback&response_type=code&scope=profile&state=12345"
				                          target="_blank"
				                        >&nbsp;&nbsp;<img src={GoogleIcon} alt="구글SNS" width="40" height="40"></img>&nbsp;&nbsp;&nbsp;&nbsp;구글계정으로 로그인
				                        </Button>
				                        </div>
			                    </GridItem>
		                 </GridContainer>
	                </TabPanel>
	                <TabPanel value={value} index={1}>
			                <GridContainer>
			                  	<GridItem xs={12} sm={12} md={6} style={{textAlignLast:'center'}}>
			                  		<CustomInput
				                      labelText="Login ID"
				                      id="first"
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
				                    />
			                  		<CustomInput
				                      labelText="Password"
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
				                    />
				                    <CustomInput
					                      labelText="이름"
					                      id="first"
					                      formControlProps={{
					                        fullWidth: true
					                      }}
					                      inputProps={{
					                        type: "text",
					                        onChange:({target:{value} }) => setLoginId(value)
					                      }}
					                    />
					                    <CustomInput
					                      labelText="상호"
					                      id="first"
					                      formControlProps={{
					                        fullWidth: true
					                      }}
					                      inputProps={{
					                        type: "text",
					                        onChange:({target:{value} }) => setLoginId(value)
					                      }}
					                    />
					                    <CustomInput
				                      labelText="연락처"
				                      id="first"
				                      formControlProps={{
				                        fullWidth: true
				                      }}
				                      inputProps={{
				                        type: "text",
				                        onChange:({target:{value} }) => setLoginId(value)
				                      }}
				                    />
			                  		<CustomInput
				                      labelText="연락처 실명인증"
				                      id="first"
				                      formControlProps={{
				                        fullWidth: true
				                      }}
				                      inputProps={{
				                        type: "text",
				                        onChange:({target:{value} }) => setLoginId(value)
				                      }}
				                    />
				                    </GridItem>
				                    <GridItem xs={12} sm={12} md={6} >
				                    
			                    	<p className={classes.divider}>약관 동의</p>
			                    	<Checkbox style={{padding:'0px'}}/><font size="2">케이엘넷 이용약관 및 선택항목에 모두 동의합니다.</font><br/>
			                    	&nbsp;<Checkbox style={{padding:'0px'}}/><font size="1">케이엘넷 이용약관&nbsp;<a>[내용보기]</a></font><br/>
			                    	&nbsp;<Checkbox style={{padding:'0px'}}/><font size="1">개인정보 제3자 제공 및 동의안내&nbsp;<a>[내용보기]</a></font><br/>
			                    	<Checkbox style={{padding:'0px'}}/><font size="2">선택항목에 모두 동의합니다.</font><br/>
			                    	&nbsp;<Checkbox style={{padding:'0px'}}/><font size="1">서비스 안내를 위한 개인정보 수집 이용 동의&nbsp;<a>[내용보기]</a></font><br/>
			                    	&nbsp;<Checkbox style={{padding:'0px'}}/><font size="1">메일,휴대전화 등을 통한 신규 서비스 및 이벤트 안내 정보 수신 동의&nbsp;<a>[내용보기]</a></font><br/>
				                    </GridItem>
			                 </GridContainer>
			                 <CardFooter style={{margin:'0px'}}>
			                 <Button color="warning" onClick={openLoginTab} fullWidth>로그인</Button>|
			                 <Button color="warning" fullWidth> 회원가입</Button>
			         		  </CardFooter>
	                </TabPanel> 
	                <TabPanel value={value} index={2}>
	                <GridContainer>
                  	<GridItem xs={12} sm={12} md={6} style={{textAlignLast:'center'}}>
                  		<p className={classes.divider}>Login ID Find</p>

                  		<CustomInput
	                      labelText="로그인 아이디"
	                      id="first"
	                      formControlProps={{
	                        fullWidth: true
	                      }}
	                      inputProps={{
	                        type: "text",
	                        onChange:({target:{value} }) => setLoginId(value)
	                      }}
	                    />
	                    <CustomInput
	                      labelText="이름"
	                      id="first"
	                      formControlProps={{
	                        fullWidth: true
	                      }}
	                      inputProps={{
	                        type: "text",
	                        onChange:({target:{value} }) => setLoginId(value)
	                      }}
	                    />	                  		<pre>  </pre>
	                    </GridItem>
	                    <GridItem xs={12} sm={12} md={6} ><pre>  </pre>
		                    <CustomInput
		                      labelText="연락처"
		                      id="first"
		                      formControlProps={{
		                        fullWidth: true
		                      }}
		                      inputProps={{
		                        type: "text",
		                        onChange:({target:{value} }) => setLoginId(value)
		                      }}
		                    />
	                  		<CustomInput
		                      labelText="연락처 실명인증"
		                      id="first"
		                      formControlProps={{
		                        fullWidth: true
		                      }}
		                      inputProps={{
		                        type: "text",
		                        onChange:({target:{value} }) => setLoginId(value)
		                      }}
		                    />	                  		<pre>  </pre>
	                    </GridItem>
	                 </GridContainer>
	                 <CardFooter style={{margin:'0px'}}>
	         			<Button color="warning" onClick={openLoginTab}>이전</Button>
	         		  </CardFooter>
	                </TabPanel>
	                <TabPanel value={value} index={3}>
	                <GridContainer>
                  	<GridItem xs={12} sm={12} md={6} style={{textAlignLast:'center'}}>
                  		<p className={classes.divider}>PassWord Find</p>

                  		<CustomInput
	                      labelText="로그인 아이디"
	                      id="first"
	                      formControlProps={{
	                        fullWidth: true
	                      }}
	                      inputProps={{
	                        type: "text",
	                        onChange:({target:{value} }) => setLoginId(value)
	                      }}
	                    />
	                    <CustomInput
	                      labelText="이름"
	                      id="first"
	                      formControlProps={{
	                        fullWidth: true
	                      }}
	                      inputProps={{
	                        type: "text",
	                        onChange:({target:{value} }) => setLoginId(value)
	                      }}
	                    />	                  		<pre>  </pre>
	                    </GridItem>
	                    <GridItem xs={12} sm={12} md={6} >
	                    <pre>  </pre>
		                    <CustomInput
		                      labelText="연락처"
		                      id="first"
		                      formControlProps={{
		                        fullWidth: true
		                      }}
		                      inputProps={{
		                        type: "text",
		                        onChange:({target:{value} }) => setLoginId(value)
		                      }}
		                    />
	                  		<CustomInput
		                      labelText="연락처 실명인증"
		                      id="first"
		                      formControlProps={{
		                        fullWidth: true
		                      }}
		                      inputProps={{
		                        type: "text",
		                        onChange:({target:{value} }) => setLoginId(value)
		                      }}
		                    />	                  		<pre>  </pre>
	                    </GridItem>
	                 </GridContainer>
	                 <CardFooter style={{margin:'0px'}}>
	         			<Button color="warning"  onClick={openLoginTab}>이전</Button>
	         		  </CardFooter>
	                </TabPanel>
                  </SwipeableViews>
              </CardBody>
            </form>
          </Card>
    </div>
  );
}
