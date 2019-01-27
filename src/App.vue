<template>
	<div id="app">
		<button @click="view = 'add-post'">Перйти на создание</button>
		<button @click="view = 'posts'">Перйти на все посты</button>


		<post-list></post-list>


		<transition name="slide-fade" mode="out-in">
			<keep-alive>
			<component :is="view"></component>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
import AddPost from '@/views/Add-post';
import Posts from '@/views/Posts'
import PostList from '@/views/Post-list'


export default {
  name: 'App',
  data() {
	return {
	  view: 'posts'
	}
  },
  components: {
	'add-post': AddPost,
	'posts': Posts,
	'post-list': PostList
  }
}
</script>

<style>
#app {
  overflow: hidden;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
