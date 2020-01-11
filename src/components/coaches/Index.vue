<template>

  <div class="container">

  <v-data-table
    :headers="headers"
    :items="coaches"
    sort-by="coach_name"
    class="elevation-1"
  >



  <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Tim Coaches</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Coach</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.coach_name" label="Coach Name"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                   <v-col cols="12" sm="6" md="12">
                     <v-select
                      :items="timTeams"
                      label="Team"
                      item-text="team_name"
                      item-value="id"
                      v-model="editedItem.team"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-select
                        :items="types"
                        label="Types"
                        v-model="editedItem.type"
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

  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Coach Name',
          align: 'left',
          value: 'coach_name',

        },
        {
          text: 'Position',
          align: 'left',
          value: 'type',

        },
        { text: 'Actions', value: 'action', sortable: false },
      ],


      types:['Head','Strength'],
      editedIndex: -1,
      editedItem: {
        id: '',
        coach_name: '',
        team: '',
        type: '',
        editedIndex: '',
      },
      defaultItem: {
        coach_name: '',
        team: '',
        type: ''
      },
    }),

 

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Coach' : 'Edit Coach'
      },


      ...mapGetters({
        coaches: 'coaches/initializeCoaches',
        teams: 'team/initializeTeams',
      }),
      timTeams(){
         return this.$store.state.team.teams;
      },
      timCoaches(){
         return this.$store.state.coaches.coaches;
      }
    },

    created(){
      this.getCoaches();
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
        getCoaches: 'coaches/initializeCoaches',
        addCoach: 'coaches/addCoach',
        updateCoach: 'coaches/updateCoach',
        deleteCoach: 'coaches/deleteCoach'
      }),


      editItem (item) {
        this.editedIndex = this.timCoaches.indexOf(item);
        var to_assign = {coach_name: item.coach_name, type: item.type, team: item.team_id, id: item.id, index: this.editedIndex};
        this.editedItem = Object.assign({}, to_assign);
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.timCoaches.indexOf(item);
        if(confirm('Are you sure you want to delete this item?')){
          this.deleteCoach(item.id);
          this.timCoaches.splice(index, 1);
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
          this.updateCoach(this.editedItem)
          .then(()=>{
            this.editedIndex = -1;
            this.dialog = false;
          })
        }else{
          this.addCoach(this.editedItem);
          this.dialog = false;
        }
          
      },
    },
  }
</script>