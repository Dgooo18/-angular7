var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/devExample1", {
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.log("error");

    } else {
        console.log("base de datos conectada");

    }
});

var sex = ['M', 'F'];
var regex = [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "ingresa un email válido"];

var user_schema = new Schema({
    name: String,
    username: { type: String, required: true, maxlength: [15, 'Username supera lo 15 caracteres'] },
    password: { 
        type: String,
        minlength: [2, 'pass debe ser de mas de 4 caracteres'],
        validate:   {
            validator: ()=>{
                return this.pass_confirm == this.password;
            },
            message: "Las contraseñas no son iguales"
        }
    },
    age: { type: Number, min: [5, "la edad de e ser superior a 4 años"], max: [300, 'la edad supera los 90 años'] },
    email: { type: String, required: "El email es obligatorio", match: regex },
    date_of_birth: { type: Date },
    sex: { type: String, enum: { values: sex, message: "Solo se pude ingresar los valores F y M" } }
});

user_schema.virtual("pass_confirm").get(() => {
    return this.pass;
}).set((password) => {
    this.pass = password;
});

var User = mongoose.model("User", user_schema);
module.exports.User = User;
