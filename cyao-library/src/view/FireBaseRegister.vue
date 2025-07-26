<template>
    <h1>        
        Register
    </h1>
    <P>
        <input type="text" placeholder="Email" v-model="email">
    </P>
    <p>
        <input type="password" placeholder="Password" v-model="password">
    </p>
    <p>
        <button @click="fireBaseregister"> Save to fire base</button>
    </p>
</template>

<script setup>
import {ref} from "vue"
import {createUserWithEmailAndPassword} from "firebase/auth"
import { useRouter } from "vue-router";
import { auth ,db} from "../fireBase"
import { setDoc, doc } from "firebase/firestore";

const email=ref("")
const password=ref("")
const router= useRouter()

const test123 =() =>{
    console.log("TESTING")
}

const fireBaseregister =async() =>{
    console.log("Doin")
    try{
        //Create a new user
        const newuser =await createUserWithEmailAndPassword(auth,email.value,password.value)
        //Add the role infomation to the user
        console.log("Firebase register successful")
        await setDoc(doc(db, "users",newuser.user.uid), {
        uid: newuser.user.uid,
        role: "user",
    }); 
    } catch (error) {
        console.error("Error creating user:", error);
        return;
    }
    
}

</script>