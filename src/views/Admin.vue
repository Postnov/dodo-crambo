<template>
    <div class="admin">
        <router-link to="/" class="link-return">Вернуться</router-link>

        <div class="admin__row">
            <div class="admin__col">
                <h1 class="admin__title">На модерации</h1>
                <div class="admin__list">
                    <div class="admin-post" v-for="item in moderated" :key="item.id">
                        <p>{{item.name}}</p>
                        <button @click="movePost('moderated', 'published', item)" class="btn btn-success">Опубликовать</button>
                        <button @click="deletePost('moderated', item.id)" class="btn btn-error">Удалить</button>
                    </div>
                </div>
            </div>
            <div class="admin__col">
                <h1 class="admin__title">Опубликованные</h1>
                <div class="admin__list">
                    <div class="admin-post" v-for="item in published" :key="item.id">
                        <p>{{item.name}}</p>
                        <button class="btn btn-warning" @click="movePost('published', 'moderated', item)">На модерацию</button>
                        <button class="btn btn-error" @click="deletePost('published', item.id)">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import { fileURLToPath } from 'url';

export default {
    name: 'admin',
    data() {
        return {
            moderated: [],
            published: []
        }
    },
    firestore() {
        return {
            published: firebase.firestore().collection('data').doc('rhymes').collection('published').orderBy('createdAt'),
            moderated: firebase.firestore().collection('data').doc('rhymes').collection('moderated').orderBy('createdAt')
        }

    },
    methods: {
        deletePost(array, id) {
            firebase.firestore().collection('data').doc('rhymes').collection(array).doc(id).delete();
        },
        movePost(from, to, item) {
            firebase.firestore().collection('data').doc('rhymes').collection(from).doc(item.id).delete();

            firebase.firestore().collection('data').doc('rhymes').collection(to).doc(item.id).set(item)
        }
    }
}
</script>

