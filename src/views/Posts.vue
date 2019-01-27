<template>
    <div>
        <div class="post-list" >
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="post in posts" :key="post.id">
                    <post-component :name="post.name"></post-component>
                </swiper-slide>
            </swiper>

        </div>
    </div>
</template>

<script>
import {swiper, swiperSlide} from '../main.js'


var PostComponent = {
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
        'post-component': PostComponent,
        'swiper': swiper,
        'swiper-slide': swiperSlide
    }
}

</script>

