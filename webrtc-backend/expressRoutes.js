// all our express stuff happens here (routes)

const app = require("./server").app;
const jwt = require("jsonwebtoken");


const linkSecret = "idsuh849yfgrhuwnfec";


// this route is for us, In production, a receptionist, or calender/scheduling app would send this out.
// we will print it out and paste it in. it will drop us on our React site with the right info for 
// CLIENT1 to make an offer
app.get('/user-link', (req, res) => {
    
    const apptData = {
        professionalFullName: "Bhavansh Sthapak, M.S.",
        apptDate: Date.now()
    }

    // we need to encode this data in a token

    const token = jwt.sign(apptData, linkSecret);

    res.send("https://localhost:3000/join-video?token="+token);
    // MainVideoPage component is displayed on this route

})

//extracting token and decoding using secret-key to get our payload(object)
app.post('/validate-link', (req, res) => {
    // get it from the body thanks to express.json() middleware
    const token = req.body.token;
    const decodedData = jwt.verify(token, linkSecret);
    console.log(decodedData);
    // send decoded token back to front-end
    res.json(decodedData)
})