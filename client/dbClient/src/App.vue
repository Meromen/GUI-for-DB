<template>
  <div id="app">
    <nav-bar></nav-bar>
    <transition
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutLeft"
      mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import navBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    navBar: navBar
  }
}
</script>
