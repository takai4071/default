const browserSync = require("browser-sync").create();

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

const bs = {
  browserSync,
  browsersync,
};

module.exports = bs;
