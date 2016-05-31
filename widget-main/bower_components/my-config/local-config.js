requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '.',
    paths: {
        base: 'bower_components/base/dist/scripts',
        mock: 'bower_components/mock/dist/scripts',
        core: 'bower_components/core/dist/scripts',
        lodash: 'bower_components/lodash/lodash.min',
        moment: 'bower_components/moment/min/moment-with-locales.min',
        'angular-dynamic-locale': 'bower_components/angular-dynamic-locale/dist/tmhDynamicLocale',
        'angular-sanitize': 'bower_components/angular-sanitize/angular-sanitize.min',
        'angular-resource': 'bower_components/angular-resource/angular-resource.min',
        'angular-translate': 'bower_components/angular-translate/angular-translate.min'
    },
    packages: [
        'base',
        'mock',
        'core'
    ]
});