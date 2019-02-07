<template>
    <div>
        <div ref="preloader" class="preloader">
            <canvas ref="pizza" class="pizza"></canvas>
        </div>
        <header class="page__header header">
            <div class="header__left">
                <p v-if="view == 'posts'" class="logo-text" @click="view = 'posts'">Додо Рифма</p>
                <p v-if="view != 'posts'" class="logo-text logo-text--return" @click="view = 'posts'">На главную</p>
        </div>

            <div class="header__right">
                    <button class="header__btn" @click="view = 'post-list'">Все рифмы</button>
                    <button class="header__btn" @click="view = 'add-post'">Добавить свою</button>
            </div>
        </header>
        <div class="app-content">
            <transition name="slide-fade" mode="out-in">
                <keep-alive>
                    <component :is="view"></component>
                </keep-alive>
            </transition>
        </div>

        <div class="author">
            <p class="author__text">Автор проекта: <a href="https://dev-postnov.ru">Постнов Даниил</a> </p>
        </div>
    </div>
</template>


<script>
import AddPost from './Add-post';
import Posts from './Posts'
import PostList from './Post-list'
import { setTimeout } from 'timers';
import firebase from 'firebase'


export default {
	name: 'Home',
	data() {
		return {
			view: 'posts',
            showAll: false,
		}
	},
	components: {
		'add-post': AddPost,
		'posts': Posts,
		'post-list': PostList
    },
    mounted() {

        var _this = this;


        firebase.firestore().collection('data').doc('rhymes').collection('published').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                _this.$refs.preloader.classList.add('hide');
            });
        });

        'use strict'

        let toRadians = (deg) => deg * Math.PI / 180
        let map = (val, a1, a2, b1, b2) => b1 + (val - a1) * (b2 - b1) / (a2 - a1)

        class Pizza {
            constructor(id) {
                this.canvas = _this.$refs[id]
                this.ctx = this.canvas.getContext('2d')

                this.sliceCount = 6
                this.sliceSize = 80

                this.width = this.height = this.canvas.height = this.canvas.width = this.sliceSize * 2 + 50
                this.center = this.height / 2 | 0

                this.sliceDegree = 360 / this.sliceCount
                this.sliceRadians = toRadians(this.sliceDegree)
                this.progress = 0
                this.cooldown = 10

            }

            update() {
                let ctx = this.ctx
                ctx.clearRect(0, 0, this.width, this.height)

                if (--this.cooldown < 0)
                    this.progress += this.sliceRadians*0.01 + this.progress * 0.07

                ctx.save()
                ctx.translate(this.center, this.center)

                for (let i = this.sliceCount - 1; i > 0; i--) {

                    let rad
                    if (i === this.sliceCount - 1) {
                        let ii = this.sliceCount - 1

                        rad = this.sliceRadians * i + this.progress

                        ctx.strokeStyle = '#FBC02D'
                        cheese(ctx, rad, .9, ii, this.sliceSize, this.sliceDegree)
                        cheese(ctx, rad, .6, ii, this.sliceSize, this.sliceDegree)
                        cheese(ctx, rad, .5, ii, this.sliceSize, this.sliceDegree)
                        cheese(ctx, rad, .3, ii, this.sliceSize, this.sliceDegree)

                    } else rad = this.sliceRadians * i

                    // border
                    ctx.beginPath()
                    ctx.lineCap = 'butt'
                    ctx.lineWidth = 11
                    ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians)
                    ctx.strokeStyle = '#F57F17'
                    ctx.stroke()

                    // slice
                    let startX = this.sliceSize * Math.cos(rad)
                    let startY = this.sliceSize * Math.sin(rad)
                    let endX = this.sliceSize * Math.cos(rad + this.sliceRadians)
                    let endY = this.sliceSize * Math.sin(rad + this.sliceRadians)
                    let varriation = [0.9,0.7,1.1,1.2]
                    ctx.fillStyle = '#FBC02D'
                    ctx.beginPath()
                    ctx.moveTo(0, 0)
                    ctx.lineTo(startX, startY)
                    ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians)
                    ctx.lineTo(0, 0)
                    ctx.closePath()
                    ctx.fill()
                    ctx.lineWidth = .3
                    ctx.stroke()

                    // meat
                    let x = this.sliceSize * .65 * Math.cos(rad + this.sliceRadians / 2)
                    let y = this.sliceSize * .65 * Math.sin(rad + this.sliceRadians / 2)
                    ctx.beginPath()
                    ctx.arc(x, y, this.sliceDegree / 6, 0, 2 * Math.PI)
                    ctx.fillStyle = '#D84315'
                    ctx.fill()

                }//end loop for

                ctx.restore()

                if (this.progress > this.sliceRadians) {
                    ctx.translate(this.center, this.center)
                    ctx.rotate(-this.sliceDegree * Math.PI / 180)
                    ctx.translate(-this.center, -this.center)

                    this.progress = 0
                    this.cooldown = 20
                }//end if

            }// end constructor

        }//end class pizza

        function cheese(ctx, rad, multi, ii, sliceSize, sliceDegree) {
            let x1 = sliceSize * multi * Math.cos(toRadians(ii * sliceDegree) - .2)
            let y1 = sliceSize * multi * Math.sin(toRadians(ii * sliceDegree) - .2)
            let x2 = sliceSize * multi * Math.cos(rad + .2)
            let y2 = sliceSize * multi * Math.sin(rad + .2)

            let csx = sliceSize * Math.cos(rad)
            let csy = sliceSize * Math.sin(rad)

            var d = Math.sqrt((x1 - csx) * (x1 - csx) + (y1 - csy) * (y1 - csy))
            ctx.beginPath()
            ctx.lineCap = 'round'

            let percentage = map(d, 15, 70, 1.2, 0.2)

            let tx = x1 + (x2 - x1) * percentage
            let ty = y1 + (y2 - y1) * percentage
            ctx.moveTo(x1, y1)
            ctx.lineTo(tx, ty)

            tx = x2 + (x1 - x2) * percentage
            ty = y2 + (y1 - y2) * percentage
            ctx.moveTo(x2, y2)
            ctx.lineTo(tx, ty)

            ctx.lineWidth = map(d, 0, 100, 20, 2)
            ctx.stroke()
        }// end cheese function

        let pizza = new Pizza('pizza')

        ;(function update() {
            requestAnimationFrame(update)
            pizza.update()
        }())
    }
}



</script>
