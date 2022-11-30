//Importing Libraies that I installed using npm
const express = require("express");
const app = express();
const bcrypt = require("bcrypt"); //Importing bcrypt package

const users = [];

app.use(express.urlencoded({extended: false}));

app.post("/register", async(req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        console.log(users); //Display newly registered users in console
        res.redirect("/login");
    } catch (e) {
        console.log(e);
        res.redirect("/register");
    }
});

//Routes
app.get('/', (req,res) => {
    res.render('index.ejs')
});

app.get('/login', (req,res) => {
    res.render('login.ejs')
});

app.get('/register', (req,res) => {
    res.render('register.ejs')
});
//End routes


app.listen(3000);