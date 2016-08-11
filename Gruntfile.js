module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jade: {
			compile: {
				options: {
					client: false,
					pretty: true
				},
				files: [ {
					src: "views/grunt/layout.jade",
					dest: "layout.html",
					ext: "html",
					cwd: ""
				}, {
					src: "views/grunt/index.jade",
					dest: "index.html",
					ext: "html",
					cwd: ""
				}, {
					src: "views/grunt/login.jade",
					dest: "login.html",
					ext: "html",
					cwd: ""
				} ]
			}
		},

		useminPrepare: {
			options: {
			   dest: 'public/dist'
			},
			html: ['login.html','index.html','layout.html']
		},

		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			app: {
				files: {
					'./public/min-safe/intermek.admin.js': [
						'./public/js/app.js',
						'./public/js/configs/fonts.js',
						'./public/js/configs/oauth.js',
						'./public/js/configs/theme.js',
						'./public/js/configs/rollbar.js',
						'./public/js/constants/mock-cookies.js',
						'./public/js/quotecollector/constants/mock-offert-head.js',
						'./public/js/quotecollector/constants/mock-offert-list.js',
						'./public/js/quotecollector/constants/mock-offerts.js',
						'./public/js/quotecollector/constants/mock-inbox-offerts.js',
						'./public/js/estimatecollector/constants/mock-estimate-data.js',
						'./public/js/worksheets/constants/mock-phase-head.js',
						'./public/js/worksheets/constants/mock-phase-list.js',
						'./public/js/worksheets/constants/mock-cycle-head.js',
						'./public/js/worksheets/constants/mock-cycle-list.js',
						'./public/js/directives/user-profile.js',
						'./public/js/directives/loader.js',
						'./public/js/quotecollector/directives/article-item.js',
						'./public/js/quotecollector/directives/email-details.js',
						'./public/js/worksheets/directives/phase-item.js',
						'./public/js/estimatecollector/directives/lot-item.js',
						'./public/js/controllers/user-profile.js',
						'./public/js/controllers/dialogs/delete-item.js',
						'./public/js/quotecollector/controllers/home.js',
						'./public/js/quotecollector/controllers/article-item.js',
						'./public/js/quotecollector/controllers/offerts.js',
						'./public/js/quotecollector/controllers/inbox-offerts.js',
						'./public/js/quotecollector/controllers/email-details.js',
						'./public/js/quotecollector/controllers/dialogs/load-offert.js',
						'./public/js/estimatecollector/controllers/estimate.js',
						'./public/js/estimatecollector/controllers/lot-item.js',
						'./public/js/worksheets/controllers/phase.js',
						'./public/js/worksheets/controllers/cycle.js',
						'./public/js/worksheets/controllers/cycles.js',
						'./public/js/worksheets/controllers/phase-item.js',
						'./public/js/worksheets/controllers/phases.js',
						'./public/js/factories/user.js',
						'./public/js/factories/api-interceptor.js',
						'./public/js/quotecollector/factories/sell-list.js',
						'./public/js/quotecollector/factories/stock-movement.js',
						'./public/js/quotecollector/factories/stock.js',
						'./public/js/quotecollector/factories/offert.js',
						'./public/js/quotecollector/factories/related-offerts.js',
						'./public/js/quotecollector/factories/inbox-offerts.js',
						'./public/js/worksheets/factories/phase.js',
						'./public/js/worksheets/factories/cycle.js',
						'./public/js/quotecollector/services/item-details.js',
						'./public/js/quotecollector/services/setting.js'
					],
					'./public/min-safe/intermek.guest.js': [
						'./public/js/app.js',
						'./public/js/directives/loader.js',
						'./public/js/configs/route-unauthenticated.js',
						'./public/js/configs/fonts.js',
						'./public/js/configs/oauth.js',
						'./public/js/configs/rollbar.js',
						'./public/js/constants/mock-cookies.js',
						'./public/js/controllers/login.js',
						'./public/js/factories/login.js'
					]
				}
			}
		},

		bumpup: ['package.json', 'bower.json']
	});

	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-bumpup');

	// grunt.registerTask('default', ['jade']);
	grunt.registerTask('default', ['jade','useminPrepare','ngAnnotate','concat','uglify','cssmin','bumpup']);
};