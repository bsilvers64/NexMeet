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

})