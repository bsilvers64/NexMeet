// eslint-disable-next-line import/no-anonymous-default-export

import peerConfiguration from "./stunServers";

const createPeerConnection = () => {

    return new Promise(async (resolve, reject) => {
        const peerConnection = await new RTCPeerConnection(peerConfiguration);
        // rtcPeerConnection is the connection to the peer, we may need more than 1
        // we pass it the config object which are just the stun servers that will 
        // get us our ICE-candidates

        const remoteStream = new MediaStream()
        
        peerConnection.addEventListener('signalingstatechange', (e) => {
            console.log("signaling state change");
            console.log(e);
        })

        peerConnection.addEventListener('icecandidate', e => {
            console.log("found ice candidate");
            if (e.candidate) {
                // emit to socket server
            }
        })

        resolve({
            peerConnection,
            remoteStream,   
        })

    })

};


export default createPeerConnection;