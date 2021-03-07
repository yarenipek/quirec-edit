<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow mb-5">
    <a class="navbar-brand" href="#">QuiRec</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
          <router-link class="nav-item" tag="li" to="/">
            <a class="nav-link" href="#">Anasayfa</a>
          </router-link>

          <router-link class="nav-item" tag="li" to="/about">
            <a class="nav-link" href="#">Hakkımda</a>
          </router-link>
        
        
      </ul>
      <ul class="navbar-nav my-2 my-lg-0" :class="logoutClass">
        <li class="nav-item">
          <a @click.prevent="logout" class="nav-link" href="#">Çıkış Yap</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch("logout")
        this.$router.replace("/")
     
      }
    },
    computed: {
      logoutClass() { //autha göre gözükür ya da gözükmez
        return {
          'd-none': !this.$store.getters.isAuthenticated
        }
      }
    }
  }
</script>
<style scoped>
 
</style>
