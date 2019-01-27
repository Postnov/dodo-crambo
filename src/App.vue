<template>
  <div id="app">
    <add-post></add-post>
    <posts></posts>

  </div>
</template>

<script>
import AddPost from '@/views/Add-post';
import Posts from '@/views/Posts'


export default {
  name: 'App',

  components: {
    'add-post': AddPost,
    'posts': Posts
  }
}
</script>

<style>

</style>
