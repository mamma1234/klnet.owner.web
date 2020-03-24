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
import GoogleIcon from 'assets/img/sns/google.png';
import FaceIcon from 'assets/img/sns/face.png';
import KakaoIcon from 'assets/img/sns/kakao.png';
import NaverIcon from 'assets/img/sns/naver.png';
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import FontButton from "@material-ui/core/Button";
import image from "assets/img/bg7.jpg";
import Divider from '@material-ui/core/Divider';
import CloseIcon from "@material-ui/icons/HighlightOff";
import axios from 'axios';
const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const [email,setEmail] = React.useState();
  const [password,setPassword] = React.useState();

  const submit = () => {

	   if(email != "" && password != "") {
		   axios.post("/auth/login", {id : email, pw : password,})
		    .then(res => {

		        if (res.data.message) alert(res.data.message);
		        else props.onClose(); //alert(res.data.userid + " 로그인 성공");
		       // else window.location.href ="/";
		    })
		    .catch(err => {
		        console.log(err);
		    })
	   } else {
		   if(email == "") {
			   alert("로그인 아이디 는 필수 입력 값입니다.");
		   } else {
			   alert("로그인 패스워드는 필수 입력 값입니다.");
		   }
		   
	   }
    
  };


  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container} style={{width:'auto'}}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <div style={{textAlign:'right',marginTop:'5px',marginRight:'5px'}}>
                  <CloseIcon  onClick={()=>props.onClose()}/>
                </div>
                  <CardHeader color="info" className={classes.cardHeader} style={{marginTop:'-60px',marginLeft:'30px',marginRight:'30px'}}>
                    <h4>Login</h4>
                  </CardHeader>
                  <CardBody style={{paddingTop:'0px'}}>
                    <CustomInput
                      labelText="Email Address"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        onChange:({target:{value} }) => setEmail(value)
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
                        onChange:({target:{value} }) => setPassword(value)
                      }}
                    />
                    <CardFooter style={{margin:'0px',padding:'0px'}}>
                       <FontButton  size="small" style={{lineHeight:'initial',fontWeight:'blod'}} >
                         <font color="#3f51b5" style={{textDecoration:'underline'}}>Forgot password?</font>
                      </FontButton>
				         		</CardFooter>
                     <CardFooter style={{margin:'0px'}}>
                      <Button simple color="info" size="lg" style={{paddingTop:'0px',paddingBottom:'0px'}} onClick={submit} fullWidth>Get started</Button>
				         		</CardFooter>
                    <Divider />
                    <GridItem xs={12} style={{marginTop:'5px',marginLeft:'20px',marginRight:'20px'}}>
                      <div className="button-container">
                                  <Button
                                    style={{backgroundColor:'white',borderRadius:'30px',borderStyle:'solid',borderColor:'#ffe812',color:'#6f6e6e',placeContent:'initial',margin:'3px',height:'48px',paddingLeft:'10px'}}
                                    href="https://kauth.kakao.com/oauth/authorize?client_id=0b6d98316119442e856dd2ad7497df14&redirect_uri=http://localhost:5000/auth/kakao/callback&response_type=code&state=12345"
                                    target="_blank"
                                    fullWidth
                                  >&nbsp;&nbsp;<img src={KakaoIcon} alt="카카오SNS" width="40" height="40"></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kakao Login
                                  </Button>
                      </div>
                      <div className="button-container">
                                  <Button
                                  style={{backgroundColor:'white',borderRadius:'30px',borderStyle:'solid',borderColor:'#1EC800',color:'#6f6e6e',placeContent:'initial',margin:'3px',height:'48px',paddingLeft:'10px'}}
                                    fullWidth
                                    href="https://nid.naver.com/oauth2.0/authorize?client_id=5vSPppBEGLWEwMT8p9kZ&redirect_uri=http://localhost:5000/auth/naver/callback&response_type=code&state=12345"
                                    target="_blank"
                                  >&nbsp;&nbsp;<img src={NaverIcon} alt="네이버SNS" width="40" height="40"></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Naver Login
                                  </Button>
                                </div>
                                  <div className="button-container">
                                    <Button
                                      style={{backgroundColor:'white',borderRadius:'30px',borderStyle:'solid',borderColor:'#3b5998',color:'#6f6e6e',placeContent:'initial',margin:'3px',height:'48px',paddingLeft:'10px'}}
                                      href="https://www.facebook.com/v5.0/dialog/oauth?client_id=184064786168643&redirect_uri=http://localhost:5000/auth/facebook/callback&response_type=code&state=12345"
                                      target="_blank"
                                      fullWidth
                                    >&nbsp;&nbsp;<img src={FaceIcon} alt="페이스북SNS" width="40" height="40"></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FaceBook Login
                                    </Button>
                                  </div>
                                <div className="button-container">
                                  <Button
                                    style={{backgroundColor:'white',borderColor:'red',borderRadius:'30px',borderStyle:'solid',borderColor:'#db3236',color:'#6f6e6e',placeContent:'initial',margin:'3px',height:'48px',paddingLeft:'10px'}}
                                    fullWidth
                                    href="https://accounts.google.com/o/oauth2/v2/auth?client_id=684197542136-kkba8s7e8a1l6pnqdio46vgdgkfkhsmn.apps.googleusercontent.com&redirect_uri=http://localhost:5000/auth/google/callback&response_type=code&scope=profile&state=12345"
                                    target="_blank"
                                  >&nbsp;&nbsp;<img src={GoogleIcon} alt="구글SNS" width="40" height="40"></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Google Login
                                  </Button>
                                  </div>
                        </GridItem>
                    <CardFooter style={{margin:'0px'}}>
                      New Here? 
                      <FontButton  size="small" style={{lineHeight:'initial',fontWeight:'blod'}} >
                        <font color="#3f51b5" style={{textDecoration:'underline'}}>Create an account</font>
                      </FontButton>
				         		</CardFooter>
                  </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
