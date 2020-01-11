import Axios from 'axios';

export default{
    namespaced: true,
    state:{
        coaches: []
    },
    getters:{
        initializeCoaches(state){
            return state.coaches;
        }
    },
    mutations:{
        initializeCoaches(state, payload){
            state.coaches = payload
        },
        pushCoach(state, payload){
            state.coaches.push(payload);
        },
        updateCurrentCoach(state, payload){
            state.coaches[payload.index].coach_name = payload.coach_name;
            state.coaches[payload.index].type = payload.type;
            state.coaches[payload.index].team = payload.team;
        }
        
    },
    actions:{

        initializeCoaches(context){
            Axios.get('http://127.0.0.1:8000/api/coaches')
                .then((res)=>{
                    context.commit('initializeCoaches', res.data)
                })
                .catch(()=>{

                });
        },


        addCoach(context, payload){
            Axios.post('http://127.0.0.1:8000/api/store_coach', payload)
                .then((res)=>{
                    context.commit('pushCoach', res.data.coach);
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
        updateCoach(context, payload){
            Axios.post('http://127.0.0.1:8000/api/update_coach', payload)
                .then(()=>{
                    context.commit('updateCurrentCoach', payload);
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
        deleteCoach(context, payload){
            Axios.post('http://127.0.0.1:8000/api/delete_coach', {id: payload});
        }
    }

}



    

