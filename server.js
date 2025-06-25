const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const methodOverride = require("method-override")
const flash = require("express-flash")
const session = require("express-session")
const upload = require("./middlewares/upload-file")
require("dotenv").config()

const {
    renderProject,
    renderCreateProject,
    renderEditProject,
    createProject,
    updateProject,
    deleteProject
} = require("./controllers/controller-v1")
const {
    renderTestimonials,
    renderContact,
    renderError,
    renderHome,
    authLogin,
    authRegister,
    authLogout,
    renderBlog,

    renderLogin,
    renderRegister,
    renderBlogDetail,
    renderEditBlog,
    renderCreateBlog,
    createBlog,
    deleteBlog,
    updateBlog } = require('./controllers/controller-v2')

const { formatDateToWIB, getRelativeTime } = require("./utils/time");

const chechkUser = require("./middlewares/auth");

const port = process.env.SERVER_PORT || 3000;

app.set("view engine", "hbs");
app.set(`views`, path.join(__dirname, "./views"));


// modul apa saja yang digunakan dalam express
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static("assets"));
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(methodOverride("_method"));
app.use(flash())
app.use(session(
    {
        name: "my-session",
        secret: "wewegombel",
        resave: false,
        saveUninitialized: true,

    }
))

hbs.registerPartials(__dirname + "/views/partials", function (err) { })
hbs.registerHelper("equal", function (a, b) {
    return a === b;
})
hbs.registerHelper("formatDateToWib", formatDateToWIB)
hbs.registerHelper("getRelativeTime", getRelativeTime)



// HOME

app.get("/", renderHome)

app.get("/index", renderHome)

app.get("/login", (req, res) => {
    res.render("auth-login")
})
app.get("/register", (req, res) => {
    res.render("auth-register")
})

app.post("/login", authLogin)

app.get("/logout", authLogout)

app.get("/login", renderLogin)

app.get("/register", renderRegister)

app.post("/register", authRegister)

// Blog list

app.get("/blog", renderBlog)

app.get("/project", renderProject)

//  create blog page & project
app.get("/blog-create", renderCreateBlog)
app.get("/project-create", renderCreateProject)

// submit new blog
app.post("/blog-create", chechkUser, upload.single("image"), createBlog)
app.post("/project-create", upload.single("image"), createProject)

// edit blog page
app.get("/blog-edit/:id", renderEditBlog)
app.get("/project-edit/:id", renderEditProject)

// submit/save edited blog
app.patch("/blog-update/:id", updateBlog)
app.patch("/project-update/:id", updateProject)

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
app.delete("/project/:id", deleteProject)

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

app.get("*", renderError)

app.listen(port, () => {
    console.log(`My personal web app Listening on port ${port}`);
})