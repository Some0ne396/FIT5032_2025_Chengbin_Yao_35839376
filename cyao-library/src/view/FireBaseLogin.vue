<template>
    <h1>
        login
    </h1>
    <P>
        <input type="text" placeholder="Email" v-model="email">
    </P>
    <p>
        <input type="password" placeholder="Password" v-model="password">
    </p>
    <p>
        <button @click="fireBasesignin"> Sign in via fire base</button>
    </p>
</template>

<script setup>
import {ref} from "vue"
import {signInWithEmailAndPassword} from "firebase/auth"
import { useRouter } from "vue-router";
import { auth,db } from "../fireBase"
import { role, isLoggedIn } from "@/components/userState.js";
import { doc, getDoc } from "firebase/firestore";

const email=ref("")
const password=ref("")
const router= useRouter()

const fireBasesignin = async() =>{
    try{
        //get user
        const userCredential =await signInWithEmailAndPassword(auth,email.value,password.value)
        console.log("Firebase sign in successful")
        const uid = userCredential.user.uid;

        const roleRef = doc(db, "users",uid );
        const roleSnap = await getDoc(roleRef);
       

        const data = roleSnap.data();
        let userRole = data.role;
        role.value = userRole;
        isLoggedIn.value = true;


        
        console.log("login successful, role:", role.value);
        console.log("login successful, Current User:", userCredential.user);

    } catch (error) {
        console.error("Error signing in:", error);
        return;
    }
}

</script>