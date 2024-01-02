// this is where the user will get dropped when they will click on the link to join
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./VideoComponents.css";
import CallInfo from "./CallInfo";
import ChatWindow from "./ChatWindow";
import ActionButtons from "./ActionButtons";
import addStream from "../redux-elements/actions/addStream";
import { useDispatch, useSelector } from "react-redux";
import createPeerConnection from "../webRTC-Utilities/createPeerConnection";
import socket from "../webRTC-Utilities/socketConnection";
import UpdateCallStatus from "../redux-elements/actions/UpdateCallStatus";

const MainVideoPage = () => {
  // get query string finder hook
  const [searchParams, setSearchParams] = useSearchParams();
  const [apptInfo, setApptInfo] = useState({});
  const dispatch = useDispatch();
  const smallFeedEl = useRef(null); // react reference to a dom element so that we can interact with it
  const largeFeedEl = useRef(null);
  const state = useSelector((state) => state);


  useEffect(() => {
    const fetchMedia = async () => {
      const constraints = {
        video: true, // must have one constraint true
        audio: false,
      };
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        dispatch(UpdateCallStatus('haveMedia', true)) // update our call status reducer to know that we have media


        // dispatch will send this function to the redux dispatcher so all reducers are notified
        // we send 2 args - the who, and the stream
        dispatch(addStream("localStream", stream));

        const { peerConnection, remoteStream } = await createPeerConnection();
        dispatch(addStream("remote1", remoteStream, peerConnection));

        // we have a peerConnection now. before making an offer , which is an SDP (information about the tracks),
        // we need to add tracks
      } catch (err) {
        console.log(err);
      }
    };
    fetchMedia();
  }, []);

  // empty dependency, so will only run on load
  useEffect(() => {
    // grab the token var out of the query string
    const token = searchParams.get("token");

    const fetchDecodedToken = async () => {
      // sends a post request to our express server along with the token
      const resp = await axios.post("https://localhost:9000/validate-link", {
        token,
      });
      setApptInfo(resp.data);
    };
    fetchDecodedToken();
  }, []);

  return (
    <div className="main-video-page">
      <div className="video-chat-wrapper">
        {/* Dive to Hold our remote video, our local video, and our chat video */}
        <video id="large-feed" ref={largeFeedEl} autoPlay controls playsInline></video>
        <video id="own-feed" ref={smallFeedEl} autoPlay controls playsInline></video>

        {apptInfo.professionalFullName ? (
          <CallInfo apptInfo={apptInfo} />
        ) : (
          <></>
        )}
        <ChatWindow />
      </div>
      <ActionButtons smallFeedEl ={smallFeedEl}/>
    </div>
  );
};

export default MainVideoPage;
