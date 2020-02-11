/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#home" className={classes.block}>
                이용약관
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#company" className={classes.block}>
                개인정보처리방침
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#portfolio" className={classes.block}>
                About Us
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#blog" className={classes.block}>
                Blog
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
            <a href="#blog" className={classes.block}>
              Q&A
            </a>
          </ListItem>
          <ListItem className={classes.inlineBlock}>
          <a href="#blog" className={classes.block}>
            FAQ
          </a>
        </ListItem>
        <ListItem className={classes.inlineBlock}>
        <a href="#blog" className={classes.block}>
          고객지원센터(1577-1172)
        </a>
      </ListItem>
          </List>
          <p className={classes.left}>
          <span>
          고객지원센터 1577-1172 (06264) 서울시 강남구 역삼로 153 케이엘넷 빌딩<br/>
          &copy; {1900 + new Date().getYear()}{" "}
          <a
            href="https://www.klnet.co.kr"
            target="_blank"
            className={classes.a}
          >
            KL-Net &nbsp;
            </a>
            	Co.,Ltd. All Rigths Reserved.
          	</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
