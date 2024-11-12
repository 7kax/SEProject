<template>
  <div class="menu-container">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" :router="true">
      <el-menu-item index="1" :route="{ path: '/admin/request' }">请求管理</el-menu-item>
      <el-menu-item index="2" :route="{ path: '/admin/paper_list' }">论文管理</el-menu-item>
      <el-menu-item index="3" :route="{ path: '/admin/user_list' }">用户账号管理</el-menu-item>
      <el-menu-item index="4" :route="{ path: '/admin/paper_board' }">数据大屏</el-menu-item>
      <el-menu-item @click="logout">登出</el-menu-item>
    </el-menu>
  </div>
  <router-view />
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const activeIndex = ref('1');

onMounted(() => {
  router.push('/admin/request');
});

const logout = () => {
  authStore.logout();
  router.push('/');
};
</script>

<style scoped>
.menu-container {
  width: 100%;
}
</style>
