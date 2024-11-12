<!-- 管理员处理请求的页面 -->
<!-- 目前有: 草稿审核、请求删除、认领申请 -->
<template>
    <h2>认领请求</h2>
    <el-table :data="claims" style="width: 100%">
        <el-table-column prop="id" label="申请人" width="120" sortable />
        <el-table-column prop="doi" label="DOI" width="120" sortable />
        <el-table-column label="审核" width="120">
            <template #default="scope">
                <el-button type="primary" @click="audit(scope.row)">申请认领</el-button>
            </template>
        </el-table-column>
    </el-table>

    <br>
    <h2>删除请求</h2>
    <el-table :data="deletes" style="width: 100%">
        <el-table-column prop="id" label="申请人" width="120" sortable />
        <el-table-column prop="doi" label="DOI" width="120" sortable />
        <el-table-column label="审核" width="120">
            <template #default="scope">
                <el-button type="primary" @click="audit(scope.row)">申请认领</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getWithToken, } from '@/utils/request';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { errorAlert, } from '@/utils/alert';

const authStore = useAuthStore();
const router = useRouter();


const user = authStore.user;

// enum ApplicationType {
//     Claim = '认领',
//     Delete = '删除'
// }


interface Application {
    id : string,
    // name: string,
    doi: string,
    // title: string,
    // firstAuthor: string,
    // type: ApplicationType

}


const claims = ref(new Array<Application>)
const deletes = ref(new Array<Application>)

onMounted(() => {
    const urlGetClaim = '/api/papers/request/claim'
    const urlGetDelete = '/api/papers/request/delete'
    const token = user!.token;

    getWithToken(urlGetClaim,token).then((res) => {
        console.log(res);
        if (res.status === 200) {
            claims.value = res.data.claims
        } else if (res.status === 401) {
            errorAlert('请先登录');
            router.push('/login');
        }
    })

    getWithToken(urlGetDelete,token).then((res) => {
        console.log(res);
        if (res.status === 200) {
            deletes.value = res.data.deletes
        } else if (res.status === 401) {
            errorAlert('请先登录');
            router.push('/login');
        }
    })


})

const audit = ( application : Application) => {
// TODO
}


</script>