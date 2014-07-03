module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            files: ['**/*.js'],
            tasks: ['jshint']
        },

        nugetpack: {
            dist: {
                src: 'nuget/lawgr.nuspec',
                dest: 'nuget/',
                options: {
                    version: '<%= pkg.version %>'
                }
            }
        },

        nugetpush: {
            dist: {
                src: 'nuget/*.nupkg'
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js']
        },

        clean: ['nuget/*.nupkg'],

	// pushes to npm
        release: {
            options: {
            	// we'll use grunt-bump to increment the version as it
            	// supports reloading the pkg config var which we need
            	// as it is referenced when the nuget tasks are run
                bump: false,
                add: false,
                commit: false,
                tag: false,
                push: false,
                pushTags: false
            }
        },

        bump: {
            options: {
            	// reload pkg config var after bump
                updateConfigs: ['pkg'],
                commit: false,
                createTag: false,
                push: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-nuget');
    grunt.loadNpmTasks('grunt-release');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['test']);
    grunt.registerTask('publish', ['publish:patch']);
    grunt.registerTask('publish:patch', ['clean', 'bump:patch', 'release', 'nugetpack', 'nugetpush']);
    grunt.registerTask('publish:minor', ['clean', 'bump:minor', 'release', 'nugetpack', 'nugetpush']);
    grunt.registerTask('publish:major', ['clean', 'bump:major', 'release', 'nugetpack', 'nugetpush']);
};
