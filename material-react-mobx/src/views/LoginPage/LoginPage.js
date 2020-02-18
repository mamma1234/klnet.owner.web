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

import image from "assets/img/bg2.jpg";
import axios from 'axios';

import Link from '@material-ui/core/Link';

const useStyles = makeStyles(styles);

export default function LoginPage(props) {

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [loginId, setLoginId] = React.useState('');
  const [loginPw, setLoginPw] = React.useState('');
  const [check, setCheck] = React.useState("N");
  
 
  
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;


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
  		
  {/*  const componentDidMount = (id,pw) => {
	  
	  return axios ({
			// url:'/api/getUserInfoSample',
			url:'/login',
			method:'POST',
			data: {id : id,pw : pw,}
    }).then(response => setCheck("Y"));
      
   }*/}

   const login = () => {
	   alert(">>id:"+loginId+"pw:"+loginPw);
    axios.post("/auth/login", {id : loginId, pw : loginPw,})
    .then(res => {
        console.log(res);
        if (res.data.message) alert(res.data.message);
        else window.location.href = "/own/tracking"; //alert(res.data.userid + " 로그인 성공");
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
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="warning" className={classes.cardHeader} style={{padding:'1px'}}>
                    <h4 style={{marginBottom:'0px'}}>Login</h4>
                    <p className={classes.divider} style={{marginTop:'5px'}}>Plism Plus 방문을 환영 합니다.</p>
                  </CardHeader>  
                  <CardBody>
                  	<GridContainer>
	                  	<GridItem xs={12} sm={12} md={5} style={{textAlignLast:'center'}}>
	                  		<p className={classes.divider}>KLNET 계정으로 로그인</p>
	                  		<pre>  </pre>
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
		                    <pre>  </pre>
		                    <Button color="warning" size="lg" onClick={login} fullWidth>
				               Login
				             </Button>
						          <CardFooter>
				         			<Link to="/own/register">아이디 찾기</Link>|
				         			<Link to="/own/register">비밀번호 재설정</Link>|
				         			<Link to="/own/register">회원가입</Link>
				         		  </CardFooter>
		                    </GridItem>
		                    <GridItem xs={12} sm={12} md={1} style={{textAlignLast:'center'}}>
		                    </GridItem>
		                    <GridItem xs={12} sm={12} md={5} >
		                    	<p className={classes.divider}>SNS계정으로 로그인</p>
			                        <div className="button-container">
			                          <Button
			                            style={{backgroundColor:'#f5f500',color:'black',padding:'5px',placeContent:'initial'}}
			                            href="https://kauth.kakao.com/oauth/authorize?client_id=0b6d98316119442e856dd2ad7497df14&redirect_uri=http://localhost:5000/auth/kakao/callback&response_type=code&state=12345"
			                            target="_blank"
			                            fullWidth
			                          >&nbsp;&nbsp;<img src={KakaoIcon} alt="카카오SNS" width="40" height="40"></img>&nbsp;&nbsp;&nbsp;&nbsp;LOGIN TO USER KAKAO ACCESS
			                          </Button>
			                        </div>
			                        <div className="button-container">
			                        <Button
			                        style={{backgroundColor:'#008000c7',padding:'5px',placeContent:'initial'}}
			                          fullWidth
			                          href="https://nid.naver.com/oauth2.0/authorize?client_id=5vSPppBEGLWEwMT8p9kZ&redirect_uri=http://localhost:5000/auth/naver/callback&response_type=code&state=12345"
			                          target="_blank"
			                        >&nbsp;&nbsp;<img src={NaverIcon} alt="네이버SNS" width="40" height="40"></img>&nbsp;&nbsp;&nbsp;&nbsp;LOGIN TO USER NAVER ACCESS
			                        </Button>
			                      </div>
			                        <div className="button-container">
			                          <Button
			                            style={{backgroundColor:'#3f51b5',padding:'5px',placeContent:'initial'}}
			                            href="https://www.facebook.com/v5.0/dialog/oauth?client_id=184064786168643&redirect_uri=http://localhost:5000/auth/facebook/callback&response_type=code&state=12345"
			                            target="_blank"
			                            fullWidth
			                          >&nbsp;&nbsp;<img src={FaceIcon} alt="페이스북SNS" width="40" height="40"></img>&nbsp;&nbsp;&nbsp;&nbsp;LOGIN TO USER FACEBOOK ACCESS
			                          </Button>
			                        </div>
			                      <div className="button-container">
			                        <Button
			                          style={{backgroundColor:'white',padding:'5px',color:'black',placeContent:'initial'}}
			                          fullWidth
			                          href="https://accounts.google.com/o/oauth2/v2/auth?client_id=684197542136-kkba8s7e8a1l6pnqdio46vgdgkfkhsmn.apps.googleusercontent.com&redirect_uri=http://localhost:5000/auth/google/callback&response_type=code&scope=profile&state=12345"
			                          target="_blank"
			                        >&nbsp;&nbsp;<img src={GoogleIcon} alt="구글SNS" width="40" height="40"></img>&nbsp;&nbsp;&nbsp;&nbsp;LOGIN TO USER GOOGLE ACCESS
			                        </Button>
			                        </div>
			                        <p>* SNS계정으로 간편하게 가입하여 서비스를 이용하실 수 있습니다.</p>

		                    </GridItem>
		                    <GridItem xs={12} sm={12} md={1} style={{textAlignLast:'center'}}>
		                    </GridItem>
		                 </GridContainer>
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
