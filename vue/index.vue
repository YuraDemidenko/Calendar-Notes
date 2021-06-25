<template>
    <div class="global-wrapper">
        <login-page v-if="!isLogedIn"></login-page>
        <transition name="slide">
            <router-view></router-view>
        </transition>
        <page-nav></page-nav>
    </div>
</template>

<style lang="less">
    
    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s;
        
    }
    .slide-enter-active {
        transition-delay: 5s;
         
    }

    .slide-leave{
        transform: none;
        opacity: 0;
       
    }
    .slide-leave-to{
        position: fixed;
        opacity: 0;
        transform: translateX(-30px);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
       
    }

    .slide-enter {
        opacity: 0;
        transform: translateX(30px);
    }
    .slide-enter-to {
        transform: none;
        opacity: 1;
    }
</style>


<script>

    module.exports = {
        data: function () {
            return{

            }
        },
        components: {
            'page-nav': require('./components/page-nav.vue'),
            'login-page': require('./components/login-page.vue'),

        },
        methods: {
           
        },


        computed: {

            isLogedIn: function() {
                return this.$store.getters['isLogedIn'];
            },

        },

        mounted: function() {
            if(localStorage.getItem('user')){
                this.$store.dispatch('login', JSON.parse(localStorage.getItem('user')));
            }


        },

        created: function () {
            this.$store.dispatch('getMovies');
            this.$store.dispatch('userStatus');

        }           

        
    }
</script>
