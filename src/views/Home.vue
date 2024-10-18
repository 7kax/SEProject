<template>
    <div class="home-container">
        <h1>Welcome, {{ user?.username }}!</h1>
        <button @click="logout">Logout</button>
        <button @click="redirectToProfile">Go to Profile</button>
        <button v-if="isAdmin" @click="redirectToAdmin">Manage Users</button>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isAdmin = computed(() => authStore.isAdmin);

const logout = () => {
    authStore.logout();
    window.location.href = '/login';
};

const redirectToProfile = () => {
    window.location.href = '/profile';
};

const redirectToAdmin = () => {
    window.location.href = '/admin';
};

</script>