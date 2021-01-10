const { src, dest } = require("gulp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const del = require("del");

function images() {
  return src("app/images/src/**/*")
    .pipe(newer("app/images/dest/"))
    .pipe(imagemin())
    .pipe(dest("app/images/dest/"));
}

function cleanimg() {
  return del("app/images/dest/**/*", { force: true });
}

const images_functions = {
  images,
  cleanimg,
};

module.exports = images_functions;
