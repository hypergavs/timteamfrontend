<template>


  <div class="container">

  <v-data-table
    :headers="headers"
    :items="players"
    sort-by="player_name"
    class="elevation-1"
  >



  <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Tim Players</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Player</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.player_name" label="Player Name"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="12" sm="6" md="12">
                     <v-select
                      :items="teams"
                      label="Team"
                      item-text="team_name"
                      item-value="id"
                      v-model="editedItem.team"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>


    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>


   
    
  
  </v-data-table>


  

  


  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Player Name',
          align: 'left',
          value: 'player_name',

        },
        { text: 'Actions', value: 'action', sortable: false },
      ],


      
      editedIndex: -1,
      editedItem: {
        id: '',
        player_name: '',
        team: '',
        editedIndex: '',
      },
      defaultItem: {
        player_name: '',
        team: ''
      },
    }),

 

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Player' : 'Edit Player'
      },

      ...mapGetters({
        players: 'players/initializePlayers',
        teams: 'team/initializeTeams'
      }),

     
    },

    created(){
      
      this.getPlayers();
      this.getTeams();

      
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },

   

    methods: {

      ...mapActions({
        getTeams: 'team/initializeTeams',
        getPlayers: 'players/initializePlayers',
        addPlayer: 'players/addPlayer',
        updatePlayer: 'players/updatePlayer',
        deletePlayer: 'players/deletePlayer'
      }),

      editItem (item) {
        this.editedIndex = this.players.indexOf(item);
        var to_assign = {player_name: item.player_name, team: item.team_id, id: item.id, index: this.editedIndex};
        this.editedItem = Object.assign({}, to_assign);
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.players.indexOf(item);
        if(confirm('Are you sure you want to delete this item?')){
          this.deletePlayer(item.id);
          this.players.splice(index, 1);
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if(this.editedIndex!==-1){
          this.updatePlayer(this.editedItem)
          .then(()=>{
            this.editedIndex = -1;
            this.dialog = false;
          })
        }else{
          this.addPlayer(this.editedItem)
            .then(()=>{
              this.dialog = false;
            })
        }
          
      },
    },
  }
</script>