const { watch } = require("gulp");

function startwatch() {
  watch("app/**/*.scss", styles);
  watch(["app/**/*.js", "!app/**/*.min.js"], scripts);
  watch("app/**/*.html").on("change", browserSync.reload);
  watch("app/images/src/**/*", images);
}

module.exports = startwatch;
