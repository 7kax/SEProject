<template>
  <div class="menu-container">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" :router="true">
      <el-menu-item index="1" :route="{ path: '/user/paper_list' }">论文列表</el-menu-item>
      <el-menu-item index="2" :route="{ path: '/user/profile' }">个人信息</el-menu-item>
      <el-menu-item index="3" :route="{ path: '/user/paper_board' }">数据大屏</el-menu-item>
      <el-menu-item @click="logout">登出</el-menu-item>
    </el-menu>
  </div>
  <router-view />
</template>

<script lang="ts" setup>
import ClaimPaperForm from "@/components/ClaimPaperForm.vue";
import CreatePaperForm from "@/components/CreatePaperForm.vue";
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const router = useRouter();
const activeIndex = ref('1');

onMounted(() => {
  router.push('/user/paper_list');
});

const logout = () => {
  authStore.logout();
  router.push('/');
};

const redirectToProfile = () => {
  window.location.href = '/user/profile';
};

const redirectToPaperList = () => {
  window.location.href = '/user/paper_list';
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
.menu-container {
  width: 100%;
}
</style>
