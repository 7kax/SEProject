<template>
  <div class="home-container">
    <h1>欢迎回来, 管理员!</h1>

    <div class="top-nav">
      <button @click="redirectToRequest" class="nav-button">请求管理</button>
      <button @click="" class="nav-button">论文管理</button>
      <button @click="redirectToProfileList" class="nav-button">用户账号管理</button>
      <button @click="logout" class="logout-button">登出</button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const admin = computed(() => authStore.user);

const logout = () => {
  authStore.logout();
  window.location.href = '/login';
};

const redirectToProfileList = () => {
  window.location.href = '/admin/user';
};

const redirectToRequest = () => {
  window.location.href = '/admin/request'
};
</script>

<style scoped>
/* General Page Styling */
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

/* Top Right Navigation Styling */
.top-nav {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
}

/* Button Styling for Nav Buttons with Grey Color */
.nav-button {
  background-color: white; /* Light grey background */
  color: #333; /* Darker grey text */
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
}

.nav-button:hover {
  background-color: #ddd; /* Darker grey on hover */
}

.nav-button .dropdown-arrow {
  margin-left: 5px;
  font-size: 12px;
  color: #333; /* Matching text color */
}

/* Custom Styling for Logout Button */
.logout-button {
  background-color: white;
  color: #333;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.logout-button:hover {
  background-color: #888888;
  color: white; /* White text on hover */
}


/* Main Container Styling */
.home-container {
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
