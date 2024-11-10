<template>
    <div class="login-container">
        <h2>登录</h2>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="id">学号/工号:</label>
                <input type="text" v-model="id" placeholder="输入学号/工号" required />
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
import { validPassword, validID } from '@/utils/verify';
import { errorAlert, successAlert } from '@/utils/alert';
import { useRouter } from 'vue-router';
import { post } from '@/utils/request';

const router = useRouter();
const authStore = useAuthStore();
const id = ref('');
const password = ref('');

const handleLogin = async () => {
    if (!validID(id.value)) {
        errorAlert('学号/工号格式错误');
        return;
    }
    if (!validPassword(password.value)) {
        errorAlert('密码格式错误');
        return;
    }

    const data = {
        id: id.value,
        password: password.value,
    };

    try {
        let res = await post('/api/login', data);

        if (res.status === 200) {
            const user = {
                id: res.data.user.id,
                token: res.data.token,
                isAdmin: false,
            };
            authStore.login(user);
            successAlert('登录成功');
            router.push('/');
            return;
        }
      } catch (error) {
          try {
              let adminres = await post('/api/admin/login', data);

              if (adminres.status === 200) {
                  const admin = {
                      id: adminres.data.user.id,
                      token: adminres.data.token,
                      isAdmin: true,
                  };
                  authStore.login(admin);
                  successAlert('管理员登录成功');
                  router.push('/admin'); // Redirect to admin home
                  return;
              }
        } catch (error) {
            errorAlert('登录失败');
        }
    }
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
