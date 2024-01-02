import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import startLocalVideoStream from "./startLocalVideoStream";
import UpdateCallStatus from "../../redux-elements/actions/UpdateCallStatus";
import getDevices from "../../webRTC-Utilities/getDevices";
import addStream from "../../redux-elements/actions/addStream";

const VideoButton = ({ smallFeedEl }) => {
  const dispatch = useDispatch();
  const callStatus = useSelector((state) => state.callStatus);
  const streams = useSelector((state) => state.streams);
  const [pendingUpdate, setPendingUpdate] = useState(false);
  const [caretOpen, setCaretOpen] = useState(false);
  const [videoDeviceList, setVideoDeviceList] = useState([])

  const DropDown = () => {
    return (
      <div className="caret-dropdown" style={{ top: "-25px" }}>
        <select defaultValue={1} onChange={changeVideoDevice}>
          {videoDeviceList.map(vd => <option key={vd.deviceId} value={vd.deviceId}>{vd.label}</option>)}
          
        </select>
      </div>
    );
  };

  useEffect(() => {
    const getDevicesAsync = async () => {
      if (caretOpen) {
        // then we need to check video devices
        const devices = await getDevices();
        setVideoDeviceList(devices.videoDevices)
      }
    };
    getDevicesAsync()
  }, [caretOpen]);

  const changeVideoDevice = async (e) => {
    // the user changed the desired video device
    // 1. we need to get that device
    const deviceId = e.target.value;
    console.log(deviceId);
    // 2. we need to getUserMedia (permission)

    const newConstraints = {
      audio:
        callStatus.audioDevice === "default"
          ? true
          : { deviceId: { exact: deviceId } },
      video: { deviceId: { exact: callStatus.audioDevice} },
    };

    const stream = await navigator.mediaDevices.getUserMedia(newConstraints)
    // 3. update redux with that videoDevice

    dispatch(UpdateCallStatus('videoDevice', deviceId))
    // 4. update the smallFeedEl

    smallFeedEl.current.srcObject = stream;
    // 5. we need to update the localStream in streams

    dispatch(addStream('localStream', stream))
    // 6. add Tracks
    // if we stop the old tracks and add new tracks, that would mean re-negotiation
    // we use replaceTracks() that will not require negotiation on switching
    // we will com back to this
    const tracks = stream.getVideoTracks()
  };

  const startStopVideo = () => {
    // first, if the video is enabled, then disable.
    if (callStatus.video === "enabled") {
      dispatch(UpdateCallStatus("video", "disabled"));
      // set the stream to disabled
      const tracks = streams.localStream.stream.getVideoTracks();
      tracks.forEach((track) => (track.enabled = false));
    } else if (callStatus.video === "disabled") {
      // second, if the video is disabled, then enable.
      dispatch(UpdateCallStatus("video", "enabled"));
      // enable the stream tracks
      const tracks = streams.localStream.stream.getVideoTracks();
      tracks.forEach((track) => (track.enabled = true));
    } else if (callStatus.haveMedia) {

      // thirdly, check if we have media. if so, start the stream
      // we have the media! show the feed
      smallFeedEl.current.srcObject = streams.localStream.stream;
      // add tracks to the peer connection -
      startLocalVideoStream(streams, dispatch);
    } else {
      // lastly, it is possible, we don't have the media, wait for the media, then start!
      setPendingUpdate(true);
    }
  };

  // this useEffect runs when the pendingUpdate changes to true
  useEffect(() => {
    if (pendingUpdate && callStatus.haveMedia) {
      console.log("pending update succeeded");
      setPendingUpdate(false);
      smallFeedEl.current.srcObject = streams.localStream.stream;
      startLocalVideoStream(streams, dispatch);
    }
  }, [pendingUpdate, callStatus.haveMedia]);

  return (
    <div className="button-wrapper video-button d-inline-block">
      <i
        className="fa fa-caret-up choose-video"
        onClick={() => setCaretOpen(!caretOpen)}
      ></i>
      <div className="button camera" onClick={startStopVideo}>
        <i className="fa fa-video"></i>
        <div className="btn-text">
          {callStatus.video === "enabled" ? "Stop" : "Start"} Video
        </div>
      </div>
      {caretOpen ? <DropDown /> : <></>}
    </div>
  );
};

export default VideoButton;
