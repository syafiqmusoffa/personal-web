const express = require("express");
const app = express();
const port = 3002;

app.set("view engine", "hbs");

app.use(express.static("assets"));

// HOME
app.get("/", (req, res)=> {
    res.render("index");
})

// CONTACT ME
app.get("/contact", (req, res) => {
    res.render("contact");
})

// BLOG
app.get("/blog", (req, res) => {
    res.render("blog");
})




app.listen(port, () =>{
    console.log(`My personal web app Listening on port ${port}`);
})