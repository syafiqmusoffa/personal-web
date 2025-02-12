const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "hbs");

app.use(express.static("assets"));

// HOME

app.get("/", (req, res)=> {
    res.render("blog")
 })

app.get("/index", (req, res)=> {
    // const id = req.params.id
    // res.send(`Halo! ini halaman utama`);
   res.render("index")
})

// Blog

app.get("/blog", (req, res)=> {
    res.render("blog")
 })

// Blog-detail

app.get("/blog-detail", (req, res)=> {
    res.render("blog-detail")
 })
 
// Testimonials

app.get("/testimonials", (req, res)=> {
    res.render("testimonials")
 })
 
// Contact

app.get("/contact", (req, res)=> {
    res.render("contact")
 }) 

// REQUEST PARAMS
// app.get("/about/:id", (req, res) => {
//     res.send(`Halo! ini halaman tentang ${id}`);
// })

// REQUEST QUERY
// app.get("/blog?title=javascript", (req, res) => {
//     // const title = req.query.title;
//     // const author = req.query.author;
//     // const year = req.query.year;

//     const {title, author, year} = req.query
//     // console.log(req.query)
//     // res.send("ini halaman blog" + title + "dengan author" + author "tahun" + year);
//     res.send(`ini halaman blog ${title} dengan author ${author} tahun ${year}`);

//     // res.send("ok");
// })



app.listen(port, () =>{
    console.log(`My personal web app Listening on port ${port}`);
})