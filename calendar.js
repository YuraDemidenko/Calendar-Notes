let Vue = require('vue');

new Vue({
    el: '#calendar',
    store: require('./calendar.store'),
    
    render: function (init) {
        return init(require('../../vue/index.calendar.vue'));
    }
});