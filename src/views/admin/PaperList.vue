<!-- 管理员看到的论文列表, 包含审核通过的论文 -->
<template>
    <el-container>
        <el-header>论文列表</el-header>
        <el-main>
            <el-table :data="papers" fit>
                <el-table-column prop="title" label="论文标题" width="500"></el-table-column>
                <el-table-column label="作者">
                    <template #default="scope">
                        <span
                            v-for="(author, index) in [...scope.row.firstAuthor, ...scope.row.secondAuthor, ...scope.row.thirdAuthor]"
                            :key="index">
                            {{ index > 0 ? ', ' : '' }}{{ author }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="CCF" label="CCF分级" width="120"></el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { fetchPaper } from '@/requests/paper';
import { errorAlert } from '@/utils/alert';
import { onMounted, ref } from 'vue';

// 组件挂载时, 向后端请求论文数据
const papers = ref<Paper[]>([
    // {
    //     DOI: '111',
    //     title: 'title1',
    //     firstAuthor: ["author1"],
    //     secondAuthor: [],
    //     thirdAuthor: [],
    //     CCF: 'A',
    //     status: 'notSubmit',
    //     additional: []
    // }
]);
const refreshPapers = () => {
    // const url = `/api/papers?id&doi`;
    // const token = localStorage.getItem('token') as string;
    // getWithToken(url, token).then((res) => {
    //     if (res.status === 200) {
    //         papers.value = res.data.papers;

    //         // 删去papers中status不为"审核通过"的元素
    //         papers.value = papers.value.filter((paper) => paper.status === 'approve');
    //     }
    // }).catch((err) => {
    //     errorAlert(err.res.data.message);
    // });

    const params = {
        id: '',
        doi: '',
    };

    fetchPaper(params).then((res) => {
        papers.value = res.papers;
    }).catch((_err) => {
        errorAlert('获取论文列表失败');
    });
};
onMounted(() => {
    refreshPapers();
});

</script>

<style scoped>
.el-header {
    font-size: 40px;
    margin-bottom: 40px;
    margin-top: 10px;
    font-weight: bold;
}
</style>