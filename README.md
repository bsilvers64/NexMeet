# Webrtc Video Call Application


1. We will run our project with https on localhost by using mkcert for adding crt and key. And adding set HTTPS=true and path to these certificate and key in react-scripts of npm start.

2. app.use('/a', express.static(path.join(\_\_dirname, 'b')));

would serve all files inside of the b directory, and have them accessible through http\://example.com/a/FILE.\
mount middleware functions. In this case, it's used to tell Express to use the express.static middleware to serve static files from the specified directory.

3. The app returned by express() is in fact a JavaScript Function, DESIGNED TO BE PASSED to Node’s HTTP servers as a callback to handle requests.

This makes it easy to provide both HTTP and HTTPS versions of your app with the same code base, as the app does not inherit from these (it is simply a callback)\
const expressServer = https.createServer({key, cert}, app)

4.  CORS headers must be set on the server to inform the browser that it's acceptable for the client to connect to the server from a different origin.

5. We do an io.connect("<https://localhost:9000>"); from our socketConnection.js in the front-end part.  While the event-listener for this inside socketServer.js in backend will log the socket.id 

6. To create our meeting joining link, we will use some data and tokenize it using <https://jwt.io>, which will take our data object and encode it using a secret key (i put “banana”). We will decode it back into the data object.\
In the jsonwebtoken package this is done via jwt.sign() and jwt.verify() methods 


7. We will use react-router-dom for our routing system. So we generate a video joining link in our expressRouter.js that will send us a url for the react app with a path of join-video that is handled by the mainVideoPage component.\
We use the useSearchParams hook to extract token from the address

8. In the HangUpButton, we dispatch an action to callStatusReducer which changes the current property of the usermedia state to complete, which in turns in the hangupbutton component leads to returning an empty tag basically removing the button itself.

9. We have another action dispatched to streams-reducer which added peerConnection and the stream object to that state

10. Video button component shows our video/in the smaller feed. We check if the callStatus.video is enabled or disabled and then change that status to the opposite. If neither, we check if we have the media, if yes, go ahead and show the video. If not, then we have a useEffect to track when it is available then it shows the media.

11. The function, **startLocalVideoStream**, is designed to add video tracks from a local stream to multiple peer connections. It iterates over an object (streams) containing different streams, and for each stream (excluding the "localStream"), it adds the video tracks from the local stream to the peer connection associated with that stream.\

The purpose of adding tracks from the localStream to other peer connections in WebRTC is to share the local user's audio and video with remote peers. Each peerConnection represents a connection to another participant in a WebRTC session. By adding tracks from the local stream to these connections, you are essentially sending your audio and video data to other participants in the communication session.

12. To disable the video, we pull the localStream from Streams and get all its video tracks. And change their property enabled to false. This is managed by checking the callStatus.video property, if it's enabled or disabled or off.\
    <https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/enabled>

13. If we were to change our videoInput device, then it would follow this process-\
    &#x20;  // 1. we need to get that device

   // 2. we need to getUserMedia (permission)

   // 3. update redux with that videoDevice

   // 4. update the smallFeedEl

   // 5. we need to update the localStream in streams

   // 6. add Tracks

14. We will make \<DropDown/> as abstract as we need for the video, audio and the participants button-caret components. This lists all the available devices to choose from for audio/video input

15. For changing the audio input/output device we follow the same steps as we did for videoDeviceChange. For the audio output device, we will use-\
    The **HTMLMediaElement.setSinkId()** method of the Audio Output Devices API sets the ID of the audio device to use for output and returns a Promise.\
    Our MediaElement is the smallFeedEl,(our reference hook of the video element (own-feed) in the mainVideoPage component) which we will grab as props in the audioButton component

16. The rest of the audioButton is implemented in the similar way as videoButton. Choosing one device would lead to adding tracks of the localstream to streams of all other peerConnections

17. The mainVideoPage has useEffect for component on mount (empty dependency array) which fetches the media for the user and changes the callStatus.haveMedia to true via dispatch. Then it creates a peer connection.\
    A new MediaStream object named remoteStream is created. This object will be used to handle the remote stream of media (e.g., video and audio) received from the peer.

18.  Here’s what the streams state looks like after initial adding localstream and 1\
    &#x20;Peer. Each peer connection is handled by a RTCPeerConnection object. In \
    &#x20;our case its stored in the remote 1 object, the RTCPeerConnection object for \
    &#x20;connection b/w local and remote 1\
    
    ![](https://lh7-us.googleusercontent.com/OTON0dB23xPwrLaCTsyE0rL0Ep9FFUtQA5_VGGJxQrXbkGzMxyhpM5Fw0LN1qcbi41stXGQ8bxGo_R6UhOZ3vt_F5YgCxrTNHMZgwgIAaR1urU5pUCl39ve2-WSIK5tXcCqUVr9V3GnPC60DS2vi0hQ)

20.     From the mainVideoPage component we created an offer and emitted\
        that along with appt-info. While dispatching the haveCreatedOffer value\
        change to true to denote that the offer has been created. This event is\
        caught by socketServer.\
    Next steps-\
    
    ![](https://lh7-us.googleusercontent.com/M-t0YNoXiZkinSSG0R0kMtLPfM5ZizKqOHHL0qguGQs7xiGPyW8ho20sI_x9AjRdnVMIgiILyJuLHrEXCRHYt6BsVESp5LWanQOjtVAUIFHHIC0tbTR3LYsTEFf0aHPTWQRH45SQBLB-KKYanG7ujRY)

22. When we hit the dashboard endpoint, we need to justify who we are.\
    Right now, we are using dummy data- userData which just has the name and an Id. (now this might be pulled from a database) using jwt we will convert this into a token and send in the response url. Just like before, from the front-end as when the mainVideoPage component loads, it grabs the token from the url string using useSearchParams(), and sends a post request to the backend express server at “validate-link” endpoint along with the token. It expects the decoded token values to be returned. Which the backend decodes with the secret-link (that only it knows about) and sends that response. Back to front-end

23.  Our socket server handles both connections from normal clients and from professionals. So clients would join via the join-video page at the moment and professionals join via pro-link page. They have a pro-Id. We have a list of connected professionals. And each time a user joins, if they already joined before, then they won’t be added again to that list. We check that with if the proId already exists.

24. The data we send to the server will be in encoded form in the urls. New offer event can emit even tho the user is already connected. It happens in mainVideoPage component when an offer is created. If the user is already connected, then we go fetch the offer, match it to the professional, and if the socket matches, then we emit the event - “newOfferWaiting”.\
    If a user (who is already on the dashboard), turns their audio and video on, then a new offer will be created and it should pop on the dashboard

25. Mainvideopage will emit offer of - “newOffer” whenever new offer is created. This offer is created whenever the user turns their audio and video on. This offer is emitted along with that appointmentInfo which is pulled from the url’s token. The user-link endpoint. Then this offer is emitted only to the professional. -> “newOfferWaiting”.

26. The professional can see all his clients on his dashboard. And whenever a client joins through the link and turns on his camera and audio, that will denote the professional that he has joined and is waiting in the room. If the professional is already connected, they will get emitted a known offer, but not a new appointment. It does get sent on a new connection. So we will try to dynamically update new appointments on the pro’s dashboard.

27. For this, we fetch the professionalAppointments inside the “newOffer” socket event handler. But emitting the “apptData” event from here won’t work as this is the “newOffer” event handler. This event is by the client in the mainVideoPage. So it will emit to that client which makes no sense to.\
    To solve this, we do a  **socket.to(SocketId)**, so that it gets to the professional instead.\
     

28. Now we implement an event Handler for the button click event of “Join” meeting. Which is the **proVideoPageComponent**. Similar to the mainVideoPage but it creates an Answer instead of an offer. Which it sets to the setLocalDescription() after creating a peerConnection. It also does a setRemoteDescription() to the callStatus.offer value whose value is set on the “newOfferWaiting” event. We are also emitting the new answer from this component/client.

29. An idea for production - create a room and add both clients to that room.\
    Via the ‘iceToServer’ event both client and professional send their ice-candidates to the socket server. This event is emitted inside the ‘addIce’ function which gets passed to the createPeerConnection function. That has the icecandidate event listener. So as soon as the ice-candidates arrive, they are sent to the socket server as well, With this. And as soon as they arrive in the iceToServer event handler, they are added respectively to the offererIceCandidate and answerIceCandidate properties of the allknownOffer\
    Object. And also emitted to the other side/client with the “iceToClient” emit from the socket server

30. (iceToServer event)When the server gets the ice candidates from both client and professional, it grabs the offer from that particular uuid, if it was the client who sent the ice-candidates the we add those to the offererIceCandidates of that offer. If from the professional, then we add it to the answerIceCandidates.


31. While when the pro loads up the video page, there’s a useEffect on load that emits to socket with Ack, - “getIce”. Listener on the socket server, gets the uuid and grabs the offer, and depending on “who” emitted the event we populate the array of iceCandidates, and then we send it back over.

30) We add the ice candidates to the peerConnection of all the streams except of the localStream




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
l and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

