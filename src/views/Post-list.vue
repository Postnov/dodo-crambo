<template>

   <div>
        <div class="filters">

            <div class="sorting">
                <button class="sorting__btn" :class="{'active': filterName == 'createdAt'}" @click="changeFilter('createdAt', 'desc')">новые</button>
                <button class="sorting__btn" :class="{'active': filterName == 'rating'}" @click="changeFilter('rating', 'desc')">популярные</button>
            </div>


            <div class="search-block">
                <input type="text" class="search" v-model="searchQuery" placeholder="Поиск...">
                <svg @click="searchQuery = ''" class="search-cross" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
            </div>

        </div>

        <masonry
            ref="masonry"
            class="post-list"
            :cols="{default: 3, 1000: 2, 700: 1}"
            :gutter="{default: '20px', 700: '15px'}"
        >
            <post-component v-for="post in orderedPosts" :key="post.id"  :post="post" v-on:incrate="updateInc" ></post-component>
        </masonry>

        <div v-if="!orderedPosts.length" class="post-not-found">Рифмы не найдены, попробуйте изменить поисковой запрос</div>

        <!-- <button v-if="postsToShow < posts.length" @click="incPostViews(9)">Показать еще</button> -->


   </div>

</template>

<script>
import { firebase, OrderBy } from '../main'
import PostComponent from '@/views/Post-component'

export default {
    name: 'post-list',
    data() {
        return {
            posts: [],
            searchQuery: '',
            postsToShow: 9,
            filterName: 'createdAt',
            filterType: 'desc'
        }
    },
    firestore() {
        return {
           posts: firebase.firestore().collection('data').doc('rhymes').collection('published').orderBy('createdAt', 'desc')
        }
    },
    methods: {
        changeFilter(name, type) {
            this.filterName = name;
            this.filterType = type;

            this.searchQuery = '';
        },
        handleScroll () {
            var masonryHeight = this.$refs.masonry.$el.clientHeight + 150,
                offetHeight = window.innerHeight + window.scrollY;

            if (offetHeight > masonryHeight) {
                this.incPostViews(9);
            }

        },
        incPostViews(count) {
            this.postsToShow += count;
        },
        updateInc(rating, id) {
            rating++;

            firebase.firestore().collection('data').doc('rhymes').collection('published').doc(id).set({
                rating: rating
            }, {merge: true})
        }
    },
    computed: {
        orderedPosts: function () {
            var self = this,
                filtered = OrderBy(this.posts, [this.filterName], [this.filterType]);

            return filtered.filter(function(post) {
                return post.name.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1
            }).slice(0, this.postsToShow);
        }
    },
    components: {
        'post-component': PostComponent,
    },

    created () {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    }

}

</script>


<style>

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

</style>
