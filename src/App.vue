<template>
	<div id="app" class="page">
		<header class="page__header header">
			<div class="header__left">
				<p class="logo-text" @click="view = 'posts'">Додо Рифма</p>
			</div>
			<div class="header__right">
					<button @click="view = 'post-list'">Все рифмы </button>
					<button @click="view = 'add-post'">Создать свою</button>
			</div>
		</header>



		<div class="app-content">
			<transition name="slide-fade" mode="out-in">
				<keep-alive>
					<component :is="view"></component>
				</keep-alive>
			</transition>
		</div>
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
