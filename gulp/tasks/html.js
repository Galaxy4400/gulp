import fileinclude from "gulp-file-include";
import webphtml from "gulp-webp-html-nosvg";
import version from "gulp-version-number";

export function html() {
	return app.gulp.src(app.path.src.html)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'HTML',
				message: "Error: <%= error.message %>",
			})
		))
		.pipe(fileinclude())
		.pipe(app.plugins.replace(/@img\//g, 'img/'))
		.pipe(webphtml())
		.pipe(version({
			'value': '%DT%',
			'append': {
				'key': 'v',
				'cover': 0,
				'to': [
					'css',
					'js',
				],
			},
			'output': {
				'file': 'gulp/version.json',
			},
		}))
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browserSync.stream());
}