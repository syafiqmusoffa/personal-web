function chechkUser(req, res, next) {
    const user = req.session.user

    if (!user) {
        req.flash("error", "Pelase login.")
        return res.redirect("/login")
    }

    next()
}

module.exports = chechkUser