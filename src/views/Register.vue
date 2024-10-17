<template>
    <div class="register-container">
        <h1>Register</h1>
        <form @submit.prevent="handleRegister">
            <div>
                <label for="username">Username:</label>
                <input type="text" v-model="username" required />
            </div>
            <div>
                <label for="uid">UID:</label>
                <input type="text" v-model="uid" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
            </div>
            <div>
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" v-model="confirmPassword" required />
            </div>
            <button type="submit">Register</button>
        </form>
        <button @click="redirectToLogin">Return to Login</button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const username = ref('');
const uid = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleRegister = () => {
    const illegalChars = /[!@#\$%\^\&*\)\(+=._-]+/g;

    // Check if fields are not empty
    if (!username.value.trim()) {
        alert('Username cannot be empty');
        return;
    }
    if (!uid.value.trim()) {
        alert('UID cannot be empty');
        return;
    }

    // Check for illegal characters in username and uid
    if (illegalChars.test(username.value)) {
        alert('Username contains illegal characters');
        return;
    }
    if (illegalChars.test(uid.value)) {
        alert('UID contains illegal characters');
        return;
    }

    // Check if password fields match
    if (password.value !== confirmPassword.value) {
        alert('Passwords do not match');
        return;
    }

    // Proceed with registration (e.g., call an API)
    alert('Registration successful!');
};

const redirectToLogin = () => {
    window.location.href = '/login';
};
</script>

<style scoped>
.register-container {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.register-container h1 {
    text-align: center;
    margin-bottom: 20px;
}

.register-container form div {
    margin-bottom: 15px;
}

.register-container form label {
    display: block;
    margin-bottom: 5px;
}

.register-container form input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.register-container form button {
    width: 100%;
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.register-container form button:hover {
    background-color: #369a6f;
}

.register-container button {
    margin-top: 10px;
    width: 100%;
    padding: 10px;
    background-color: #ccc;
    color: #333;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.register-container button:hover {
    background-color: #bbb;
}
</style>
