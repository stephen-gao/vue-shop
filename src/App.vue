<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<p @click="$router.push('/')">Home</p>-->
      <!--<p @click="$router.push('/about')">About</p>-->
      <!--<p @click="$router.push('/login')">login</p>-->
    <!--</div>-->
    <transition name="fade"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>

</script>

<style rel="stylesheet/scss" lang="css">
@import "styles/index.scss";
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
}
</style>
