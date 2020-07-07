import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MessageIcon from "@material-ui/icons/Message";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          {props.chattabs ? (
            <div>
              {props.chattabs.map((user, i) => (
                <Tab
                  key={i}
                  label={user}
                  icon={<MessageIcon />}
                  {...a11yProps(i)}
                />
              ))}
            </div>
          ) : null}
          {/* 
          <Tab label="Item One" icon={<MessageIcon />} {...a11yProps(0)} />
          <Tab label="Item Two" icon={<MessageIcon />} {...a11yProps(1)} />
          <Tab label="Item Three" icon={<MessageIcon />} {...a11yProps(2)} />
          <Tab label="Item Four" icon={<MessageIcon />} {...a11yProps(3)} />
          <Tab label="Item Five" icon={<MessageIcon />} {...a11yProps(4)} />
          <Tab label="Item Six" icon={<MessageIcon />} {...a11yProps(5)} />
          <Tab label="Item Seven" icon={<MessageIcon />} {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>

      {props.chattabs ? (
        <div>
          {props.chattabs.map((user, i) => (
            <TabPanel key={i} value={value} index={0}>
              {user} messages wil be here
            </TabPanel>
          ))}
        </div>
      ) : null}

      {/* <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel> */}
    </div>
  );
}
