const express = require('express');
const app = express();

const port = 4321; // change this to whatever, defaulted to 4321

// adds a timestamp to the beginning of all requests.
const originalLog = console.log;
console.log = function (...args) {
    const formattedDate = new Date().toLocaleString();
    originalLog(`\x1b[35m[${formattedDate}]\x1b[0m`, ...args);
};

const originalErrorLog = console.error;
console.error = function (...args) {
    const formattedDate = new Date().toLocaleString();
    originalErrorLog(`\x1b[35m[${formattedDate}]\x1b[0m`, ...args);
};
//

app.use(express.json());
app.use((req, res, next) => {

    // This is only needed if your requests are forwarded through Cloudflare.
    delete req.headers['x-forwarded-for']; // Remove IP forwarded by Cloudflare -> Optional
    delete req.headers['cf-connecting-ip']; // Remove IP forwarded by Cloudflare -> Optional
    delete req.headers['cf-warp-tag-id']; // Remove Data sent by Cloudflare -> Optional
    delete req.headers['cf-ray']; // Remove Data sent by Cloudflare -> Optional

    console.log(`Request received on route: ${req.path} | ${req.method}`);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);

    res.status(200).json({message:'Recieved'}) // comment this out if you plan to test specific endpoints, if not then keep this here so requests don't time out.

    // next(); // uncomment this and add optional endpoints below this if you want to test a specific one.
});


app.listen(port, () => {
    console.log(`\x1b[35mDebugger ready to go on port ${port}!\x1b[0m`);
});
