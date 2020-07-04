module.exports = {
    user: "devapi",
    pwd: "devapi",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "27017",
    db: "t-maj-api"
}
