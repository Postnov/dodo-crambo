<template>

   <div>
        <masonry
            ref="masonry"
            class="post-list"
            :cols="{default: 3, 1000: 2, 400: 1}"
            :gutter="{default: '20px', 700: '15px'}"
        >
            <post-component v-if="postIndex < posts.length" v-for="(post, postIndex) in postsToShow" :key="posts[postIndex].id"  :post="posts[postIndex]" v-on:incrate="updateInc" ></post-component>
        </masonry>

        <!-- <button v-if="postsToShow < posts.length" @click="incPostViews(9)">Показать еще</button> -->


   </div>

</template>

<script>
import { firebase } from '../main'
import PostComponent from '@/views/Post-component'


export default {
    name: 'post-list',
    data() {
        return {
            posts: [],
            postsToShow: 9
        }
    },
    firestore() {
        return {
           posts: firebase.firestore().collection('data').doc('rhymes').collection('published').orderBy('createdAt')
        }
        console.log(this.posts.length)

    },
    methods: {
        handleScroll () {

            if (window.scrollY >= window.outerHeight) {
                this.incPostViews(5);
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

