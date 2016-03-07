'use strict';
//包装函数
module.exports = function(grunt){
	// 加载任务
    require('jit-grunt')(grunt);
    // 计算任务所需时间
    require('time-grunt')(grunt);
	//路径配置
	var config = {
		dev:'dev',
		dist:'dist'
	}
	//任务配置，所有插件的配置信息
	grunt.initConfig({

		//获取package.json信息
		config: config,
		pkg:grunt.file.readJSON('package.json'),
		 // uglify插件的配置信息
	   //  uglify: {
	   
	   //    options:{
				// stripBanners:true,
				// banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %> */'

		  // },
	   //    build: {
	   //      // src: '<%= config.dev %>/js/',
	   //      // dest:'<%= config.dev %>/minjs/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
	   //    	files:{
    //            '<%= config.dev %>/minjs/input.js': ['<%= config.dev %>/js/input.js'],
    //         },
	   //    }
	   //  },
	    compass:{
	    	dist:{
	    		options:{
	    			//importPath:'<%= config.dev %>/sass/load',
	    			sassDir:'<%= config.dev %>/sass',
	    			cssDir:'<%= config.dev %>/css',
	    			imagesDir:'<%= config.dev %>/images',
	    			relativeAssets: true,
                    outputStyle: 'expanded',
                    sourcemap: false,
                    noLineComments: true,
	    		}
	    	}
	    },

	    postcss:{
	    	options:{
	    		map:true,
	    		processors:[
				    // Add vendor prefixed styles
				    require('autoprefixer')({
				        browsers: ['> 0.5%', 'last 2 versions', 'Firefox < 20']
				    })
	    		]
	    	},

	    	dist:{
	    		files: [{
                    expand: true,
                    cwd: '<%= config.dev %>/css/',
                    src: '{,*/}*.css',
                    dest: '<%= config.dev %>/css/'
                }]
	    	}

	    },

	    // jade
        jade: {
            compile: {
                options: {
                    pretty: true,
                    // data: function(dest, src) {
                    //     return require('./app/_source/jade/data/data.json');
                    // }
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dev %>/jade/',
                    src: ['**/*.jade', '!components/*', '!layout/*', '!data/*'],
                    dest: '<%= config.dev %>/',
                    ext: '.html'
                }]
            }
        },

	    /*clean:{
	    	build:{
	    		src:''
	    	}
	    }*/
	    /*jshint:{
	    	build:['Gruntfile.js','src/*.js'],
	    	options:{
	    		curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
				jQuery: true
				},
	    	}
	    },*/
	    watch: {
			// scripts: {
			// 	files: ['**/*.js'],
			// 	tasks: ['jshint'],
			// 	options: {
			// 	spawn: false,
			// 	},
			// },
			compass:{
				files:'<%= config.dev %>/sass/**/*.scss',
				tasks:['compass','newer:postcss']
			},
			jade:{
				files: '<%= config.dev %>/**/*.jade',
                tasks: ['newer:jade']
			},
			uglify:{
				files:'<%= config.dev %>/js/**/*.js',
				tasks:['uglify']
			}
		},
	});
/*  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');*/
grunt.registerTask('server', '开启开发模式', function(target) {
        grunt.log.warn('开启开发模式');
        grunt.task.run([
            //'clean:server',
            'compass',
            'postcss',
            // 'cssmin',
            // 'imagemin',
            'jade',
            // 'copy',
            // 'uglify',
            // 'browserSync:livereload',
            'watch'
        ]);
    });
  // 告诉grunt当我们在终端中输入grunt时需要做些什么
/*  grunt.registerTask('default', ['uglify','jshint','watch']);*/
	//grunt.registerTask('default',[]);
};