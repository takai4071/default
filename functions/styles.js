const { src, dest } = require("gulp");
const scss = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const concat = require("gulp-concat");

const { browserSync } = require("./browsersync");

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

module.exports = styles;
