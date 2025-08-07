<template>
    <div>
        <div>
            Books with ISBN greater than 1000
        </div>
        <div>
            <ul>
                <li v-for="book in books" :key="book.id">
                    ISBN: {{ book.isbn }} | NAME: {{ book.name }}
                    <button @click="editBook(book)">Edit</button>
                    <button @click="deleteBook(book.id)">Delete</button>
                    
                    <!-- Edit Form (shown only for selected book) -->
                    <div v-if="editingBook && editingBook.id === book.id">
                        <input v-model="editingBook.isbn" type="text" placeholder="ISBN">
                        <input v-model="editingBook.name" type="text" placeholder="Name">
                        <button @click="updateBook">Save</button>
                        <button @click="cancelEdit">Cancel</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '../fireBase';
import { collection, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const books = ref([]);
const editingBook = ref(null);

const getBooks = async () => {
    try {
        const booksCollection = collection(db, 'books');
        const q = query(booksCollection, where('isbn', '>', 1000));
        const querySnapshot = await getDocs(q);
        books.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching books:', error);
    }
};

const editBook = (book) => {
    editingBook.value = { ...book }; // Create a copy for editing
};

const cancelEdit = () => {
    editingBook.value = null;
};

const updateBook = async () => {
    try {
        const bookRef = doc(db, 'books', editingBook.value.id);
        await updateDoc(bookRef, {
            isbn: editingBook.value.isbn,
            name: editingBook.value.name
        });
        await getBooks(); // Refresh the list
        editingBook.value = null;
    } catch (error) {
        console.error('Error updating book:', error);
    }
};

const deleteBook = async (bookId) => {
    try {
        if (confirm('Are you sure you want to delete this book?')) {
            const bookRef = doc(db, 'books', bookId);
            await deleteDoc(bookRef);
            await getBooks(); // Refresh the list
        }
    } catch (error) {
        console.error('Error deleting book:', error);
    }
};

onMounted(() => {
    getBooks();
});
</script>

<style scoped>
button {
    margin-left: 10px;
    padding: 2px 8px;
}
</style>