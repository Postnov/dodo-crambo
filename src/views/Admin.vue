<template>
    <div class="admin">
        <div class="admin__row">
            <div class="admin__col">
                <h1>На модерации</h1>
                <div class="admin-post" v-for="item in moderated" :key="item.id">
                    <p>{{item.name}}</p>
                    <button @click="deletePost('moderated', item.id)">Удалить</button>
                    <button @click="movePost('moderated', 'published', item)">Опубликовать</button>
                </div>
            </div>
            <div class="admin__col">
                <h2>Опубликованные</h2>
                <div class="admin-post" v-for="item in published" :key="item.id">
                    <p>{{item.name}}</p>
                    <button @click="deletePost('published', item.id)">Удалить</button>
                    <button @click="movePost('published', 'moderated', item)">На модерацию</button>
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

