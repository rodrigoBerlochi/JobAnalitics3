module.exports = function(grunt) {
 
    // Project configuration.
    grunt.initConfig({
 
        //Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),
 
        // Metadata.
        meta: {
            basePath: '/',
            srcPath: 'templates_src/',
            deployPath: 'templates_target/'
        },
 
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> ',
 
        // Task configuration.
        /*concat: {
            options: {
                stripBanners: true
            },
            dist: {
                src: ['<%= meta.srcPath %>scripts/fileone.js', '<%= meta.srcPath %>scripts/filetwo.js'],
                dest: '<%= meta.deployPath %>scripts/app.js'
            }
        },*/
        jst: {
            compile: {
                options: {
                    //namespace: "anotherNameThanJST",      //Default: 'JST'
                    prettify: false,                        //Default: false|true
                    amdWrapper: false,                      //Default: false|true
                    templateSettings: {
                    },
                    processName: function(filename) {
                        //Shortens the file path for the template.
                        return filename.slice(filename.indexOf("template"), filename.length);
                    }
                },
                files: {
                    "<%= meta.deployPath %>templates.js": ["<%= meta.srcPath %>*.tpl"]
                }
            }
        }
    });
 
    // These plugins provide necessary tasks.
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jst');
 
    // Default task
    grunt.registerTask('default', ['jst']);
 
};