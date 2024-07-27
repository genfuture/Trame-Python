import Vue from 'vue';
import App from './App.vue';
import '@kitware/vtk.js';

// Additional imports and setup...

new Vue({
    render: (h) => h(App),
}).$mount('#app');
