<template>
    <div>
        <!-- fly pizza! -->
        <div :style="item.styles" class="fly-icon falling-animate" v-for="item in fallignIcons" :key="item.id"></div>

<!--
            @mouseenter="$refs.mySwiper.swiper.autoplay.stop()"
            @mouseleave="$refs.mySwiper.swiper.autoplay.start()"
 -->

        <div
            class="post-slider"
            >
            <swiper :options="swiperOption" ref="mySwiper" >
                <swiper-slide v-for="post in posts.slice(0, postsToShow)" :key="post.id" >
                    <post-component class="post-slide" :post="post" :type="'slide'" v-on:incrate="updateInc"></post-component>
                </swiper-slide>

            </swiper>

                <svg class="swiper-arrow-prev"  enable-background="new 0 0 31.494 31.494" version="1.1" viewBox="0 0 31.494 31.494" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                <path d="m10.273 5.009c0.444-0.444 1.143-0.444 1.587 0 0.429 0.429 0.429 1.143 0 1.571l-8.047 8.047h26.554c0.619 0 1.127 0.492 1.127 1.111s-0.508 1.127-1.127 1.127h-26.554l8.047 8.032c0.429 0.444 0.429 1.159 0 1.587-0.444 0.444-1.143 0.444-1.587 0l-9.952-9.952c-0.429-0.429-0.429-1.143 0-1.571l9.952-9.952z" fill="#fff"/>
                </svg>

                <svg class="swiper-arrow-next" @click="incPostViews(1)" enable-background="new 0 0 31.49 31.49" version="1.1" viewBox="0 0 31.49 31.49" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                    <path d="m21.205 5.007c-0.429-0.444-1.143-0.444-1.587 0-0.429 0.429-0.429 1.143 0 1.571l8.047 8.047h-26.554c-0.619 1e-3 -1.111 0.493-1.111 1.112s0.492 1.127 1.111 1.127h26.554l-8.047 8.032c-0.429 0.444-0.429 1.159 0 1.587 0.444 0.444 1.159 0.444 1.587 0l9.952-9.952c0.444-0.429 0.444-1.143 0-1.571l-9.952-9.953z" fill="#fff"/>
                </svg>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { firebase } from '../main'
import PostComponent from '@/views/Post-component.vue';
import { setTimeout } from 'timers';


var Posts = {
    name: 'posts',
    data() {
        var vue = this;
        return {
            posts: [],
            postsToShow: 5,
            fallignIcons: [],
            swiperOption: {
                allowTouchMove: true,
                simulateTouch: true,
                infinite: false,
                speed: 500,
                navigation: {
                    nextEl: '.swiper-arrow-next',
                    prevEl: '.swiper-arrow-prev',
                },
                // autoplayDisableOnInteraction: true,
                on: {
                    slideChange() {
                        vue.incPostViews(1)
                    }
                }
            }
        }
    },
    firestore() {
        return {
            posts: firebase.firestore().collection('data').doc('rhymes').collection('published').orderBy('createdAt', 'desc')
        }
    },
    methods: {
        incPostViews(count) {
            if (this.postsToShow < this.posts.length) this.postsToShow += count;
            else return;
        },
        updateInc(rating, id, type) {
            rating++;

            firebase.firestore().collection('data').doc('rhymes').collection('published').doc(id).set({
                rating: rating
            }, {
                merge: true
            }).then(() => {
               if (type == 'slide') {
                    this.createFallIcon();
               }
            });
        },
        createFallIcon() {
            var width, height, left, id, random, randomLeft, top, animationDuration;

            //set id and random
            id = "icon_" + Date.now();
            random = this.randomNumber(2, 7, 1);
            randomLeft = this.randomNumber(0, 99, 0);

            //set animation duration random
            animationDuration = this.randomNumber(2, 4, 0) + 's';

            //set width icon
            width = 10 * random;
            height = width;

            //set position
            left =  randomLeft;
            top = +height * -1;

            //add metrics sign in end for styles
            height += 'px';
            width += 'px';
            top += 'px';
            left += '%';

            var item = {
                styles: {width, height, top, left, animationDuration},
                id,
            };

            //add in array
            this.fallignIcons.push(item);

            setTimeout(() =>  {
                this.fallignIcons = this.fallignIcons.filter(item => {
                    return item.id != id;
                });
            }, 4000);


        },
        randomNumber(min, max, precision) {
            var x = Math.random() * (max - min) + min;
            var p = Math.pow(10, precision);
            return Math.round(x * p) / p;
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

    },
    created() {
        var _this = this;

        var checkPosts = setInterval(function() {
            if (window.navigator.onLine == true && _this.posts.length == 0) {

                _this.$firestoreRefs.posts = firebase.firestore().collection('data').doc('rhymes').collection('published').orderBy('createdAt', 'desc')

                clearTimeout(checkPosts);
            }

            if (_this.posts.length) clearTimeout(checkPosts);
        }, 500);
    }
};

export default Posts;

</script>

