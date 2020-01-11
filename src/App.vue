<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>

        <v-list-item link>
          <v-list-item-action>
            
          </v-list-item-action>
          <v-list-item-content>
            <router-link to="/team">
            <v-list-item-title>Teams</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
          </v-list-item-action>
          <v-list-item-content>
            <router-link to="/players">
            <v-list-item-title>Players</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>


        <v-list-item link>
          <v-list-item-action>
          </v-list-item-action>
          <v-list-item-content>
            <router-link to="/coaches">
            <v-list-item-title>Coaches</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>


        

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Tim Teams</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >

        <router-view></router-view>
        
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    drawer: null,
  }),
  
};
</script>
