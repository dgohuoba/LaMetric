// follow modules loaded via `npm i --save request cheerio`
const request = require('request');
const cheerio = require('cheerio');
const http = require('http');

http.createServer((req, res) => {
  getDueTimes().then(data => {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(data));
  }).catch(error => {
    console.error(error);
    res.writeHead(500, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error }));
  });
}).listen(3000);


function getDueTimes() {
  // we're returning a promise so we can later reuse in
  // a web server
  return new Promise((resolve, reject) => {
    // make a GET request to get a page of the next due buses
    request({
      url: 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=4194%20Fairmeadow%20Dr,%20Round%20Rock,%20TX%2078665&destinations=717%20E%20Parmer%20Ln,%20Austin,%20TX%2078753&key=AIzaSyBn_KKU3YD0YfACFCb_Trm-ld03iupFFlc'
    }, (error, res, body) => {
      // if there was something wrong with the request, print it
      // out and exit the function
      if (error) {
        return reject(error);
      }


      // now query the DOM for the times (bespoke to your markup)
      // and return just the text for each of those nodes, note
      // that to get a _real_ array back, I have to use `.get()`
      // at the end.
      const times = 10;

      // resolve the promise: specifically, return the times
      const icon = "i996"; // our bus icon
      const data = "
	  {"frames": [
        {
            "text": "Traffic",
            "icon": "a7267"
        }
    ]
}"
      resolve(data);
    });
  });
}