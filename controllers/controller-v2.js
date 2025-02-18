const { Sequelize, where } = require("sequelize")
const config = require('../config/config.json')
const { Blog } = require("../models")
const { Where } = require("sequelize/lib/utils")

const sequelize = new Sequelize(config.development)

async function renderBlog(req, res) {
    const blogs = await Blog.findAll({
        order: [["createdAt", "DESC"]]
    })

    res.render("blog", { blogs: blogs })
}

async function renderBlogDetail(req, res) {
    const id = req.params.id

    const blogYangDipilih = await Blog.findOne({
        where: {
            id: id
        }
    });

    if (blogYangDipilih === null) {
        res.render("page-404")
    } else {
        res.render("blog-detail", { blog: blogYangDipilih })
    }
}

async function renderEditBlog(req, res) {
    const id = req.params.id;
    const blogYangDipilih = await Blog.findOne({
        where: {
            id: id
        }
    });
    res.render("blog-edit", { blog: blogYangDipilih })
}

async function renderCreateBlog(req, res) {
    res.render("blog-create")
}

async function deleteBlog(req, res) {
    const { id } = req.params

    const deleteResult = await Blog.destroy({
        where: {
            id: id,
        }
    })

    res.redirect("/blog")
}

async function createBlog(req, res) {
    //
}

async function updateBlog(req, res) {
    //
}


module.exports = { renderBlog, renderBlogDetail, deleteBlog, updateBlog, renderEditBlog, renderCreateBlog, createBlog }