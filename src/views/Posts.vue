<template>
    <div>
        <div class="post-list" >
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="post in posts" :key="post.id">
                    <post-component :post="post"></post-component>
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { firebase } from '../main'


var PostComponent = {
    name: 'post-component',
    props: ['post'],
    template: `
        <div class="post">
            <p>{{ post.name }}</p>
            <p>А доставка - Додо пицца</p>
            <footer>
                <a target="_blank" :href="post.link">{{post.author}}</a>
            </footer>
        </div>
    `,

}

export default {
    name: 'posts',
    data() {
        return {
            posts: [],
            swiperOption: {
                allowTouchMove: true,
                simulateTouch: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            }
        }
    },
    firestore() {
        return {
            posts: firebase.firestore().collection('data').doc('rhymes').collection('published').orderBy('createdAt')
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
        // this.swiper.slideTo(3, 0, false)
    }
}

</script>

