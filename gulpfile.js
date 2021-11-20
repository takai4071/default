const { src, dest, series } = require("gulp");

const del = require("del");

const { html, html_build } = require("./functions/html");
exports.html = html;
exports.html_build = html_build;

const {
  scripts,
  scripts_build,
  lib_scripts_build,
} = require("./functions/scripts");
exports.scripts = scripts;
exports.scripts_build = scripts_build;
exports.lib_scripts_build = lib_scripts_build;

const { styles_build } = require("./functions/styles");
exports.styles_build = styles_build;

const { images_build } = require("./functions/images");
exports.images_build = images_build;

const {
  otf_to_ttf,
  ttf_to_woff,
  ttf_to_woff2,
  fonts_build,
} = require("./functions/fonts");

exports.otf_to_ttf = otf_to_ttf;
exports.ttf_to_woff = ttf_to_woff;
exports.ttf_to_woff2 = ttf_to_woff2;
exports.fonts_build = fonts_build;

// BUILD

function cleandist() {
  return del("dist", { force: true });
}
exports.cleandist = cleandist;

exports.build = series(
  cleandist,
  html_build,
  styles_build,
  scripts_build,
  lib_scripts_build,
  images_build,
  // fonts
  otf_to_ttf,
  ttf_to_woff,
  ttf_to_woff2,
  fonts_build
);


// WATCH

exports.default = serve;

const browserSync = require("browser-sync").create();
exports.browserSync = {browserSync};
const { watch } = require("gulp");

// styles
const scss = require("gulp-sass");

function serve() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    notify: false,
    // Если создавать локальную сеть внутри wifi не нужно (с этим параметром browser-sync работает без интернета)
    // online: false,
    open: false,
  });
  
  // styles
  watch("app/scss/*", function () {
    return src("app/scss/*")
      .pipe(scss())
      .pipe(dest("app/css"))
      .pipe(browserSync.stream());
  });
  watch(["app/js/*", "!app/js/lib.*"]).on("change", browserSync.reload);
  watch("app/html/*", html);
  watch("app/*.html").on("change", browserSync.reload);
}
