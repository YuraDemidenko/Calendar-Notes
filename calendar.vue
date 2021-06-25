<template>
    <div class="calendar-wrapper">
       
        <div class="header">
            <div class="header-box">
                <div class="calendar-title">
                    <span class="month">{{monthNames[month] + '    '}}</span>
                    <span class="year">{{year}}</span>
                </div>

                <div class="nav-bar">
                    <div class="today-btn" @click="today">Today</div>

                    <div class="arrow-wrapper">
                        <div class="past-month" @click="previousMonth"></div>

                        <div class="next-month" @click="nextMonth"></div>
                    </div>
                    
                </div>
            </div>

            <div class="days-of-week">
                <ul>
                    <li>Monday</li>
                    <li>Tuesday</li>
                    <li>Wensday</li>
                    <li>Thusday</li>
                    <li>Friday</li>
                    <li>Saturday</li>
                    <li>Sunday</li>
                </ul>
            </div>
        </div>

        <div class="calendar-body">

            <div class="day" v-for="(item, index) in calendar" :key="index"  :class="{'today': item.currentDate}">
                <div class="add-btn" @click="activeModal(item, index)">+</div>

                <div class="date">{{item.day}}</div>

                <div class="note-wrapper">
                    <div class="note" v-for="(note, index) in item.notes" :key="index" @click="getNote(index, note)">
                        <div class="text-wrapper">
                            <p>{{note.text}}</p>
                        </div>  
                    </div>
                </div>
                
            </div>
        </div>

       <modal ref="modal" :add="changeNote" :noteText="text"></modal>

    </div>
</template>



<script>

    module.exports = {
        data: function () {
            return{ 
                date: new Date(),
                monthNames: ['January', 'February', 'March', 'April', 'May', 
                    'June', 'July', 'August', 'September', 'October', 'November', 'December'
                ],
                month: 0,
                year: 0,
                day: 0,
                text: '',
                dayNote: '',
                changeNote: false,
                currentDay: '',
                timestamp: '',
                
               
            }
        },

        

        methods: { 
            previousMonth: function() {
                this.month--;
                if (this.month == -1)  {
                    this.month = 11;
                    this.year--;
                }

                this.$store.dispatch({
                    type: 'previousMonth',
                    month: this.month,
                    year: this.year,
                });

                this.marckToday();
            
            },

            nextMonth: function() {
                this.month++;
                if (this.month == 12) {
                    this.month = 0;
                    this.year++;
                } 
                
                this.$store.dispatch({
                    type: 'nextMonth',
                    month: this.month,
                    year: this.year,
                });

                this.marckToday();

            },

            getNow: function(now) {
                let today = now;

                return {
                    date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
                    month: today.getMonth(),
                    day: today.getDate(),
                    today: today,
                    year: today.getFullYear(),
                    time: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
                    dayNumber: today.getDay()
                }
                
            },

            marckToday: function() {
                currentDay = this.getNow(this.date).date;
               
                for (let i = 0; i < this.calendar.length; i++) {
                    if (this.calendar[i].date == currentDay) {
                        this.calendar[i].currentDate = true;
                    }
                }
            },

            today: function() {
                this.month = this.getNow(this.date).month;
                this.year = this.getNow(this.date).year;
                               
                this.$store.dispatch({
                    type: 'today',
                    currentMonth: this.month,
                    currentYear: this.year
                })

                this.marckToday();
            },

            activeModal: function(item, index) {
                this.changeNote = false;
                this.$refs.modal.openModal();
                
                this.$store.dispatch('getNoteKey', item);
            },

            getNote: function(index, note) {
                this.changeNote = true;
                this.text = note.text;
                this.$refs.modal.openModal();

                this.$store.dispatch({
                    type: 'getNote',
                    key: index,
                    note: note,
                    text: note.text
                });
                
            },

        },


        computed: {
            calendar: function() {
                return this.$store.getters['getCalendar'];
            },

           
        },

        
        components: {
            'modal': require('./modal.vue')
        },
        
        mounted: function () {
            this.month = this.getNow(this.date).month;
            this.year = this.getNow(this.date).year;
            this.day = this.getNow(this.date).day;
            
            this.$store.dispatch('getMonth', this.month);
            this.$store.dispatch('getYear', this.year);
            
            this.$store.dispatch('setCalendar');

            this.marckToday();
           
        },

    }

    
</script>