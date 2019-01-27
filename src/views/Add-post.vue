<template>
    <div>
        <h1>Добавить рифму</h1>
        <form @submit.prevent="sendRhyme()">
            <input type="text" v-model="name" placeholder="Название рифмы">
            <input type="text" v-model="author" placeholder="Ваше имя">
            <input type="text" v-model="link" placeholder="Ссылка на страницу вк">

            <button type="submit">Отправить</button>
        </form>

    </div>
</template>

<script>
import { firebase } from '../main'


export default {
    name: 'add-post',
    data() {
        return {
            name: '',
            link: '',
            author: ''

        }
    },
    methods: {
        makeid(amountSymbols = 50) {
            var text = "";
            var possible = "Aasd1231kj2nelaksdo3121321k1elaksnbfaoiuenriu23n4elkqeBCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < amountSymbols; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        },
        sendRhyme() {
            firebase.firestore().collection('data').doc('rhymes').collection('published').add({
                createdAt: new Date(),
                id: this.makeid(),
                author: this.author,
                name: this.name,
                link: this.link,
                rating: 0
            });

            this.name = '';
            this.author = '';
            this.link = '';
        }
    }
}

</script>

