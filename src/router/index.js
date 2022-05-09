import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Page_Houses from '../views/Page_Houses.vue'

const routes = [
  { /* homepage */
    path: '/',
    name: 'Houses',
    component: Page_Houses,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/Page_About.vue')
  },
  {
    path: '/house/:id',
    name: 'House Details',
    component: () => import('../views/Page_Detail.vue')
  },
  {
    path: '/add',
    name: 'Create new listing',
    component: () => import('../views/Page_AddEdit.vue')
  },
  {
    path: '/listings',
    name: 'Listings',
    component: () => import('../views/Page_Listings.vue')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/Page_Favorites.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/Page_History.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  if (from) {
    if (from.name) {
      store.commit('setSearchTerm', '') // Clear searchTerm when visiting a different page
      if (from.name == "House Details" && from.params.id) {
        store.commit('addToHistoryIds', from.params.id) // add house to history if currently on 'House Details' page
      } else {
        store.commit('setPreviousPage', from) // Don't set previous page when visiting house detail to avoid infinite loops
      }
    }
  }
  next() // go to the next page
})

export default router
