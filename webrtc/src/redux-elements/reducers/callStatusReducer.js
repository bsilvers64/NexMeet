const initState = {
  current: "idle", // negotiating, progress, complete
  video: "off", // video feed status: "enabled", "disabled", "complete", "off"
  audio: "off", // audio is not on
  audioDevice: "default", // enumerate devices, chosen audio device
  videoDevice: "default",
  shareScreen: false,
  haveMedia: false, // is there a localStream or not, has getUserMedia been run ?
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  if (action.type === "UPDATE_CALL_STATUS") {
    const copyState = { ...state };
    copyState[action.payload.props] = action.payload.value; // change the current status to complete (from hangup button)
    return copyState;
  } else if (action.type === "LOGOUT_ACTION" || action.type === "NEW_VERSION") {
    return initState;
  } else {
    return state;
  }
};  
