<template>
    <div class="post">
        <p>{{ post.name }}</p>
        <p>А доставка - Додо пицца</p>
        <footer>
            <a target="_blank" :href="post.link">{{post.author}}</a>
            button
        </footer>
    </div>
</template>


<script>
    export default {
        name: 'post-component',
        props: ['post'],
    }
</script>
