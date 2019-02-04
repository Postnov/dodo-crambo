<template>
    <div>
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
import AddPost from './Add-post';
import Posts from './Posts'
import PostList from './Post-list'


export default {
	name: 'Home',
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
