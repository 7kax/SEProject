<template>
    <div class="register-container">
        <h1>注册</h1>
        <form @submit.prevent="handleRegister">
            <div class="form-group">
                <label for="id">学号/工号:</label>
                <input type="text" v-model="id" placeholder="输入学号/工号" required />
            </div>
            <div class="form-group">
                <label for="password">密码:</label>
                <input type="password" v-model="password" placeholder="输入密码" required />
            </div>
            <div class="form-group">
                <label for="confirmPassword">确认密码:</label>
                <input type="password" v-model="confirmPassword" placeholder="确认密码" required />
            </div>
            <button type="submit" class="btn-primary">注册</button>
        </form>
        <button @click="redirectToLogin" class="btn-secondary">返回登录页面</button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { validPassword, validID } from '@/utils/verify';
import { errorAlert, successAlert } from '@/utils/alert';
import { useRouter } from 'vue-router';
import { addUser } from '@/requests/user';

const router = useRouter();
const id = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleRegister = () => {
    if (!validID(id.value)) {
        errorAlert('学号/工号格式错误');
        return;
    }
    if (!validPassword(password.value)) {
        errorAlert('密码格式错误');
        return;
    }

    if (password.value !== confirmPassword.value) {
        errorAlert('密码不匹配');
        return;
    }

    const data = {
        id: id.value,
        password: password.value,
    };

    addUser(data).then((_res) => {
        successAlert('注册成功!');
        router.push('/');
    }).catch((err) => {
        errorAlert(err.message);
    });
};

const redirectToLogin = () => {
    router.push('/');
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
