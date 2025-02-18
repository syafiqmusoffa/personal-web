const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const methodOverride = require("method-override")

const {
    renderHome,
    createBlog,
    renderTestimonials,
    renderContact,
    updateBlog } = require("./controllers/controller-v1")
const {
    renderBlog,
    renderBlogDetail,
    renderEditBlog,
    renderCreateBlog,
    deleteBlog } = require('./controllers/controller-v2')

const { formatDateToWIB, getRelativeTime } = require("./utils/time")

const port = 3000;

app.set("view engine", "hbs");
app.set(`views`, path.join(__dirname, "./views"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("assets"));
app.use(methodOverride("_method"));

hbs.registerPartials(__dirname + "/views/partials", function (err) { })
hbs.registerHelper("equal", function (a, b) {
    return a === b;
})
hbs.registerHelper("formatDateToWib", formatDateToWIB)
hbs.registerHelper("getRelativeTime", getRelativeTime)



// HOME

app.get("/", renderHome)

app.get("/index", renderHome)

// Blog list

app.get("/blog", renderBlog)

//  create blog page
app.get("/blog-create", renderCreateBlog)

// submit new blog
app.post("/blog-create", createBlog)

// edit blog page
app.get("/blog-edit/:id", renderEditBlog)

// submit/save edited blog
app.patch("/blog-update/:id", updateBlog)

// app.post("/blog-create", (req, res) => {
//     // const title = req.body.title
//     // const content = req.body.content
//     // const image = req.body.image

//     const { title, content } = req.body // title, & content
//     // console.log("judulnya adalah", title)
//     // console.log("kontenya adalah", content)

//     let image = "https://picsum.photos/200/300"
//     let newBlog = {
//         title: title,
//         content: content,
//         image: "https://picsum.photos/200/300",
//         author: "Syaf",
//         postedAt: new Date(),
//     };

//     blogs.push(newBlog)

//     res.redirect("/blog")

// Blog-detail

app.get("/blog/:id", renderBlogDetail)

// DELETE EXISTING BLOG
app.delete("/blog/:id", deleteBlog)

// Testimonials

app.get("/testimonials", renderTestimonials)

// Contact

app.get("/contact", renderContact)

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

app.get("*", (req, res) => {
    res.render("page-404")
})

app.listen(port, () => {
    console.log(`My personal web app Listening on port ${port}`);
})