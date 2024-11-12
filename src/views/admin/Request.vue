<!-- 管理员处理请求的页面 -->
<!-- 目前有: 草稿审核、请求删除、认领申请 -->
<template>
    <ClaimList />
    <br>
    <DeleteList />
</template>

<script lang="ts" setup>
import ClaimList from '@/components/ClaimList.vue';
import DeleteList from '@/components/DeleteList.vue';
</script>