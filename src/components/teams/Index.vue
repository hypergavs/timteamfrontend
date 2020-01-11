<template>

  <div class="container">

  <v-data-table
    :headers="headers"
    :items="teams"
    sort-by="team_name"
    class="elevation-1"
  >



  <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Tim Teams</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Team</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.team_name" label="Team Name"></v-text-field>
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
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Team Name',
          align: 'left',
          value: 'team_name',
        },
        { text: 'Actions', value: 'action', sortable: false },
      ],


      
      editedIndex: -1,
      editedItem: {
        id: '',
        team_name: '',
        editedIndex: '',
      },
      defaultItem: {
        team_name: ''
      },
    }),

 

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Team' : 'Edit Team'
      },
      
      ...mapGetters({
        teams: 'team/initializeTeams',
        errors: 'getErrors'
      }),

      
    },
    created(){

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
        addTeam: 'team/addTeam',
        updateTeam: 'team/updateTeam',
        deleteTeam: 'team/deleteTeam'
      }),

      editItem (item) {
        this.editedIndex = this.teams.indexOf(item);
        var to_assign = {team_name: item.team_name, id: item.id, index: this.editedIndex};
        this.editedItem = Object.assign({}, to_assign);
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.teams.indexOf(item);
        if(confirm('Are you sure you want to delete this item?')){
          this.deleteTeam(item.id);
          this.teams.splice(index, 1);
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
          this.updateTeam(this.editedItem)
          .then(()=>{
            this.editedIndex = -1;
            this.dialog = false;
          })
        }else{
          this.addTeam(this.editedItem);
          this.dialog = false;
        }
          
      },
    },
  }
</script>