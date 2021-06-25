<template>
    <div class="modal-container" :class="{'active': isActive}">
        <div class="overlay" @click="closeModal"></div>
        <div class="modal">
            <textarea v-model="query"></textarea>
            <div class="modal-btn-group">
                <div class="add-note-btn" v-if="add == false" @click="addNote">Add Note</div> 

                <div class="change-note-wrapper" v-else>
                    <div class="delete-note-btn" @click="deleteNote">Delete Note</div>  
                    <div class="save-note-btn" @click="changeNote">Change Note</div>  
                </div>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    data: function () {
        return{
            isActive: false,
            query: '',
        } 
    },

    props: ['add'],

    methods: {
        openModal: function() {
            this.isActive = true;
            this.query = '';
        },

        closeModal: function() {
            this.isActive = false;
        },

        addNote: function() {
            this.$store.dispatch('setNote', this.query);
            this.closeModal();
        },

        changeNote: function() {
            this.closeModal();
            this.$store.dispatch('changeNote', this.query);
        },

        deleteNote: function() {
            this.closeModal();
            this.$store.dispatch('deleteNote');
        },


    },

}
</script>
