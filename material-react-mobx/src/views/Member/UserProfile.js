import React,{useEffect,useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import klnet from "assets/img/logo.png";
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import Select from "components/CustomInput/CustomSelect.js";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
	console.log("page Load>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  const classes = useStyles();
  const [pageData,setPageData] = useState([]);
  const [company,setCompany] = useState("");
  const [userName,setUserName] = useState("");
  const [userEmail,setUserEmail] = useState("");
  const [userPhone,setUserPhone] = useState("");
  const [socialYn,setSocialYn] = useState("N");
  const [loginDate,setLoginDate] = useState("");
  
  useEffect(() => {
	    console.log('useEffect 호출....');
	    axios.post("/com/getUserInfo").then(res => {
	    	console.log(">>>>>>>>>>>>>>>>>>>>>>>>",JSON.stringify(res.data[0]));
	    	setPageData(res.data[0]);
	    	console.log("0:",pageData[0],"1:",pageData[1],"2:",pageData[2],"3:",pageData[3]);
	    })
	    //.then(res => console.log(">>>>>>>>>>>>>>>>>>>>>>>>",JSON.stringify(res.data[0])))
	    .catch(err => {
		       //console.log(err.response.status);
		        if(err.response.status == "403") {
		        	//setOpenJoin(true);
		        }
		    });
	    console.log('useEffect data....',pageData);
	    
	    console.log("0:",pageData[0],"1:",pageData[1],"2:",pageData[2],"3:",pageData[3]);

	    
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company"
                    id="company"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      //disabled: true,
                      value:company,
                      onChange:({target:{value} }) => setCompany(value)
                    }}
                  />
                </GridItem>


                <GridContainer>
	                <GridItem xs={12} sm={12} md={2}>
		                <Select
		                  id="serviceGb"
		                  labelText="회원구분"
		                  option={["선사","화주","관리자","포워더"]}
		                	//value={profileData[0]}
		                />
	              </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                      //value:profileData[2],
                      onChange:({target:{value} }) => setUserName(value)
                    }}
                  />
                </GridItem>
                  </GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                      //value:profileData[1],
                      onChange:({target:{value} }) => setUserEmail(value)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="User Phone Number"
                    id="userPhoneNum"
                    formControlProps={{
                      fullWidth: true,
                      //value:profileData[4],
                      onChange:({target:{value} }) => setUserPhone(value)
                      
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
	            	<CustomInput
	                	labelText="First Login Date"
	                	id="firstloginDate"
	                	formControlProps={{
	                	disabled: true,
	                	fullWidth: true,
	                	//value:profileData[8]
	                	}}
	                />
                </GridItem>
	            	<GridContainer>
	            <GridItem xs={12} sm={12} md={4}>
		               <Switch
		        		checked="Y"
		    		  	onChange={() => setSocialYn(!socialYn)}
		        		value="Y"
		        		inputProps={{'aia-label':'checkbox'}}
		    		  />소셜연계여부
	            </GridItem>
			    <GridItem xs={12} sm={12} md={6}>
				    <CustomInput
	            	labelText="Social Name"
	            	id="socailName"
	            	formControlProps={{
	            	disabled: true,
	            	fullWidth: true,
	            	//value:profileData[7]
	            	}}
				    />
		         </GridItem>
				    </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={klnet} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>KL-NET</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
