// import express from 'express'; // ES2015 Modules
const express = require("express"); // CommonJS Modules
const shortid = require('shortid'); //ID generator


const server = express();

server.use(express.json()); // teaches express how to read JSON from the body
server.use(cors()) //CORS

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
   if(users){
    res.status(200).json(users);
   }
   else{
    res.status(500).json({ errorMessage: "The users information could not be retrieved." });
   }

  });

  server.get("/api/users/:id", function (req, res) {
    const id = req.params.id;
    const user = users.filter(element => element.id === id)
    const checkID = users.filter(element => element.id !== id)
    if(checkID.length == users.length){
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
    else{
        res.status(200).json(user);
    }
    const checkName = users.filter(element => element.name !== user.name)
    if(checkName.length == users.length){
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });

    }   
    
  });

  server.post("/api/users", function (req, res) {
    const user = {
        id: shortid.generate(),
        name: req.body.name,
        bio: req.body.bio
    }

    if(user.id && user.bio){
        users.push(user);
        res.status(201).json(users);
    }
    else{
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }

    if(users[users.length-1].id !== user.id ){
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
    }
    
  });

  server.put("/api/users/:id", function(req, res) {
    const id = req.params.id;
    const checkID = users.filter(element => element.id !== id)
    if(checkID.length == users.length){
        res.status(404).json({ message: "The user with the specified ID does not exist." });

    }
    else{
        if(req.body.name && req.body.bio){
        users.forEach(element =>{
            if(element.id == id){
                element.name = req.body.name;
                element.bio = req.body.bio;
            }
        })
        }
        else{
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        }
    }

    users.forEach(element =>{
        if(element.id == id && element.name == req.body.name && element.bio == req.body.bio){
            res.status(200).json(element);
        }
    })

    const checkUser = users.filter(element => element.id == id && element.name == req.body.name && element.bio == req.body.bio);
    if(users.length == checkUser.length){
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }

  });

  server.delete("/api/users/:id", function (req, res) {
    const id = req.params.id;
    const checkID = users.filter(element => element.id !== id)
    if(checkID.length == users.length){
        res.status(404).json({ message: "The user with the specified ID does not exist." });

    }
    else{
    users.forEach((element, index)=>{
        if(element.id === id){
            res.status(200).json(element);
            users.splice(index, 1)
        }
    })
}
users.forEach(element =>{
    if(element.id == id){
        res.status(500).json({ errorMessage: "The user could not be removed" });
    }
})
 
  });

server.listen(5000, () =>
  console.log('Server listening on port 5000')
);

