<template>
  <div class="navbar navbar-expand-sm bg-dark navbar-dark">
    <nav class="navbar-nav navbar-default">
      <div class="navbar-header">
        <router-link to="/" exact class="navbar-brand"><strong>DBClient</strong></router-link>
      </div>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" tag="li" exact active-class="active">
              <a class="nav-link">Home</a>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/tablelist"  tag="li" active-class="active">
              <a class="nav-link">List of tables</a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { eventBus } from '../main'
export default {
  data () {
    return {
      collapseNavMenu: true
    }
  },
  methods: {
    toggleNavMenu: function () {
      this.collapseNavMenu = !this.collapseNavMenu
    },
    singOut: function () {
      eventBus.$emit('loggedOut', false)
      this.$router.push('/login')
    }
  }
}
</script>
