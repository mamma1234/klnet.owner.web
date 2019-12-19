import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";


const useStyles = makeStyles(theme => ({
  card: {
    paddingBottom: 1,
    "&:last-child": {
      paddingBottom: 2
    }
  },
  gridcss: {
    paddingTop:1,
    paddingBottom: 1,
  },
  
  expand: {
    padding:4,
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));


export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    

      <GridContainer>
             <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                      labelText="BL 번호"
                      id="blNo"
                      formControlProps={{
                        fullWidth: true
                      }}
                  />
             </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Container_no"
                    id="cntrNo"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Button color="primary">Search</Button>
                </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>   
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent className = {classes.card}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Do 번호"
                      id="doNo"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem> 
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Booking No"
                      id="bkgNo"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>  
                </GridContainer>
              </CardContent>
            </Collapse>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} > 
            <CardActions className = {classes.gridcss}>
                <IconButton 
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  ><ExpandMoreIcon />
                </IconButton>
              </CardActions> 
            </GridItem>
          </GridContainer>
      </CardContent> 
    </Card>
  );
}
