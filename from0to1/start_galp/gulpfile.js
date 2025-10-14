const { src, dest, watch, parallel, series } = require("gulp");
// const { src, dest, series } = gulp;
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
// const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const del = require("del");
const browserSync = require("browser-sync").create();

// import gulp from "gulp";
// import imagemin from "gulp-imagemin";
// import { gifsicle, mozjpeg, optipng } from "gulp-imagemin"; // Если вы используете плагины imagemin

// export const images = () => {
//   return src("src/images/**/*.{jpg,png,svg,gif}")
//     .pipe(
//       imagemin([
//         mozjpeg({ quality: 75, progressive: true }),
//         optipng({ optimizationLevel: 5 }),
//       ])
//     )
//     .pipe(dest("dist/images"));
// };

// export default series(images);

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    notofy: false,
    // notify: false,
  });
}

function styles() {
  return (
    src("app/scss/style.scss")
      .pipe(scss({ outputStyle: "compressed" }))
      .pipe(concat("style.min.css"))
      // .pipe(
      //   autoprefixer({
      //     overrideBrowserslist: ["last 10 versions"],
      //     grid: true,
      //   })
      // )
      .pipe(dest("app/css"))
      .pipe(browserSync.stream())
  );
}

function scripts() {
  return src(["node_modules/jquery/dist/jquery.js", "app/js/main.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}
function images() {
  return src("app/images/**/*.*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { name: "removeViewBox", active: true },
            { name: "cleanupIDs", active: false },
          ],
        }),
      ])
    )
    .pipe(dest("dist/images"));
}

function build() {
  return src(["app/**/*.html", "app/css/style.min.css", "app/js/main.min.js"], {
    base: "app",
  }).pipe(dest("dist"));
}
function cleanDist() {
  return delete "dist";
}

function watching() {
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/**/*.html"]).on("change", browserSync.reload);
}
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);

exports.default = parallel(styles, scripts, browsersync, watching);
