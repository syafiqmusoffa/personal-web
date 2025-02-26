const { Sequelize, QueryTypes, DATE, INTEGER } = require("sequelize")
const config = require("../config/config.js")
require("dotenv").config
const bcrypt = require("bcrypt")

const { User, BLog, Project } = require("../models")

const saltRounds = 10;

const sequelize = new Sequelize(config[process.env.NODE_ENV]);

const { create } = require("hbs");
const { query } = require("express");
const { UPDATE } = require("sequelize/lib/query-types");

let blogs = [
    {
        title: "Pasar Coding Indonesia",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
        image: "/img/blog-img.png",
        author: "Syaf",
        postedAt: new Date("Fri July 21 2024 10:15:00 GMT+0700 (Western Indonesia Time)"),
    },
    {
        title: "Blog Judul ke2",
        content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. ..",
        image: "/img/coding.jpg",
        author: "Syaf",
        postedAt: new Date("Fri July 28 2024 20:35:00 GMT+0700 (Western Indonesia Time)"),
    }
]

function renderHome(req, res) {
    res.render("index")
}

async function renderBlog(req, res) {
    const blogs = await sequelize.query(`SELECT * FROM "Blogs" ORDER BY "createdAt" DESC`, {
        type: QueryTypes.SELECT
    });
    // console.log(blogs);
    res.render("blog", { blogs: blogs })
}

async function renderBlogDetail(req, res) {
    const id = req.params.id
    const query = `SELECT * FROM "Blogs" WHERE id = ${id}`
    const blogYangDipilih = await sequelize.query(query, { type: QueryTypes.SELECT })
    // console.log(blogYangDipilih)
    res.render("blog-detail", { blog: blogYangDipilih[0] })
}


function renderCreateBlog(req, res) {
    res.render("blog-create")
}

async function createBlog(req, res) {
    const { title, content } = req.body
    let image = "https://picsum.photos/200/300"
    // let newBlog = {
    //     title: title,
    //     content: content,
    //     image: "https://picsum.photos/200/300",
    //     author: "Syaf",
    //     postedAt: new Date(),
    // };

    // blogs.push(newBlog)

    // res.redirect("/blog")
    let query = `INSERT INTO "Blogs" (title, content, image) 
    VALUES ('${title}', '${content} ', '${image} ')`;

    const blogs = await sequelize.query(query, {
        type: QueryTypes.INSERT,
    });

    res.redirect("blog")
}

function renderTestimonials(req, res) {
    res.render("testimonials")
}


function renderContact(req, res) {
    res.render("contact")
}

async function renderEditBlog(req, res) {
    const id = req.params.id;
    // const blogYangDipilih = blogs[id]
    const query = `SELECT * FROM "Blogs" WHERE id = ${id}`
    const blogYangDipilih = await sequelize.query(query, { type: QueryTypes.SELECT })
    // console.log(blogYangDipilih)
    res.render("blog-edit", { blog: blogYangDipilih[0], })
}

async function updateBlog(req, res) {
    const id = req.params.id;
    const { title, content } = req.body

    const query = `UPDATE "Blogs" SET title='${title}', content='${content}'
    WHERE id = ${id}`

    const updateResult = await sequelize.query(query, { type: QueryTypes.UPDATE })

    // let image = "https://picsum.photos/200/300"
    // let updatedBlog = {
    //     title: title,
    //     content: content,
    //     image: "https://picsum.photos/200/300",
    //     author: "Syaf",
    //     postedAt: new Date(),
    // };
    // blogs[id] = updatedBlog
    res.redirect("/blog")
}

async function deleteBlog(req, res) {
    const id = req.params.id;
    const query = `DELETE FROM "Blogs" WHERE id = ${id}`
    // const blogYangDipilih = blogs[id]
    // console.log(blogYangDipilih)
    const deleteResult = await sequelize.query(query, { type: QueryTypes.DELETE })
    // console.log("result query delete :", deleteResult)
    // blogs.splice(id, 1) // array manipulation => perubahan data pada array

    res.redirect("/blog")
}

// all about project

async function renderProject(req, res) {
    const user = req.session.user;
    const query = `SELECT * FROM "Projects"`
    const projects = await sequelize.query(query, {
        type: QueryTypes.SELECT
    })

    res.render("project", { projects: projects, user: user })
}

function renderCreateProject(req, res) {
    res.render("project-create")
}

async function renderEditProject(req, res) {
    const user = req.session.user;
    const id = req.params.id;
    const query = `SELECT * FROM "Projects" WHERE id=${id}`;
    const renderProjectDipilih = await sequelize.query(query, {
        type: QueryTypes.SELECT
    })

    if (!user) {
        return res.redirect('/login')
    }

    if (renderProjectDipilih === null) {
        res.render("page-404")
    } else {
        res.render("project-edit", { project: renderProjectDipilih[0], user: user });
    }
    // console.log("ini yamg mau di render ", renderProjectDetail[0]);
}

async function createProject(req, res) {
    const user = req.session.user;

    const authorId = user.id;

    const { title, startAt, endAt, content } = req.body;

    // let technologies = tech.join(", ");

    const checkedTechnologies = ["nodeJs", "nextJs", "reactJs", "typeScript"]
    const tech = checkedTechnologies.join(", ")

    const oneDay = 24 * 60 * 60 * 1000;
    var tglPertama = Date.parse(startAt);
    var tglKedua = Date.parse(endAt);

    var selisih = (tglKedua - tglPertama) / oneDay;

    // console.log("Total hari: ", selisih);

    const image = req.file.path;
    // console.log("gambar yang di upload ", image);   


    const query = `INSERT INTO  "Projects" ("authorId", title, content, tech, "startAt", "endAt", image, "selisihWaktu")
                      VALUES ('${authorId}','${title}', '${content}', '${tech}', '${startAt}','${endAt}', '${image}', '${selisih}')`;

    const projects = await sequelize.query(query, {
        type: QueryTypes.INSERT
    });


    res.redirect("/project")
}

async function deleteProject(req, res) {
    const user = req.session.user
    const id = req.params.id;
    // console.log("ini id yan gmau dihapus: ", id);
    const query = `DELETE FROM "Projects" WHERE id = ${id}`;


    if (user) {
        const deleteResult = await sequelize.query(query, {
            type: QueryTypes.DELETE
        })
        res.redirect("/project")
    } else {
        res.redirect('/login')
    }

}

async function updateProject(req, res) {
    const id = req.params.id;
    const { title, content } = req.body

    const query = `UPDATE "Projects" SET title='${title}', content='${content}'    WHERE id = ${id}`

    const updateResult = await sequelize.query(query, { type: QueryTypes.UPDATE })

    res.redirect("/project")
}

module.exports = {
    renderHome,
    renderBlog,
    renderBlogDetail,
    createBlog,
    renderTestimonials,
    renderContact,
    deleteBlog,
    renderCreateBlog,
    renderEditBlog,
    updateBlog,

    renderProject,
    renderCreateProject,
    renderEditProject,
    createProject,
    updateProject,
    deleteProject
}

