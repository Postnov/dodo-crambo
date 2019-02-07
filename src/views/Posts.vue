<template>
    <div>
        <div class="post-slider" >
            <swiper :options="swiperOption" ref="mySwiper" >
                <swiper-slide v-for="post in posts.slice(0, postsToShow)" :key="post.id" >
                    <post-component class="post-slide" :post="post" v-on:incrate="updateInc"></post-component>
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


var Posts = {
    name: 'posts',
    data() {
        return {
            msg: 0,
            posts: [],
            postsToShow: 5,
            swiperOption: {
                allowTouchMove: true,
                simulateTouch: true,
                infinite: false,
                speed: 500,
                autoplay: {
                    delay: 5000,
                },
                navigation: {
                    nextEl: '.swiper-arrow-next',
                    prevEl: '.swiper-arrow-prev',
                },
                on: {
                    slideChange() {}
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
            if (this.postsToShow < this.posts.length) this.postsToShow += count;
            else return;
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

    },
    created() {
        var _this = this;

        var checkPosts = setInterval(function() {
            if (window.navigator.onLine == true && _this.posts.length == 0) {
                _this.posts = [];

                firebase.firestore().collection('data').doc('rhymes').collection('published').get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
                        _this.posts.push(doc.data());
                    });
                });

                clearTimeout(checkPosts);
            }

            if (_this.posts.length) clearTimeout(checkPosts);
        },500);
    }
};

export default Posts;

</script>

