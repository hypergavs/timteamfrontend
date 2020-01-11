import Axios from 'axios';

export default{
    namespaced: true,
    state:{
        teams: [],
        
    },
    getters:{
        initializeTeams(state){
            return state.teams;
        }
    },
    mutations:{
        initializeTeams(state, payload){
            state.teams = payload
        },
        pushTeam(state, payload){
            state.teams.push(payload);
        },
        updateCurrentTeam(state, payload){
            state.teams[payload.index].team_name = payload.team_name;
            state.teams[payload.index].coach = payload.coach;
        }
        
    },
    actions:{

        initializeTeams(context){
            Axios.get('http://127.0.0.1:8000/api/teams')
                .then((res)=>{
                    context.commit('initializeTeams', res.data)
                })
                .catch(()=>{
                    
                });
        },


        addTeam(context, payload){
            Axios.post('http://127.0.0.1:8000/api/store_team', payload)
                .then((res)=>{
                    context.commit('pushTeam', res.data);
                })
                .catch((err)=>{
                    let a = Object.values(err.response.data.errors)[0];
                    window.swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: a[0]
                    });
                });
            
        },
        updateTeam(context, payload){
            Axios.post('http://127.0.0.1:8000/api/update_team', payload)
                .then(()=>{
                    context.commit('updateCurrentTeam', payload);
                })
                .catch((err)=>{
                    let a = Object.values(err.response.data.errors)[0];
                    window.swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: a[0]
                    });
                });
            
            
        },
        deleteTeam(context, payload){
            Axios.post('http://127.0.0.1:8000/api/delete_team', {id: payload});
        }
    }

}



    

