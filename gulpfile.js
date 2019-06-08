const gulp = require("gulp"),
    nodemon = require("nodemon"),
    browserSync = require("browser-sync"),
    webpack = require("webpack"),
    debounce = require("lodash/debounce")


let config = {
    APP_PORT: 3010,
    BS_PORT: 3000
}

let compilers = {};
let webpackConfs = require("./webpack.config.js");
let demon = null;

// process.env.BABEL_ENV = "client";

let buildFromEntry = (name, conf) => callback => {
    let compiler = compilers[name] || webpack(conf);
    compilers[name] = compiler;
    compiler.run(callback);
}

gulp.task("build:server", buildFromEntry("server", webpackConfs.serverConfig));
gulp.task("build:client", buildFromEntry("client", webpackConfs.clientConfig));

gulp.task("watch", callback => {
    let reload = cb => (demon.emit("restart"), cb())
    gulp.watch("./app/**/*", gulp.series("build:client", reload));
    callback();
});


gulp.task("serve", callback => {    
    browserSync.init({
        port: config.BS_PORT,
        watch: false,        
        proxy: "localhost:" + config.APP_PORT        
    })

    // debounce reloading to trailing edge
    browserSync.reload = debounce(browserSync.reload, 700)
    
    demon = nodemon({
        script: "app/server.js",
        exec: "node -r @babel/register",
        watch: false,
        env: {
            "BABEL_ENV": "server",
            "NODE_ENV": "development",
            "PORT": config.APP_PORT
        }
    });

    demon.on("start", () => {
        console.log("Nodemon restarting the application...")
        browserSync.reload();
    });
    callback();
})

gulp.task("build", gulp.parallel("build:client", "build:server"))
gulp.task("start", gulp.series("build:client", "serve", "watch"))
gulp.task("default", gulp.series("start"))

