// import express from 'express'; // ES2015 Modules
const express = require("express"); // CommonJS Modules
const shortid = require('shortid'); //ID generator


const server = express();

server.use(express.json()); // teaches express how to read JSON from the body

const users= [
    {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane",  // String, required
},
    {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: "John Doe", // String, required
    bio: "A John that doesnt like Johns",  // String, required
},
    {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: "Bobby Brown", // String, required
    bio: "Bobby, who is brown",  // String, required
},
    {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: "Rick Ricky", // String, required
    bio: "Rick who is also Ricky",  // String, required
},
    {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: "Daniel Dan", // String, required
    bio: "Dan, not Daniel",  // String, required
},
    {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: "Bill Biller", // String, required
    bio: "Bill never pays the bills",  // String, required
},

]

server.get("/api/users", (req, res) => {
    res.status(200).json(users);

  });

  server.get("/api/users/:id", function (req, res) {
    const id = req.params.id;
    const user = users.filter(element => element.id === id)
    res.status(200).json(user);
  });

  server.post("/api/users", function (req, res) {
    const user = {
        id: shortid.generate(),
        name: req.body.name,
        bio: req.body.bio
    }

    users.push(user);
    res.status(201).json(users).send('Post Success');
  });

  server.delete("/api/users/:id", function (req, res) {
    const id = req.params.id;
    users.forEach((element, index)=>{
        if(element.id === id){
            res.status(200).json(element);
            users.splice(index, 1)
        }
    })
 
  });

server.listen(5000, () =>
  console.log('Server listening on port 5000')
);

