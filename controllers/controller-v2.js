const { Sequelize, where } = require("sequelize")
const bcrypt = require("bcrypt")
const config = require('../config/config.json')
const { Blog, User } = require("../models")
const { Where } = require("sequelize/lib/utils")

const sequelize = new Sequelize(config.development)

const saltRounds = 10

async function authLogin(req, res) {
    const { email, password } = req.body;

    // cek kalau usernya ada atau tidak
    const user = await User.findOne({
        where: {
            email: email,
        }
    })

    if (!user) {
        req.flash("error", "User tidak ditemukan.")
        return res.redirect("/login")
    }

    const isValidated = await bcrypt.compare(password, user.password) // mereturn sebuah boleean

    if (!isValidated) {
        req.flash("error", "Password tidak sesuai")
        return res.redirect("/login")
    }

    ;

    let loggedInUser = user.toJSON()

    delete loggedInUser.password

    req.session.user = loggedInUser

    req.flash("success", `Selamat Datang, ${loggedInUser.name}`)

    res.redirect("/")
}
async function authRegister(req, res) {
    const { name, email, password, confirmPassword } = req.body // object destructuring

    if (password != confirmPassword) {
        req.flash("error", "Password dan confirm password tidak sama!")
        return res.redirect("/register")
    }

    const user = await User.findOne({
        where: {
            email: email,
        }
    })

    if (user) {
        req.flash("error", "Email sudah terdaftar")
        return res.redirect("/register")
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
    })

    const userInsert = await User.create(newUser)

    req.flash("success", "Berhasil mendaftar! Silahkan login")

    res.redirect("/login")
}

async function renderHome(req, res) {
    const user = req.session.user
    res.render("index", { user: user })
}

async function renderContact(req, res) {
    const user = req.session.user
    res.render("contact", { user: user })
}
async function renderTestimonials(req, res) {
    const user = req.session.user
    res.render("testimonials", { user: user })
}

async function renderLogin(req, res) {
    const user = req.session.user
    if (user) {
        req.flash("warning", "user already login")
        res.redirect("/")
    } else {
        res.render("auth-login", { user: user })
    }
}
async function renderRegister(req, res) {
    const user = req.session.user
    if (user) {
        res.redirect("/")
    } else {
        res.render("auth-register", { user: user })
    }
}

async function authLogout(req, res) {
    req.session.user = null

    res.redirect("login")
}

async function renderBlog(req, res) {
    const user = req.session.user

    // if (user) {
    //     const blogs = await Blog.findAll({
    //         order: [["createdAt", "DESC"]]
    //     })

    //     res.render("blog", { blogs: blogs })
    // } else {
    //     res.redirect("/login")
    // }
    const blogs = await Blog.findAll({
        include: {
            model: User,
            as: "user",
            attributes: { exclude: ["password"] }
        },
        order: [["createdAt", "DESC"]]
    })

    if (user) {
        res.render("blog", { blogs: blogs, user: user })
    } else {
        res.render("blog", { blogs: blogs })
    }
}

async function renderBlogDetail(req, res) {
    const user = req.session.user
    const id = req.params.id

    const blogYangDipilih = await Blog.findOne({
        where: {
            id: id
        }
    });

    if (blogYangDipilih === null) {
        res.render("page-404")
    } else {
        res.render("blog-detail", { blog: blogYangDipilih, user: user })
    }
}

async function renderEditBlog(req, res) {
    const user = req.session.user
    const id = req.params.id;
    const blogYangDipilih = await Blog.findOne({
        where: {
            id: id
        }
    });

    if (!user) {
        return res.redirect("/login");
    }

    if (user) {
        res.render("blog-edit", { blog: blogYangDipilih, user: user })
    } else { res.redirect("/login") }
}

async function renderCreateBlog(req, res) {
    const user = req.session.user
    // res.render("blog-create")
    if (user) {
        res.render("blog-create")
    } else {
        res.redirect("auth-login")
    }
}

async function deleteBlog(req, res) {
    const user = req.session.user
    const { id } = req.params

    if (user) {
        const deleteResult = await Blog.destroy({
            where: {
                id: id,
            }
        })
        res.redirect("/blog")
    }
    else {
        res.redirect("/login")
    }
}

async function createBlog(req, res) {

    const { title, content, } = req.body
    let image = "https://picsum.photos/200/300"

    let query = `INSERT INTO "Blogs" (title, content, image) 
    VALUES ('${title}', '${content} ', '${image} ')`;

    const newBlog = ({
        title,
        content,
        image
    })

    const resultSubmit = await Blog.create(newBlog)

    res.redirect("/blog")
}

async function updateBlog(req, res) {
    const id = req.params.id
    const { title, content } = req.body

    const updateResult = await Blog.update({
        title,
        content,
        updatedAt: sequelize.fn("NOW"),
    },
        {
            where: {
                id,
            }
        })

    res.redirect("/blog")
}
async function renderError(req, res) {
    const user = req.session.user
    res.render("page-404", { user: user })
}

module.exports = {
    authLogin,
    authLogout,
    authRegister,
    renderHome,
    renderLogin,
    renderRegister,
    renderBlog,
    renderBlogDetail,
    renderContact,
    renderTestimonials,
    renderError,
    deleteBlog,
    updateBlog,
    renderEditBlog,
    renderCreateBlog,
    createBlog
}