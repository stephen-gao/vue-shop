<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
        <button @click="userPage()">提交</button>
    </div>
  </div>
</template>
<script>
  import user from '@/api/user'
  import console from 'console'
  export default{
      data() {
          return {
              reqData: {
                  username: '',
                  password: ''
              }
          }
      },
      methods: {
          userPage() {
             user.userPage().then(response =>{
                 console.log(response)
             })
          }
      }
  }
</script>
