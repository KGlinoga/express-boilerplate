// import express
const express = require("express");
const path = require("path")
// creates a server instance, which is app, and you can attach things
const app = express();

// importing a separate array from another file.
const pets = require("./pets.json")


// 
//middleware for find static assets
app.use(express.static("public"))

// Middleware for parsing JSON and urlencoded form data
// allows the app to accept JSON objects and use them like JS objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all the app.get (or other CRUD verb) blocks are ROUTES (it's a combo of the http verb and URL)

// path library from express needs an ABSOLUTE filepath, so requires a dynamically generated filepath. 
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./index.html"))
})

app.get("/pets",(req,res)=>{
    res.json(pets)
})

// post req must be done in 3rd party situation like Insomnia, NOT the browser
app.post("/pets",(req,res)=>{
    console.log(req.body);
    pets.push({
        id:req.body.id,
        name:req.body.name,
        species:req.body.species,
        owner:req.body.owner
    })
    res.json({data:req.body,message:"success!"})
})

//  the :petName means the URL would end in the VALUE from the Name key. it's a URL placeholder parameter.  so we have an endpoint for each pet, w/o making one for each. 
app.get("/pets/:petName",(req,res)=>{
    let thisPet;
    pets.forEach(pet=>{
        if(pet.name.toLowerCase()===req.params.petName.toLowerCase()){
            thisPet = pet;
        }
    })                               
    res.json(thisPet)
})

// lisening for requests on port 3000
app.listen(3000,()=>{
    console.log("listenin to port " + 3000)
})

