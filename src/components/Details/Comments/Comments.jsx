// import * as React from "react";
// import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
// import { useTheme } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import "./Comments.css";
// import { useDispatch, useSelector } from "react-redux";
// import { GetAuthEmail } from "../../actions/GetAuthEmail";
// import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
// import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
// import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
// import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     "aria-controls": `full-width-tabpanel-${index}`,
//   };
// }

// export default function FullWidthTabs() {
// const dispatch = useDispatch();
// const user = useSelector((state) => state.auth.email);
//   const theme = useTheme();
//   const [value, setValue] = React.useState(0);
//   console.log(user);

//   React.useEffect(() => {
//     dispatch(GetAuthEmail());
//   }, []);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleChangeIndex = (index) => {
//     setValue(index);
//   };

//   return (
//     <Box sx={{ bgcolor: "rgba(0,0,0,0)" }} className="Comments-container">
//       <AppBar
//         position="static"
//         sx={{ bgcolor: "rgba(0,0,0,0)", boxShadow: "none" }}
//       >
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           indicatorColor="secondary"
//           textColor="inherit"
//           variant="fullWidth"
//           aria-label="full width tabs example"
//         >
//           <Tab
//             label="Item One"
//             {...a11yProps(0)}
//             sx={{ padding: "0", alignItems: "flex-start", width: "100px" }}
//           />
//           <Tab
//             label="Item Two"
//             {...a11yProps(1)}
//             sx={{ padding: "0", alignItems: "flex-start" }}
//           />
//           <Tab
//             label="Item Three"
//             {...a11yProps(2)}
//             sx={{ padding: "0", alignItems: "flex-start" }}
//           />
//         </Tabs>
//       </AppBar>
//       <SwipeableViews
//         axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//         index={value}
//         onChangeIndex={handleChangeIndex}
//       >
//         <TabPanel value={value} index={0} dir={theme.direction}>
//           <div className="main-comments-box">
//             <div className="main-com-box-1st-block">
//               <img src={user.photoUrl} />
//               <div>why not</div>
//               <p>новичок</p>
//             </div>
//             <div className="main-com-box-2st-block">
//               <div className="main-com-box-2st-block-1block">
//                 <div className="block-1block-left opacityColor">
//                   29 Июня 2022, 11:06
//                 </div>

//                 <div className="block-1block-right whiteColor">
//                   <ThumbUpOutlinedIcon />
//                   <ThumbDownOutlinedIcon />
//                   <ReportOutlinedIcon />
//                   <ModeEditOutlineOutlinedIcon />
//                 </div>
//               </div>

//               <div className="main-com-box-2st-block-2block whiteColor">
//                 Сильная женщина и мальчик-зайчик. От такого сочетания аж зубы
//                 сводит.
//               </div>
//               <div className="main-com-box-2st-block-3block">ответить</div>
//             </div>
//           </div>
//         </TabPanel>
//         <TabPanel value={value} index={1} dir={theme.direction}>
//           Item Two
//         </TabPanel>
//         <TabPanel value={value} index={2} dir={theme.direction}>
//           Item Three
//         </TabPanel>
//       </SwipeableViews>
//     </Box>
//   );
// }

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./Comments.css";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import AddComments from "../addComments/addComments";
import { useState } from "react";
import { useEffect } from "react";
import fire from "../../../fire";
import { useParams } from "react-router-dom";

export default function FullWidthTabs() {
  const firestore = fire.firestore();
  const params = useParams();
  const [value, setValue] = useState("1");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.email);
  const [comnts, setComnts] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getComments = async () => {
    const querySnapshot = await firestore
      .collection(`messages/${params.id}/comments`)
      .get();

    let list = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    setComnts(list);
  };

  useEffect(() => {
    getComments();
  }, []);

  console.log(comnts);
  if (comnts.length === 0) {
    <>loading...</>;
  }

  return (
    <Box sx={{ width: "100%", typography: "body1", marginTop: "100px" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" sx={{ height: "20px" }} />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ paddingLeft: "0px" }}>
          <AddComments getComments={getComments} />{" "}
          {comnts.map((item) => (
            <div className="main-comments-box">
              <div className="main-com-box-1st-block">
                <img src={item.userPhoto} />
                <div>{item.user}</div>
                <p>новичок</p>
              </div>
              <div className="main-com-box-2st-block">
                <div className="main-com-box-2st-block-1block">
                  <div className="block-1block-left opacityColor">
                    29 Июня 2022, 11:06
                  </div>

                  <div className="block-1block-right whiteColor">
                    <ThumbUpOutlinedIcon
                      sx={{ fontSize: "15px", opacity: "0.7" }}
                    />
                    <ThumbDownOutlinedIcon
                      sx={{ fontSize: "15px", opacity: "0.7" }}
                    />
                    <ReportOutlinedIcon
                      sx={{ fontSize: "15px", opacity: "0.7" }}
                    />
                    <ModeEditOutlineOutlinedIcon
                      sx={{ fontSize: "15px", opacity: "0.7" }}
                    />
                  </div>
                </div>

                <div className="main-com-box-2st-block-2block whiteColor">
                  {item.com}
                </div>
                <div className="main-com-box-2st-block-3block whiteColor">
                  ответить
                </div>
              </div>
            </div>
          ))}
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
