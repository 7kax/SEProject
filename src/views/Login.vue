<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <div>
                <label for="username">Username:</label>
                <input type="text" v-model="username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
    <button type="button" @click="redirectToRegister">Register</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const username = ref('');
const password = ref('');

const handleLogin = () => {
     // Check if username or password is empty
    if (!username.value.trim()) {
        alert('Username cannot be empty');
        return;
    }
    if (!password.value.trim()) {
        alert('Password cannot be empty');
        return;
    }
    
    if (username.value === 'admin' && password.value === 'password') {
        // Suppose the login is successful
        authStore.login({ username: username.value, uid: '123' });

        // Redirect to the home page
        window.location.href = '/';
    } else if (username.value === 'user' && password.value === 'password') {
        // Suppose the login is successful
        authStore.login({ username: username.value, uid: '456' });

        // Redirect to the home page
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
.login-container {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-container h2 {
    text-align: center;
    margin-bottom: 20px;
}

.login-container form div {
    margin-bottom: 15px;
}

.login-container form label {
    display: block;
    margin-bottom: 5px;
}

.login-container form input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.login-container form button {
    width: 100%;
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.login-container form button:hover {
    background-color: #369a6f;
}
</style>