const { src, dest, parallel, series, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const scss = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const del = require("del");
const babel = require("gulp-babel");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const fonter = require("gulp-fonter");

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    notify: false,
    // Если создавать локальную сеть внутри wifi не нужно (с этим параметром browser-sync работает без интернета)
    // online: false,
    open: false,
  });
}

function scripts() {
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

function styles() {
  return src("app/scss/main.scss")
    .pipe(scss())
    .pipe(concat("app.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 versions"],
        grid: true,
      })
    )
    .pipe(
      cleancss({
        level: {
          1: {
            specialComments: 0,
          },
        },
        // Если нужен читаемый код в app.min.css
        // format: "beautify",
      })
    )
    .pipe(dest("app/css/"))
    .pipe(browserSync.stream());
}

function images() {
  return src("app/images/src/**/*")
    .pipe(newer("app/images/dest/"))
    .pipe(imagemin())
    .pipe(dest("app/images/dest/"));
}

function cleanimg() {
  return del("app/images/dest/**/*", { force: true });
}

function cleandist() {
  return del("dist", { force: true });
}

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

function cleanfonts() {
  return del("app/fonts/dest/**/*", { force: true });
}

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

function startwatch() {
  watch("app/**/*.scss", styles);
  watch(["app/**/*.js", "!app/**/*.min.js"], scripts);
  watch("app/**/*.html").on("change", browserSync.reload);
  watch("app/images/src/**/*", images);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.cleanfonts = cleanfonts;
exports.otf_to_ttf = otf_to_ttf;
exports.ttf_to_woff = ttf_to_woff;
exports.ttf_to_woff2 = ttf_to_woff2;
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

exports.default = parallel(scripts, styles, browsersync, startwatch);
