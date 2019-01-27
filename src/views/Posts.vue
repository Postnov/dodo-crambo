<template>
    <div>
        <div class="post-list" >
            <post-component
                v-for="post in posts"
                :key="post.id"
                :name="post.name"
            ></post-component>
        </div>
    </div>
</template>

<script>
var postComponent = {
    name: 'post-component',
    props: ['name'],
    template: `
        <div class="post">
            <p>{{ name }}</p>
            <p>А доставка - Додо пицца</p>
        </div>
    `,

}

export default {
    name: 'posts',
    data() {
        return {
            posts: [
                { id: 1, name: 'Ой, снежинка на реснице' },
                { id: 2, name: 'Любишь с шуткой в дом ввалится?' },
                { id: 3, name: 'Больше знаешь, крепче спится' },
            ]
        }
    },
    components: {
        'post-component': postComponent
    }
}

</script>

