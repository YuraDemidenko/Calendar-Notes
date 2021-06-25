const Vue = require('vue');
const Vuex = require('vuex');

Vue.use(Vuex);

function date(year, month, day) {
    let d = new Date(year, month, day);

    return d
}



function getDay(year, month, day) {
    let dayNumber = date(year, month, day).getDay();

    if (dayNumber == 0) dayNumber = 7;

    return dayNumber
}

function createCalendar(year, month, day) {

    let calendarMonth = [];
    
    let key = '';
    let pastMonth = ((date(year, month, 0).getDate()) - (getDay(year, month, day) - 1) + 1);
    

    for(let i = 0; i < (getDay(year, month, day) - 1); i++){
        calendarMonth.push({
            day:  pastMonth + i,
            month: month - 1,
            year: year,
            date: year + '-' + month + '-' + (pastMonth + i),
            noteKey: key.concat(year, (month - 1), (pastMonth + i)),
            notes: {},
            
        });
        
    }

    for(let i = 0; i < date(year, (month + 1), (day = 0)).getDate(); i++) {

        calendarMonth.push({
            day: i + 1,
            month: month,
            year: year,
            date: year + '-' + (month + 1) + '-' + (i + 1),
            notes: {},
            noteKey: key.concat(year, month, (i + 1)),
            currentDate: false
        });
    }

    for (let i = 0; i < (7 - getDay(year, (month + 1), (day = 0))); i++) {
        calendarMonth.push({
            day: i + 1,
            month: month + 2,
            year: year,
            date: year + '-' + (month + 2) + '-' + (i + 1),
            noteKey: key.concat(year, (month + 1), (i + 1)),
            notes: {},
            
        });               
    }

    return calendarMonth;

}


module.exports = new Vuex.Store({
    state: {
        date: new Date(),
        index: 0,
        year: 0,
        month: 0,
        query: '',
        newQuery: '',
        noteIndex: 0,
        selectedNote: {},
        noteItem: '',
        calendar: [],
    },

    getters: {
        getCalendar: function(state) {
            return state.calendar;
        },

    },

    mutations: {
       
        calendar: function(state, payload) {
            state.calendar = payload;
        },

        query: function(state, payload) {
            state.query = payload
        },  
 
    },

    actions: {
        
        setNote: function(context, payload) {
            let notes = {};
            let key = context.state.noteItem.noteKey;
            

            if(localStorage.getItem('notes')) {
                notes = JSON.parse(localStorage.getItem('notes'));
            } 
            
            if(!notes[key]) notes[key] = [];
                
            notes[key].push({
                text: payload,
                key: key,
                
            })

            localStorage.setItem('notes', JSON.stringify(notes));
            context.dispatch('getNotes');
            
        },

        nextMonth: function(context, payload) {
            
            let calendar = createCalendar(payload.year, payload.month, 1);

            context.commit('calendar', calendar);
            context.dispatch('getNotes');

        },

        today: function(context, payload) {
    
            let calendar = createCalendar(payload.currentYear,  payload.currentMonth, 1);

            context.commit('calendar', calendar);
            context.dispatch('getNotes');
        },
        
        previousMonth: function(context, payload) {

            let calendar = createCalendar(payload.year, payload.month, 1);

            context.commit('calendar', calendar);
            context.dispatch('getNotes');
            

        },

        setCalendar: function(context) {

            let year = context.state.year;
            let month = context.state.month;
            let calendar = createCalendar(year, month, 1);

            context.commit('calendar', calendar);
            context.dispatch('getNotes');
        },

        getMonth: function(context, payload) {
            context.state.month = payload;
        },

        getYear: function(context, payload) {
            context.state.year = payload;
        },

        getNoteKey: function(context, payload) {
            context.state.noteItem = payload;
            
        },

        getNote: function(context, payload) {
            context.state.selectedNote = payload;
            
        },

        changeNote: function(context, payload) {
            let notes = {};
            let newNote = context.state.selectedNote.note;
            let noteKey = context.state.selectedNote.key;
            
            if(localStorage.getItem('notes')) {
                notes = JSON.parse(localStorage.getItem('notes'));
            }
            
            notes[newNote.key][noteKey].text = payload;
            
            localStorage.setItem('notes', JSON.stringify(notes));

            context.dispatch('getNotes');
            
        },

        deleteNote: function(context) {

            let deleteNote = context.state.selectedNote;
            let notes = {};

            if(localStorage.getItem('notes')) {
                notes = JSON.parse(localStorage.getItem('notes'));
            }

            notes[deleteNote.note.key].splice(deleteNote.index, 1);

            if (notes[deleteNote.note.key].length < 1) delete notes[deleteNote.note.key];

            localStorage.setItem('notes', JSON.stringify(notes));

            context.dispatch('getNotes');
        },

        getNotes: function(context) {
            let notes = {};
            let calendarMonth = context.state.calendar; 

            if (!!localStorage.getItem('notes')) {
                notes = JSON.parse(localStorage.getItem('notes'));
            } else {
                notes = [];
            }
            
            for(let i = 0; i < calendarMonth.length; i++) {
                calendarMonth[i].notes = notes[calendarMonth[i].noteKey];

            }
        }
    }
})
