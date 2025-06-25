const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const config = require("../config/config.js");
const { Blog, User, Project } = require("../models");
require("dotenv").config();

const sequelize = new Sequelize(config[process.env.NODE_ENV]);
const saltRounds = 10;

// ===================== AUTH =====================
async function authLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    req.flash("error", "User tidak ditemukan.");
    return res.redirect("/login");
  }

  const isValidated = await bcrypt.compare(password, user.password);
  if (!isValidated) {
    req.flash("error", "Password tidak sesuai");
    return res.redirect("/login");
  }

  const loggedInUser = user.toJSON();
  delete loggedInUser.password;
  req.session.user = loggedInUser;
  req.flash("success", `Selamat Datang, ${loggedInUser.name}`);
  return res.redirect("/");
}

async function authRegister(req, res) {
  const { name, email, password, confirmPassword } = req.body;

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

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await User.create({ name, email, password: hashedPassword });
  req.flash("success", "Berhasil mendaftar! Silahkan login");
  return res.redirect("/login");
}

async function authLogout(req, res) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}

// ===================== RENDERING =====================
async function renderHome(req, res) {
  res.render("index", { user: req.session.user });
}

async function renderContact(req, res) {
  res.render("contact", { user: req.session.user });
}

async function renderTestimonials(req, res) {
  res.render("testimonials", { user: req.session.user });
}

async function renderLogin(req, res) {
  if (req.session.user) {
    req.flash("warning", "User already login");
    return res.redirect("/");
  }
  res.render("auth-login", { user: null });
}

async function renderRegister(req, res) {
  if (req.session.user) {
    return res.redirect("/");
  }
  res.render("auth-register", { user: null });
}

async function renderError(req, res) {
  res.render("page-404", { user: req.session.user });
}

// ===================== BLOG =====================
async function renderBlog(req, res) {
  const blogs = await Blog.findAll({
    include: {
      model: User,
      as: "user",
      attributes: { exclude: ["password"] },
    },
    order: [["createdAt", "DESC"]],
  });
  res.render("blog", { blogs, user: req.session.user });
}

async function renderBlogDetail(req, res) {
  const blog = await Blog.findOne({ where: { id: req.params.id } });
  if (!blog) return res.render("page-404");
  res.render("blog-detail", { blog, user: req.session.user });
}

async function renderEditBlog(req, res) {
  const user = req.session.user;
  const blog = await Blog.findOne({ where: { id: req.params.id } });

  if (!user) return res.redirect("/login");
  if (!blog) return res.render("page-404");

  res.render("blog-edit", { blog, user });
}

async function renderCreateBlog(req, res) {
  res.render("blog-create", { user: req.session.user });
}

async function createBlog(req, res) {
  const user = req.session.user;
  if (!user) {
    req.flash("error", "Please login.");
    return res.redirect("/login");
  }

  const { title, content } = req.body;
  const image = req.file?.path || "https://picsum.photos/200/150";

  await Blog.create({
    title,
    content,
    authorId: user.id,
    image,
  });

  res.redirect("/blog");
}

async function updateBlog(req, res) {
  await Blog.update(
    {
      title: req.body.title,
      content: req.body.content,
      updatedAt: sequelize.fn("NOW"),
    },
    { where: { id: req.params.id } }
  );

  res.redirect("/blog");
}

async function deleteBlog(req, res) {
  if (!req.session.user) return res.redirect("/login");

  await Blog.destroy({ where: { id: req.params.id } });
  res.redirect("/blog");
}

// ===================== PROJECT =====================
async function createProject(req, res) {
  const user = req.session.user;
  const { title, startAt, endAt, content, tech } = req.body;
  const image = req.file?.path || "https://picsum.photos/200";

  await Project.create({
    title,
    authorId: user.id,
    image,
    startAt,
    endAt,
    content,
    tech: Array.isArray(tech) ? tech.join() : tech || "",
  });

  res.redirect("/project");
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
  createProject,
};
