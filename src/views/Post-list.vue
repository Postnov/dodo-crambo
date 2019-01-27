<template>
    <div class="post-list" >
        <post-component v-for="post in posts" :post="post" :key="post.id"></post-component>
    </div>
</template>

<script>
import { firebase } from '../main'


var PostComponent = {
    name: 'post-component',
    props: ['post'],
    template: `
        <div class="post-item">
            <p>{{ post.name }}</p>
            <p>А доставка - Додо пицца</p>
            <footer>
                <a target="_blank" :href="post.link">{{post.author}}</a>
                <button>Лайк</button>
                <button>{{ post.rating }}<button>
            </footer>
        </div>
    `,

}

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
    components: {
        'post-component': PostComponent,
    },

}

</script>

