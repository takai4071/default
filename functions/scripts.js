const { src, dest } = require("gulp");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;

const { browserSync } = require("./browsersync");

function scripts() {
  return src(["node_modules/jquery/dist/jquery.min.js", "app/js/app.js"])
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js/"))
    .pipe(browserSync.stream());
}

function scripts_build() {
  return src(["node_modules/jquery/dist/jquery.min.js", "app/js/app.js"])
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js/"))
    .pipe(browserSync.stream());
}

const scripts_functions = {
  scripts,
  scripts_build,
};

module.exports = scripts_functions;
