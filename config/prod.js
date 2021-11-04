module.exports = {
    dbOptions: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB
    },
    secret: 'We are online',
    MYSQL_DB: process.env.MYSQL_DB,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_USER_TABLE: process.env.MYSQL_USER_TABLE,
    cookieKeys: process.env.COOKIE_KEY,
}