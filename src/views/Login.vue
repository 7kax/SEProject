<template>
    <div class="login-container">
        <h2>登录</h2>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="username">用户名:</label>
                <input type="text" v-model="username" placeholder="输入用户名" required />
            </div>
            <div class="form-group">
                <label for="password">密码:</label>
                <input type="password" v-model="password" placeholder="输入密码" required />
            </div>
            <button type="submit" class="btn-primary">登录</button>
        </form>
        <button type="button" class="btn-secondary" @click="redirectToRegister">注册</button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { validPassword, validUsername } from '@/utils/verify';
import { errorAlert, successAlert } from '@/utils/alert';
import { useRouter } from 'vue-router';
import { postRequest } from '@/utils/request';

const router = useRouter();
const authStore = useAuthStore();
const username = ref('');
const password = ref('');

const handleLogin = () => {
    if (!validUsername(username.value)) {
        errorAlert('用户名格式错误');
        return;
    }
    if (!validPassword(password.value)) {
        errorAlert('密码格式错误');
        return;
    }

    // if (username.value === 'admin' && password.value === 'password') {
    //     authStore.login({ username: username.value, uid: '123' });
    //     successAlert('登录成功');
    //     router.push('/');
    // } else if (username.value === 'user' && password.value === 'password') {
    //     authStore.login({ username: username.value, uid: '456' });
    //     successAlert('登录成功');
    //     router.push('/');
    // } else {
    //     errorAlert('用户名或密码错误');
    // }

    const data = {
        username: username.value,
        password: password.value,
    };
    postRequest('/api/login', data).then((res) => {
        console.log(res);
        const data = res.data;
        if (res.status === 200) {
            const user = {
                username: data.user.username,
                uid: data.user.id,
                token: data.token,
                isAdmin: data.user.role
            };
            authStore.login(user);
            successAlert('登录成功');
            router.push('/');
        } else if (res.status === 401) {
            errorAlert(data.message);
        } else {
            errorAlert('登录失败');
        }
    });
};

const redirectToRegister = () => {
    router.push('/register');
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
