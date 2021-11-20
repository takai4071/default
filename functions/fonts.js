const { src, dest } = require("gulp");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const fonter = require("gulp-fonter");
const del = require("del");

function otf_to_ttf() {
  return src("app/fonts/src/**/*.otf")
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(dest("app/fonts/src/"));
}

function ttf_to_woff() {
  return src("app/fonts/src/**/*.ttf")
    .pipe(ttf2woff())
    .pipe(dest("app/fonts/dest/"));
}

function ttf_to_woff2() {
  return src("app/fonts/src/**/*.ttf")
    .pipe(ttf2woff2())
    .pipe(dest("app/fonts/dest/"));
}

function fonts_build() {
  return src("app/fonts/dest/**").pipe(dest("dist/fonts/dest/"));
}

module.exports = {
  otf_to_ttf,
  ttf_to_woff,
  ttf_to_woff2,
  fonts_build,
};
