const { src, dest } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify-es").default;
const rename = require("gulp-rename");

const { browserSync } = require("../gulpfile");

const LIBS = ["node_modules/jquery/dist/jquery.min.js"];

function scripts() {
  return src(LIBS)
    .pipe(
      rename(function (path) {
        return {
          dirname: path.dirname,
          basename: "lib." + path.basename,
          extname: path.extname,
        };
      })
    )
    .pipe(dest("app/js"));
}

function scripts_build() {
  return src(["app/js/*", "!app/js/lib.*"])
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(uglify())
    .pipe(dest("dist/js"));
}

function lib_scripts_build() {
  return src("app/js/lib.*").pipe(dest("dist/js"));
}

module.exports = {
  scripts_build,
  lib_scripts_build,
  scripts,
};
