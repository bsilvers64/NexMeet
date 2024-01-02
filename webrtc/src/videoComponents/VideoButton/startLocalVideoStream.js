// this function's job is to update all peerConnections (addTracks) and update redux callStatus

import UpdateCallStatus from "../../redux-elements/actions/UpdateCallStatus";



const startLocalVideoStream = (streams, dispatch) => {
    const localStream = streams.localStream;
    for(const s in streams) {  // s  is the key, the who property
        if (s !== "localStream") {
            // we dont add tracks to the local stream
            const currStream = streams[s]; 
            // add tracks to all peerConnections
            localStream.stream.getVideoTracks().forEach(t => {
                    currStream.peerConnection.addTrack(t, currStream.stream)
            });

            // update callStatus
            dispatch(UpdateCallStatus("video", "enabled"));
        }
    }
}

export default startLocalVideoStream