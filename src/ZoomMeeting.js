import React from "react";
// import { ZoomMtg } from 'zoomus-jssdk';
import { ZoomMtg } from "@zoomus/websdk";

const Zoom = () => {
  const insideMeeting = () => {
    // ZoomMtg.setZoomJSLib("node_modules/@zoomus/websdk/dist/lib/", "/av");
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.8.3/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();

    const API_KEY = "";

    const API_SECRET = "";

    const meetConfig = {
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      meetingNumber: "",
      userName: "test user",
      passWord: "",
      leaveUrl: "http://localhost:3000",
      role: 0,
    };

    ZoomMtg.generateSignature({
      meetingNumber: meetConfig.meetingNumber,
      apiKey: meetConfig.apiKey,
      apiSecret: meetConfig.apiSecret,
      role: meetConfig.role,
      success(res) {
        console.log("signature", res.result);
        ZoomMtg.init({
          leaveUrl: "http://localhost:3000",
          isSupportAV: true,
          success() {
            ZoomMtg.join({
              meetingNumber: meetConfig.meetingNumber,
              userName: meetConfig.userName,
              signature: res.result,
              apiKey: meetConfig.apiKey,
              userEmail: "doc10@salubrioustech.com",
              passWord: meetConfig.passWord,
              success() {
                console.log("join meeting success");
              },
              error(res) {
                console.log(res);
              },
            });
          },
          error(res) {
            console.log(res);
          },
        });
      },
    });
  };

  return (
    <div style={{ backgroundColor: "red" }}>
      <button
        className="launchButton"
        onClick={insideMeeting}
        style={{ backgroundColor: "red" }}
      >
        Inside{" "}
      </button>
    </div>
  );
};

export default Zoom;
