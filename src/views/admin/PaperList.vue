<!-- 管理员看到的论文列表, 包含审核通过的论文 -->
<template>
    <el-container>
        <el-header>论文列表</el-header>
        <el-main>
            <el-table :data="papers" style="width: 100%">
                <el-table-column prop="title" label="论文标题" width="300"></el-table-column>
                <el-table-column label="作者">
                    <template #default="scope">
                        <span
                            v-for="(author, index) in [...scope.row.firstAuthor, ...scope.row.secondAuthor, ...scope.row.thirdAuthor]"
                            :key="index">
                            {{ index > 0 ? ', ' : '' }}{{ author }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="CCF" label="CCF分级" width="150"></el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { getWithToken } from '@/utils/request';
import { onMounted, ref } from 'vue';

// 组件挂载时, 向后端请求论文数据
const papers = ref<Paper[]>([]);
const refreshPapers = () => {
    const id = JSON.parse(localStorage.getItem('user') as string).id;
    const url = `/api/papers/${id}`;
    const token = localStorage.getItem('token') as string;
    getWithToken(url, token).then((res) => {
        papers.value = res.data.papers;
    });

    // 删去papers中status不为"审核通过"的元素
    papers.value = papers.value.filter((paper) => paper.status === Status.Approve);
};
onMounted(async () => {
    refreshPapers();
});

</script>

<style scoped>
/* 添加一些自定义样式 */
</style>