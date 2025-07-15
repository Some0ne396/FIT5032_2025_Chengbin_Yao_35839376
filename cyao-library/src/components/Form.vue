<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2 col-sm-8">
                <h1 class="text-center">
                    User information Form
                </h1>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <label class="form-label" for="username">Username</label>
                            <input type="text" class="form-control" id="username" @blur="()=> validateName(true)" @input="()=> validateName(false)" v-model="formData.username">
                            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label class="form-label" for="password">Password</label>
                            <input type="password" class="form-control" id="password" @focus="()=> validatePassword(true)" @input="()=> validatePassword(false)" v-model="formData.password">  
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <div class="form-check" >
                                <input type="checkbox" class="form-check-input" id="isAustralian" @change="()=> validateResident(true)" v-model="formData.isAustralian">
                                <label class="form-check-label" for="isAustralian">Australian Resident ?</label>
                                <div v-if="errors.resident" class="text-danger">{{ errors.resident }}</div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label for="gender" class="form-label" >Gender</label>
                            <select class="form-select" v-model="formData.gender" @focus="validateGender(true)" >
                                <option value="male">Male</option>
                                <option value="femal">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label">
                            Reason for jonining
                        </label>
                        <textarea class="form-control" id="reason" rows="3"  @blur="()=> validateReason(true)" @input="()=> validateReason(false)" v-model="formData.reason"></textarea>
                        <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2" @click="submitForm">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </form>
                <div class="row mt-5" v-if="submittedCards.length">
                    <div class="d-flex flex-wrap justify-content-start">
                    <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
                        <Column field="username" header="User Name"></Column>
                        <Column field="password" header="Password"></Column>
                        <Column field="isAustralian" header="Australian Resident:"></Column>
                        <Column field="gender" header="Gender"></Column>
                        <Column field="reason" header="Reason"></Column>
                    </DataTable>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

const formData = ref({
    username: '',
    password: '',
    isAustralian: null,
    reason: '',
    gender: null
});

const errors=ref({
    username:null,
    password:null,
    resident:null,
    gender:null,
    reason:null,
});

const validateGender=(blur)=>{
    if (formData.value.gender==null){
        if(blur) errors.value.gender = "Must select a gender";
    }
    else{
        errors.value.gender=null;
    }
};

const validateResident=(blur)=>{
    if (formData.value.isAustralian==null){
        if(blur) errors.value.username = "Must select whether or not resident in Australia";
    }
    else{
        errors.value.username=null;
    }
};

const validateReason=(blur)=>{
    if (formData.value.reason.length<3){
        if(blur) errors.value.reason = "Reason for joining must be longer than 3 characters";
    }
    else{
        errors.value.reason=null;
    }
};

const validateName=(blur)=>{
    if (formData.value.username.length<3){
        if(blur) errors.value.username = "Name must be at least 3 characters";
    }
    else{
        errors.value.username=null;
    }
};

const validatePassword =(blur)=>{
    const password=formData.value.password;
    const minLength=8
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if(password.length<minLength){
        if(blur) errors.value.password=`Password length must be at least ${minLength} characters long`
    }
    else if(!hasUpper){
        if(blur) errors.value.password="Password must contain at least one uppercase letter"
    }
    else if(!hasLower){
        if(blur) errors.value.password="Password must contain at least one lowercase letter"
    }
    else if(!hasNumber){
        if(blur) errors.value.password="Password must contain at least one number"
    }
    else if(!hasSpecialChar){
        if(blur) errors.value.password="Password must contain at least one special character"
    }
    else {
        if(blur) errors.value.password=null
    }

}

const submittedCards = ref([]);

const submitForm = () => {
    validateName(true);
    if (!errors.value.username&&!errors.value.password){
        submittedCards.value.push({...formData.value});
        formData.value = {
            username: '',
            password: '',
            isAustralian: false,
            reason: '',
            gender: ''
        };
    }
};

const clearForm= ()=>{
    submittedCards.value=[]
    formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
};

}
</script>

<style scoped>


   .card {
   border: 1px solid #ccc;
   border-radius: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   .card-header {
   background-color: #275FDA;
   color: white;
   padding: 10px;
   border-radius: 10px 10px 0 0;
   }
   .list-group-item {
   padding: 10px;
   }

   
</style>

