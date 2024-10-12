<template>
    <div class="home-container">
        <h1>Welcome, {{ user?.username }}!</h1>
        <button @click="logout">Logout</button>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const logout = () => {
    authStore.logout();
    window.location.href = '/login';
};

</script>