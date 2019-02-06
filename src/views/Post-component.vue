<template>
    <div class="post">
        <p class="post__title">
            <span>{{ post.name }}</span>
            <span>А доставка - Додо пицца</span>
        </p>
        <footer class="post__footer">
            <div class="post__like-block" @click="$emit('incrate', post.rating, post.id)">
                <div class="post__rating">{{ post.rating }}</div>
                <button class="post__like-btn"></button>
            </div>
            <div class="post__author">
                <p v-if="post.author">
                    Автор:
                    <a v-if="post.link" target="_blank" :href="post.link">{{post.author}}</a>
                    <span v-else>{{post.author}}</span>
                </p>
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
