export const routes = [
    { name: 'team',  path: '/team', component:  require('./components/teams/Index.vue').default},
    { name: 'players',  path: '/players', component:  require('./components/players/Index.vue').default},
    { name: 'coaches',  path: '/coaches', component:  require('./components/coaches/Index.vue').default}
];