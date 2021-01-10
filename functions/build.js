const { src, dest } = require("gulp");
const del = require("del");

function buildcopy() {
  return src(
    [
      "app/css/**/*.min.css",
      "app/js/**/*.min.js",
      "app/images/dest/**/*",
      "app/fonts/dest/**/*",
      "app/**/*.html",
    ],
    { base: "app" }
  ).pipe(dest("dist"));
}

function cleandist() {
  return del("dist", { force: true });
}

const build_functions = {
  buildcopy,
  cleandist,
};

module.exports = build_functions;
