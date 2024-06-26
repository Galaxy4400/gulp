import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export function images() {
	return app.gulp.src(app.path.src.img, { encoding: false })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'IMAGES',
				message: "Error: <%= error.message %>",
			})
		))
		.pipe(app.plugins.newer(app.path.build.img))
		.pipe(webp())
		.pipe(app.gulp.dest(app.path.build.img))
		.pipe(app.gulp.src(app.path.src.img, { encoding: false }))
		.pipe(app.plugins.newer(app.path.build.img))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			interlaced: true,
			optimizationLevel: 3,
		}))
		.pipe(app.gulp.dest(app.path.build.img))
		.pipe(app.gulp.src(app.path.src.svg, { encoding: false })) // Почему-то выдаёт ошибку если в ресурсах нет ни одной svg
		.pipe(app.gulp.dest(app.path.build.img))
		.pipe(app.plugins.browserSync.stream());
}