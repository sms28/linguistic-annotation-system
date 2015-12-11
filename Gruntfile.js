// Обязательная обёртка
module.exports = function(grunt) {

    // Конфигурация
    grunt.initConfig({
        // Настройка плагина less
        less: {
            development: {
                options: {
                    compress: false
                },
                files: [{
                    expand: true,
                    cwd: 'src/main/webapp/resources/styles/',
                    src: ['*.less'],
                    dest: 'src/main/webapp/resources/styles/',
                    ext: '.css'
                }]
            }
        },

        // Настройка плагина watch
        watch: {
            styles: {
                files: ['src/main/webapp/resources/styles/**/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Загрузка плагинов, установленных с помощью npm install
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Задача по умолчанию
    grunt.registerTask('default', ['watch']);
};