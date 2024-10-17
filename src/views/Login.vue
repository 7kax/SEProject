<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" v-model="username" placeholder="Enter your username" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" v-model="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" class="btn-primary">Login</button>
        </form>
        <button type="button" class="btn-secondary" @click="redirectToRegister">Register</button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const username = ref('');
const password = ref('');

const handleLogin = () => {
    if (!username.value.trim()) {
        alert('Username cannot be empty');
        return;
    }
    if (!password.value.trim()) {
        alert('Password cannot be empty');
        return;
    }

    if (username.value === 'admin' && password.value === 'password') {
        authStore.login({ username: username.value, uid: '123' });
        window.location.href = '/';
    } else if (username.value === 'user' && password.value === 'password') {
        authStore.login({ username: username.value, uid: '456' });
        window.location.href = '/';
    } else {
        alert('Invalid username or password');
    }
};

const redirectToRegister = () => {
    window.location.href = '/register';
};
</script>

<style scoped>
/* General page styling */
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

/* Container for login */
.login-container {
    width: 350px;
    padding: 40px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: all 0.3s ease;
}

.login-container:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
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

/* Buttons Styling */
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
    .login-container {
        width: 100%;
        padding: 20px;
    }
}
</style>
