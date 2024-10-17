<template>
    <div class="register-container">
        <h1>Register</h1>
        <form @submit.prevent="handleRegister">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" v-model="username" placeholder="Enter your username" required />
            </div>
            <div class="form-group">
                <label for="uid">UID:</label>
                <input type="text" v-model="uid" placeholder="Enter your UID" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" v-model="password" placeholder="Enter your password" required />
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" v-model="confirmPassword" placeholder="Confirm your password" required />
            </div>
            <button type="submit" class="btn-primary">Register</button>
        </form>
        <button @click="redirectToLogin" class="btn-secondary">Return to Login</button>
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

    if (!username.value.trim()) {
        alert('Username cannot be empty');
        return;
    }
    if (!uid.value.trim()) {
        alert('UID cannot be empty');
        return;
    }

    if (illegalChars.test(username.value)) {
        alert('Username contains illegal characters');
        return;
    }
    if (illegalChars.test(uid.value)) {
        alert('UID contains illegal characters');
        return;
    }

    if (password.value !== confirmPassword.value) {
        alert('Passwords do not match');
        return;
    }

    alert('Registration successful!');
};

const redirectToLogin = () => {
    window.location.href = '/login';
};
</script>

<style scoped>
/* General page styling (shared with the login page) */
body {
    font-family: 'Roboto', sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* Container styling similar to login */
.register-container {
    width: 350px;
    padding: 40px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: all 0.3s ease;
}

.register-container:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.register-container h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
}

/* Form Group Styling */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #333;
}

.form-group input {
    width: 70%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: #42b983;
    box-shadow: 0 0 8px rgba(66, 185, 131, 0.2);
}

/* Button styling matches login */
.btn-primary {
    width: 100%;
    padding: 12px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 10px;
}

.btn-primary:hover {
    background-color: #369a6f;
}

.btn-secondary {
    width: 100%;
    padding: 12px;
    background-color: transparent;
    color: #42b983;
    border: 2px solid #42b983;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-secondary:hover {
    background-color: #42b983;
    color: white;
}

/* Responsive Design */
@media (max-width: 400px) {
    .register-container {
        width: 100%;
        padding: 20px;
    }
}
</style>
