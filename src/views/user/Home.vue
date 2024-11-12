<template>
  <div class="home-container">
    <h1>欢迎回来, {{ user.id }}!</h1>

    <div class="top-nav">
      <el-dropdown>
        <button class="nav-button">
          论文管理
          <span class="dropdown-arrow">▼</span>
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="redirectToPaperList">查看论文</el-dropdown-item>
            <el-dropdown-item @click="createPaper">新增论文</el-dropdown-item>
            <el-dropdown-item @click="claimPaper">认领论文</el-dropdown-item>
            <el-dropdown-item @click="requestDeletePaper">申请删除论文</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <button @click="redirectToProfile" class="nav-button">个人信息维护</button>
      <button @click="logout" class="logout-button">登出</button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import CreatePaperForm from "@/components/CreatePaperForm.vue";
import ClaimPaperForm from "@/components/ClaimPaperForm.vue";
import router from '@/router';

const authStore = useAuthStore();
const user = JSON.parse(localStorage.getItem('user') as string);

const logout = () => {
  authStore.logout();
  router.push('/');
};

const redirectToProfile = () => {
  window.location.href = '/profile';
};

const redirectToPaperList = () => {
  window.location.href = '/user/papers/list';
};

const addFormVisible = ref(false);
const createPaper = () => {
  CreatePaperForm.value = {};
  addFormVisible.value = true;
};

const claimPaper = () => {
  ClaimPaperForm.value = {};
  addFormVisible.value = true;
};

const requestDeletePaper = () => {
  // Code to request paper deletion
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
  background-color: white;
  /* Light grey background */
  color: #333;
  /* Darker grey text */
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
  background-color: #ddd;
  /* Darker grey on hover */
}

.nav-button .dropdown-arrow {
  margin-left: 5px;
  font-size: 12px;
  color: #333;
  /* Matching text color */
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
  color: white;
  /* White text on hover */
}

/* Dropdown Item Styling */
.el-dropdown-menu {
  font-family: 'Roboto', sans-serif;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.el-dropdown-item {
  padding: 10px 15px;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.el-dropdown-item:hover {
  background-color: #f0f0f0;
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
