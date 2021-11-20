const { src, dest } = require("gulp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const del = require("del");

function images_build() {
  return (
    src("app/images/*")
      // .pipe(newer("app/images/dest/"))
      .pipe(imagemin())
      .pipe(dest("dist/images"))
  );
}

module.exports = {
  images_build,
};
