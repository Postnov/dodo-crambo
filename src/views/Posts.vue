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
import { swiper, swiperSlide } from 'vue-awesome-swiper'


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
            ],
            swiperOption: {
                // some swiper options/callbacks
                // 所有的参数同 swiper 官方 api 参数
                // ...
            }
        }
    },
    components: {
        'post-component': PostComponent,
        'swiper': swiper,
        'swiper-slide': swiperSlide
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    mounted() {
        // current swiper instance
        // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
        //   console.log('this is current swiper instance object', this.swiper)
        this.swiper.slideTo(3, 0, false)
    }
}

</script>

