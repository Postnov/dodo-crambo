<template>
	<div id="app" class="page">
		<router-view/>
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
			view: 'posts',
			showAll: false
		}
	},
	components: {
		'add-post': AddPost,
		'posts': Posts,
		'post-list': PostList
	},
}
</script>

<style>
	.slide-fade-enter-active {
		transition: all .3s ease;
	}
	.slide-fade-enter, .slide-fade-leave-to
	/* .slide-fade-leave-active до версии 2.1.8 */ {
		transform: translateX(10px);
		opacity: 0;
	}
</style>
