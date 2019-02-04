<template>
    <div>
        <div class="post-slider" >
            <swiper :options="swiperOption" ref="mySwiper" >
                <swiper-slide v-for="post in posts.slice(0, postsToShow)" :key="post.id" >
                    <post-component class="post-slide" :post="post" v-on:incrate="updateInc"></post-component>
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next" @click="incPostViews(1)"></div>
            </swiper>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { firebase } from '../main'
import PostComponent from '@/views/Post-component.vue';


export default {
    name: 'posts',
    data() {
        return {
            msg: 0,
            posts: [],
            postsToShow: 5,
            swiperOption: {
                allowTouchMove: true,
                simulateTouch: true,
                speed: 500,
                autoplay: {
                    delay: 5000,
                },
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
    methods: {
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


    },
    created() {
    }
}

</script>

