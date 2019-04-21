const http = require("http");
const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title><head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send Hello</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    // fires at the end
    // this a callback and will run a synchronosly. It will register and run after the
    return req.on("end", () => {
      //create a new buffer and add all chunks to it
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      //creates 2 objects in an array and gets the second one
      const message = parsedBody.split("="[1]);
      fs.writeFile("message.txt", message, err => {
        // actions that we want after we finish writing the file
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title><head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';

// exports.handler = requestHandler;
// exports.someText = 'Some hard coded text';
