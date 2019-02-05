<template>
    <form class="login-form add-post__form" action="" @submit.prevent="login()">
        <div class="add-post__input-block">
            <p class="add-post__input-label">Email</p>
            <input class="add-post__input" v-model="email" type="text" autocomplete>
        </div>
        <div class="add-post__input-block">
            <p class="add-post__input-label">Пароль</p>
            <input class="add-post__input" v-model="password" type="password" autocomplete>
        </div>

        <button class="add-post__btn">Войти</button>
    </form>
</template>

<script>
import firebase from 'firebase'
import {Swal} from '@/main'

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            var that = this;
            console.log(firebase)

            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                function(answer){
                    Swal.fire({
                        title: 'Добро пожаловать, бро админ',
                        text: 'Верши судьбы рифмоплетов',
                        type: 'success',
                        confirmButtonText: 'Принимаю власть'
                    })
                    that.$router.replace('/admin');
                },
                function(err){
                    switch(err.code) {
                        case 'auth/email-already-exists':
                            console.log('Пользователь с таким email уже существует')
                            break;
                        case 'auth/user-not-found':
                            console.log('Пользователь не найден')
                            break;
                        case 'auth/invalid-email-verified':
                            console.log('Неверный email')
                            break;
                        case 'auth/invalid-email':
                            console.log('Неверный формат email')
                            break;
                        case 'auth/wrong-password':
                            console.log('Пароль неверный или отсутствует');
                            break;
                    }
                }
            )
        },
    },
    computed: {}
}
</script>

