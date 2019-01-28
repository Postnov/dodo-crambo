<template>
    <div class="post-list">
        <post-component v-for="post in posts" :post="post" :key="post.id"  v-on:incrate="updateInc"></post-component>
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
        }
    },
    firestore() {
        return {
            posts: firebase.firestore().collection('data').doc('rhymes').collection('published').orderBy('createdAt')
        }
    },
    methods: {
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

}

</script>

