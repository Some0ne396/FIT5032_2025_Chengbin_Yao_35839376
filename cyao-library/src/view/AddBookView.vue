<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">🗄️ W8. Add Book</h1>

        <form @submit.prevent="addBook">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
                <label for="isbn" class="form-label">ISBN:</label>
                <input
                    type="text"
                    class="form-control"
                    id="isbn"
                    v-model="isbn"
                    retuired
                />
            </div>
            <div class="col-md-6 col-sm-6">
                <label for="name" class="form-label">Name:</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="name"
                    retuired
                />                
            </div>
           
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
          </div>
        </form>
      </div>
    </div>
    <div>
        <Booklist></Booklist>
    </div>
  </div>

</template>

<script setup>
    import { ref } from 'vue';
    import { db } from '../fireBase';
    import { collection, addDoc } from 'firebase/firestore';
    import Booklist from '@/components/booklist.vue';
    const isbn = ref('');
    const name = ref('');
    
    const addBook =async()=>{
        try {
            if(isNaN(Number(isbn.value) )){
                console.error('ISBN are required');
                return
            }

            if(name.value.trim() === ''){
                console.error('Name is required');
                return
            }

            const docRef = await addDoc(collection(db, 'books'), {
                isbn: Number(isbn.value),
                name: name.value
            });
            console.log('Document written with ID: ', docRef.id);
            alert('Book added successfully!');
            isbn.value = '';
            name.value = '';
        } catch (e) {
            console.error('Error adding document: ', e);
        }


    }
</script>