//modules
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var User = require("./models/User").User;
//pruebas de conexion

//prueba de esquemas


//seting
app.set("view engine", "jade");

//routes
app.use(express.static('public'));

app.use(bodyParser.json()); //para json
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/sessions", (req, res) =>{
    var result = User.find({email: req.body.email, password: req.body.password},"name email", (err, docs)=>{
        res.send("session iniciada");
    });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/users", (req, res) => {
    var user = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        pass_confirm: req.body.repass
    });

    user.save().then( (us) => {
        console.log("usuario guardado exitosamente");
        res.send(us);
    }, (err) => {
        if (err) {
            res.send(err);
        }
    });

    /*user.save( (err, user, numberOfRows) => {
        if (err) {
            res.send(err);
        }else{

            var data = User.find((err, data) =>{
               (data) ? res.send(data) : res.send("no se encontraron usuarios");  
            });
        }
        
    });*/


    //res.send("El name es " + req.body.email + "\n El pass es " + req.body.password);
});

/*
app.get("/:name", (req, res) => {
    res.render("index",{name: req.params.name});
});

app.post("/", (req, res) => {
    res.render("recibir");
});*/

//server init
app.listen("3000","localhost",() =>{
    console.log("Server connected");
} );
