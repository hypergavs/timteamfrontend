import Vue from 'vue';
import Vuex from  'vuex';


Vue.use(Vuex);

import team from './modules/team';
import coaches from './modules/coaches';
import players from './modules/players';

export const store = new Vuex.Store({
    state:{
        error: {
            has: false,
            messages: []
        }
    },
    getters:{
        getErrors(state){
            return state.error;
        }
    },
    mutations:{
        setError(state, payload){
            state.error.has = true;
            state.error.messages = Object.values(payload);
        },
        clearErrors(state){
            state.error.has = false;
            state.error.messages = [];
        }
    },
    modules:{
        team,
        coaches,
        players
    }
});