const express = require("express");
const app = express();
const port = 3000;
const hbs = require("hbs");
const path = require("path");

const { formatDateToWIB, getRelativeTime } = require("./utils/time")


app.set("view engine", "hbs");
app.set(`views`, path.join(__dirname, "./views"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("assets"));

hbs.registerPartials(__dirname + "/views/partials", function (err) { })
hbs.registerHelper("equal", function (a, b) {
    return a === b;
})
hbs.registerHelper("formatDateToWib", formatDateToWIB)
hbs.registerHelper("getRelativeTime", getRelativeTime)

let blogs = []

// HOME

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/index", (req, res) => {
    // const id = req.params.id
    // res.send(`Halo! ini halaman utama`);
    res.render("index")
})

// Blog list

app.get("/blog", (req, res) => {
    console.log(blogs);
    res.render("blog", { blogs: blogs })
})

//  create blog page
app.get("/blog-create", (req, res) => {
    res.render("blog-create")
})

// submit new blog
app.post("/blog-create", (req, res) => {
    // const title = req.body.title
    // const content = req.body.content
    // const image = req.body.image

    const { title, content } = req.body // title, & content
    // console.log("judulnya adalah", title)
    // console.log("kontenya adalah", content)

    let image = "https://picsum.photos/200/300"
    let newBlog = {
        title: title,
        content: content,
        image: "https://picsum.photos/200/300",
        author: "Syaf",
        postedAt: new Date(),
    };

    blogs.push(newBlog)

    res.redirect("/blog")
})

// Blog-detail

app.get("/blog-detail", (req, res) => {
    res.render("blog-detail")
})

// Testimonials

app.get("/testimonials", (req, res) => {
    res.render("testimonials")
})

// Contact

app.get("/contact", (req, res) => {
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



app.listen(port, () => {
    console.log(`My personal web app Listening on port ${port}`);
})