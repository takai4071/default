const { src, dest } = require("gulp");
const scss = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");


function styles_build() {
  return src("app/scss/*")
    .pipe(scss())

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
    .pipe(dest("dist/css"));
}

module.exports = { styles_build };
