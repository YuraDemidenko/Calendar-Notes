<template>
    <div class="global-container">

        <calendar></calendar>
    
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return{
                
            }
        },

        components: {
            'calendar': require('./calendar/calendar.vue'),
        },

        

    }
</script>