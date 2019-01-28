<template>
    <div class="post">
        <p class="post__title">
            <span>{{ post.name }}</span>
            <span>А доставка - Додо пицца</span>
        </p>
        <footer class="post__footer">
            <p v-if="post.author">Автор: <a target="_blank" :href="post.link">{{post.author}}</a></p>
            <div class="post__like-block" @click="$emit('incrate', post.rating, post.id)">
                <div class="post__rating">{{ post.rating }}</div>
                <button class="post__like-btn" >
                    <svg class="post__like-icon" g enable-background="new 0 0 53.867 53.867" version="1.1" viewBox="0 0 53.867 53.867" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="26.934 1.318 35.256 18.182 53.867 20.887 40.4 34.013 43.579 52.549 26.934 43.798 10.288 52.549 13.467 34.013 0 20.887 18.611 18.182" fill="#EFCE4A"/>
                    </svg>

                </button>
            </div>
        </footer>
    </div>
</template>


<script>
    import { firebase } from '../main'

    export default {
        name: 'post-component',
        props: ['post'],
        data() {
            return {
                rating: this.post.rating,
                id: this.post.id
            }
        },
        methods: {
            incRate() {

            }
        },
        mounted() {
        }
    }
</script>
