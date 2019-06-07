export default {
    HOST: process.env.DBHOST || "localhost",
    PORT: process.env.DBPORT || 27017,
    USER: process.env.DBUSER || "me",
    PASSWORD: process.env.DBPASS || "mypass",
    DBNAME: process.env.DBNAME || "admin"
}