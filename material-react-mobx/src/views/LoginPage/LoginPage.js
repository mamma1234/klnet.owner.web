import React from "react";
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
  const [loginId, setLoginId,loginPW, setLoginPW] = React.useState(new Set());
  const [loginPw, setLoginPw] = React.useState(new Set());
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

	  componentDidMount(loginId,loginPw);

	 if (check != "Y") {
		 window.location.href = "/own/tracking";
	 } else {
		 alert("로그인 정보를 확인해 주세요.");
	 }  
  }
  
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
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="https://kauth.kakao.com/oauth/authorize?client_id=0b6d98316119442e856dd2ad7497df14&redirect_uri=http://localhost:5000/auth/kakao/callback&response_type=code&state=12345"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                      <img src={KakaoIcon} alt="카카오SNS" width="41" height="41"></img>
                      </Button>&nbsp;&nbsp;
                      <Button
                        justIcon
                        href="https://nid.naver.com/oauth2.0/authorize?client_id=5vSPppBEGLWEwMT8p9kZ&redirect_uri=http://localhost:5000/auth/naver/callback&response_type=code&state=12345"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                      <img src={NaverIcon} alt="네이버SNS" width="41" height="41"></img>
                      </Button>&nbsp;&nbsp;
                      <Button
                        justIcon
                        href="https://www.facebook.com/v5.0/dialog/oauth?client_id=184064786168643&redirect_uri=http://localhost:5000/auth/facebook/callback&response_type=code&state=12345"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                      <img src={FaceIcon} alt="페이스북SNS" width="41" height="41"></img>
                      </Button>&nbsp;&nbsp;
                      <Button
	                      justIcon
	                      href="https://accounts.google.com/o/oauth2/v2/auth?client_id=684197542136-kkba8s7e8a1l6pnqdio46vgdgkfkhsmn.apps.googleusercontent.com&redirect_uri=http://localhost:5000/auth/google/callback&response_type=code&scope=profile&state=12345"
	                      target="_blank"
	                      color="transparent"
	                      onClick={e => e.preventDefault()}
                      >
                      <img src={GoogleIcon} alt="구글SNS" width="41" height="41"></img>
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Plism Plus 방문을 환영 합니다.</p>
                  <CardBody>
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
                        onChange:onChangeIDValue
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
                        onChange:onChangePWValue
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                  
		             <Button color="primary" size="lg" onClick={handleClick}>
		               Get started
		             </Button>
                  {/*<a href="#" onClick={login}>
                   {/*   <img src={localimage} alt="로그인 버튼" width="222" height="49"></img></a>  
                      
                     <Button simple color="primary" size="lg" onClick={kakao}>*/}
                  {/*   kakao
                    </Button> */}
                    <pre>  </pre>
                    {/*<a href="https://kauth.kakao.com/oauth/authorize?client_id=0b6d98316119442e856dd2ad7497df14&redirect_uri=http://localhost:5000/auth/kakao/callback&response_type=code&state=12345">*/}
                    {/*  <img src={kakaoimage} alt="카카오 로그인 버튼" width="222" height="49"></img></a>*/}
                    {/* <a href="https://kauth.kakao.com/oauth/authorize?client_id=0b6d98316119442e856dd2ad7497df14&redirect_uri=http://localhost:3000/login/callback&response_type=code">카카오로그인</a> */}
                    {/* <a href="https://kapi.kakao.com/v1/user/logout">카카오로그아웃</a> */}
                    {/*<pre>  </pre>
                    {/*<a href="https://nid.naver.com/oauth2.0/authorize?client_id=5vSPppBEGLWEwMT8p9kZ&redirect_uri=http://localhost:5000/auth/naver/callback&response_type=code&state=12345">
                      <img src={naverimage} border="0" title="네이버 아이디로 로그인" width="226.625px" height="49px"></img></a>
                    <pre>  </pre>
                    <a href="https://www.facebook.com/v5.0/dialog/oauth?client_id=184064786168643&redirect_uri=http://localhost:5000/auth/facebook/callback&response_type=code&state=12345">
                      <img src={facebookimage} alt="페이스북 로그인 버튼" width="245" height="105"></img></a>
                    <pre>  </pre>
                    <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=684197542136-kkba8s7e8a1l6pnqdio46vgdgkfkhsmn.apps.googleusercontent.com&redirect_uri=http://localhost:5000/auth/google/callback&response_type=code&scope=profile&state=12345">
                      <img src={googleimage} alt="구글 로그인 버튼" width="222" height="49"></img></a>*/}
                  </CardFooter>
		          <CardFooter>
         			New Here? <Link to="/own/register">Create an account</Link>
         			</CardFooter>
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


class LoginCheck extends React.Component {
	
	  state = { expanded: false , port: []};

	  componentDidMount() {
		  console.log(">>>>");
		  return axios ({
				url:'/api/getScheduleDetailList',
				method:'POST',
				data: {carrierCode : this.props.data.LINE_CODE,
					   startPort : this.props.data.START_PORT,
					   endPort : this.props.data.END_PORT,
					   voyage : this.props.data.VOYAGE_NO,
					   vesselName : this.props.data.VESSEL_NAME
					   }
			}).then(response => this.setState({port:response.data }));
		  }

	  render() {

	     const { port } = this.state;

	    return [
	      
	    ];
	  }
	}