<template>
    <div>
        <h1>Добавить рифму</h1>
        <input type="text" v-model="rhyme" placeholder="Название рифмы">
        <input type="text" v-model="link" placeholder="Ваше имя">
        <input type="text" v-model="name" placeholder="Ссылка на страницу вк">

        <button @click="sendRhyme()">Отправить</button>

    </div>
</template>

<script>

export default {
    name: 'add-post',
    data() {
        return {
            rhyme: '',
            link: '',
            name: ''

        }
    },
    methods: {
        sendRhyme() {
            console.log('send')
        }
    }
}

</script>

