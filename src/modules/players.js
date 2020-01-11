import Axios from 'axios';

export default{
    namespaced: true,
    state:{
        players: []
    },
    getters:{
        initializePlayers(state){
            return state.players;
        }
    },
    mutations:{
        initializePlayers(state, payload){
            state.players = payload
        },
        pushPlayer(state, payload){
            state.players.push(payload);
        },
        updateCurrentPlayer(state, payload){
            state.players[payload.index].player_name = payload.player_name;
            state.players[payload.index].team = payload.team;
        }
        
    },
    actions:{

        initializePlayers(context){
            Axios.get('http://127.0.0.1:8000/api/players')
                .then((res)=>{
                    context.commit('initializePlayers', res.data)
                })
                .catch(()=>{

                });
        },


        addPlayer(context, payload){
            Axios.post('http://127.0.0.1:8000/api/store_player', payload)
                .then((res)=>{
                    context.commit('pushPlayer', res.data.player);
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
        updatePlayer(context, payload){
            Axios.post('http://127.0.0.1:8000/api/update_player', payload)
                .then(()=>{
                    context.commit('updateCurrentPlayer', payload);
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
        deletePlayer(context, payload){
            Axios.post('http://127.0.0.1:8000/api/delete_player', {id: payload});
        }
    }

}



    

