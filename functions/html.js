// использует htmlincludes

const { exec } = require("child_process");

function html(cb) {
  cb();
  return exec("npm run html-dev-compile");
}

function html_build(cb) {
  cb();
  return exec("npm run html-prod-compile");
}

module.exports = { html, html_build };
