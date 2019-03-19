module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    pkg.name = pkg.name.split("/").filter((v,i,a) =>{ if(i == a.length-1) return v})[0];
    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        uglify: {
            options: {
                banner: "/* <%= pkg.name %><%= pkg.version %> <%= grunt.template.today('yyyy-mm-dd') %> */\n",
                sourceMap: true,
                sourceMapName: "dist/<%= pkg.name %>.min.js.map"
            },
            js: {
                src: "dist/<%= pkg.name %>.js",
                dest: "dist/<%= pkg.name %>.min.js"
            }
        },
        concat: {
            js: {
                options: {
                    banner: "\"use strict\";\n" +
                        "(function(w,isw){",
                    footer : "w.testSuite = testSuite;"+
                '})(typeof window !== "undefined" ? window : module.exports,typeof window !== "undefined");'
                },
                files: {
                    "dist/<%= pkg.name %>.js": [
                        "src/helpers/console.js",
                        "src/helpers/merge.js",
                        "src/defaults.js",
                        "src/expect.js",
                        "src/performanceMeasurement.js",
                        "src/windowErrorMonitoring.js",
                        "src/index.js"
                    ]
                }
            },
            css:{
                files: {
                    "dist/<%= pkg.name %>.css": ["src/css/**/*.css"]
                }
            }
        },
        cssmin: {
            options: {
                sourceMap: true,
                aggressiveMerging : false,
                advanced : false,
                roundingPrecision : -1,
                shorthandCompacting: false,
                keepSpecialComments: '*'
            },
            target: {
                files: {
                    "dist/<%= pkg.name %>.min.css" : ["dist/<%= pkg.name %>.css"]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ["concat","uglify","cssmin"]);

};