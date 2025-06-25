const { Sequelize, where, QueryTypes } = require("sequelize")
const bcrypt = require("bcrypt")
const config = require("../config/config.js")
const { Blog, User, Project } = require("../models")
const { Where } = require("sequelize/lib/utils")
const query = require('express')

require("dotenv").config

const sequelize = new Sequelize(config[process.env.NODE_ENV]);

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
  const { name, email, password, confirmPassword } = req.body;

  console.log(req.body);

  if (!name || !email || !password || !confirmPassword) {
    req.flash("error", "Semua field harus diisi!");
    return res.redirect("/register");
  }

  if (password !== confirmPassword) {
    req.flash("error", "Password dan confirm password tidak sama!");
    return res.redirect("/register");
  }

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    req.flash("error", "Email sudah terdaftar");
    return res.redirect("/register");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  req.flash("success", "Berhasil mendaftar! Silahkan login");
  return res.redirect("/login");
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
    const user = req.session.user;
    const id = req.params.id;
    const blogYangDipilih = await Blog.findOne({
        where: {
            id: id,
        },
    });

    if (!user) {
        return res.redirect("/login");
    }

    if (blogYangDipilih === null) {
        res.render("page-404");
    } else {
        // console.log("v2 blog detail :", blogYangDipilih);

        res.render("blog-edit", { blog: blogYangDipilih, user: user });
    }

}

async function renderCreateBlog(req, res) {
    const user = req.session.user
    res.render("blog-create", { user: user })
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
    const user = req.session.user

    if (!user) {
        req.flash("error", "Pelase login.")
        return res.redirect("/login")
    }

    const { title, content } = req.body; // title dan content adalah properti milik req.body

    let dummyImage = "https://picsum.photos/200/150";

    const image = req.file.path;
    console.log("image yg di upload :", image);

    const newBlog = {
        title, // ini sama saja dengan menuliskan title: title
        content,
        authorId: user.id,
        image: image,
    };

    const resultSubmit = await Blog.create(newBlog); // apa result nya ketika disubmit, gagal atau berhasil?

    res.redirect("/blog"); // URL, bukan nama file
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

async function createProject(req, res) {
    const user = await req.session.user;
    const { title, startAt, endAt, content, tech } = req.body;
    // const image = req.file.path
    const image = req.file.path;
    const newProject = {
        title,
        authorId: user.id,
        image: image,
        startAt,
        endAt,
        content,
        tech: tech ? [].concat(tech).join() : '',
    };
    const resultSubmit = await Project.create(newProject);
    res.redirect('/project');
    // console.log(newProject.technologies.split(','));
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
    createBlog,
    createProject
}