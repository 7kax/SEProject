<!-- 用户认领论文的表单 -->
<template>
    <h3>论文认领</h3>
    <div>请输入查询的DOI<input v-model = "DOI"><button @click="queryPaperWithDOI">查找</button></div>
    <el-table :data="papers" style="width: 100%">
            <el-table-column prop="DOI" label="DOI" width="120" sortable />
            <el-table-column prop="title" label="标题" width="120" sortable />
            <el-table-column prop="firstAuthor" label="第一作者" width="120" sortable />
            <el-table-column prop="secondAuthor" label="第二作者" width="120" sortable />
            <el-table-column prop="thirdAuthor" label="第三作者" width="120" sortable />
            <el-table-column prop="CCF" label="CCF分区" width="120" sortable />
            <el-table-column prop="status" label="状态" width="120" sortable />
            <el-table-column label="申请认领" width="120">
                <template #default="scope">
                    <el-button type="primary" @click="claimPaper(scope.row)">申请认领</el-button>
                </template>
            </el-table-column>
    </el-table>
</template>

<script lang="ts" setup name = "ClaimPaperForm">
import { ref } from 'vue'
import { getWithToken } from '@/utils/request';
import { useAuthStore } from '@/stores/auth';
import { errorAlert } from '@/utils/alert';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const DOI = ref("")
const user = authStore.user;
const papers = ref<Array<Paper>>(new Array<Paper>)


const queryPaperWithDOI = () => { 
    const token = user!.token;
    getWithToken('/api/papers/${DOI.value}', token).then((res) => {
        console.log(res);
        if (res.status === 200) {
            papers.value = res.data.papers
        } else if (res.status === 401) {
            errorAlert('请先登录');
            router.push('/login');
        } else {
            errorAlert('该论文不存在');
        }
    });
}

const claimPaper = (paper:Paper) => {
    // TODO
}
</script>