<!-- 用户认领论文的表单 -->
<template>
    <h1>论文认领</h1>
    <div id="searchDiv">请输入查询的DOI<input id="searchInput" v-model="DOI"><el-button type="primary" @click="queryPaperWithDOI">查找</el-button></div>
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

<script lang="ts" setup name="ClaimPaperForm">
import { ref } from 'vue'
import { fetchPaper } from '@/requests/paper';
import { addClaim } from '@/requests/application';
import { useAuthStore } from '@/stores/auth';
import { errorAlert, successAlert } from '@/utils/alert';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const DOI = ref("")
const user = authStore.user;
const papers = ref<Paper[]>([])


const queryPaperWithDOI = () => {
    const params = {
        id: user?.id || "",
        doi: DOI.value,
    };

    fetchPaper(params).then((_res) => {
        papers.value = _res.papers;
    }).catch((err) => {
        errorAlert(err.response.data.message);
    });
}

const claimPaper = (paper: Paper) => {
    // const url = '/api/papers/request/claim'
    // const token = user!.token;
    // const data = JSON.stringify({ doi: paper.DOI })
    // postWithToken(url, data, token).then((res) => {
    //     console.log(res);
    //     if (res.status === 200) {
    //         successAlert('申请成功，请在用户论文列表查看审批进程')
    //     } else if (res.status === 401) {
    //         errorAlert('请先登录');
    //         router.push('/login');
    //     } else {
    //         errorAlert('论文信息错误，请联系管理员');
    //     }
    // })
    const params = {
        doi: paper.DOI
    }
    addClaim(params).then((_res) => {
        if (_res.status === 200) {
            successAlert('申请成功，请在用户论文列表查看审批进程');
            router.push("/user/paper_list");
        } else if (_res.status === 401) {
            errorAlert('请先登录');
            router.push('/login');
        } else {
            errorAlert('论文信息错误，请联系管理员');
        }
    }).catch((err) => {
        errorAlert(err.response.data.message);
    });
}

</script>

<style scoped>
#searchDiv{
    margin-top: 20px;
    margin-bottom: 20px;
}
#searchInput{
    margin-left: 20px;
    margin-right: 20px;
}
</style>