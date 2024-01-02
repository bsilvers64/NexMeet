// this holds all streams as objects

/* {
    who,
    stream, thing with tracks that plays in <video/>
    peerConnection = actual webRTC connection
} */


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    if (action.type === "ADD_STREAM") {
      const copyState = { ...state };
      copyState[action.payload.who] = action.payload;
      return copyState;
    } else if (action.type === "LOGOUT_ACTION") {
      return {};
    } else {
      return state ;
    }
    
}