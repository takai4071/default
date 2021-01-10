const { parallel, series, watch } = require("gulp");

const { browsersync, browserSync } = require("./functions/browsersync");
exports.browsersync = browsersync;

const scripts = require("./functions/scripts");
exports.scripts = scripts;

const styles = require("./functions/styles");
exports.styles = styles;

const { images, cleanimg } = require("./functions/images");
exports.images = images;
exports.cleanimg = cleanimg;

const {
  otf_to_ttf,
  ttf_to_woff,
  ttf_to_woff2,
  cleanfonts,
} = require("./functions/fonts");
exports.otf_to_ttf = otf_to_ttf;
exports.ttf_to_woff = ttf_to_woff;
exports.ttf_to_woff2 = ttf_to_woff2;
exports.cleanfonts = cleanfonts;

const { buildcopy, cleandist } = require("./functions/build");

exports.build = series(
  cleandist,
  styles,
  scripts,
  images,
  cleanfonts,
  otf_to_ttf,
  ttf_to_woff,
  ttf_to_woff2,
  buildcopy
);
exports.cleandist = cleandist;

function startwatch() {
  watch("app/**/*.scss", styles);
  watch(["app/**/*.js", "!app/**/*.min.js"], scripts);
  watch("app/**/*.html").on("change", browserSync.reload);
  watch("app/images/src/**/*", images);
}

exports.default = parallel(scripts, styles, browsersync, startwatch);
