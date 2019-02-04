<template>
    <form action="" @submit.prevent="login()">
        <input v-model="email" type="text" placeholder="Email" autocomplete>
        <input v-model="password" type="password" placeholder="Пароль" autocomplete>
        <button>Войти</button>
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
                    // swal('Успешный вход', 'Открываю дверь, стелю дорожку', 'success')
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

