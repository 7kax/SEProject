<template>
    <h2>认领请求</h2>
    <el-table :data="claims" style="width: 100%">
        <el-table-column prop="id" label="申请人" width="120" sortable />
        <el-table-column prop="doi" label="DOI" width="120" sortable />
        <el-table-column label="审核" width="120">
            <template #default="scope">
                <el-button type="primary" @click="agree(scope.row)">同意</el-button>
                <el-button type="danger" @click="refuse(scope.row)">拒绝</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { errorAlert, successAlert } from '@/utils/alert';
import { deleteWithToken, getWithToken, postWithToken } from '@/utils/request';
import { onMounted, ref } from 'vue';

const claims = ref<ClaimInfo[]>([]);
const getClaims = () => {
    const url = '/api/papers/request/claim';
    const token = localStorage.getItem('token') as string;
    getWithToken(url, token).then((res) => {
        if (res.status === 200) {
            claims.value = res.data.claims;
        }
    }).catch((err) => {
        errorAlert(err.response.data.message);
    });
};
const deleteClaim = (claim: ClaimInfo) => {
    const id = claim.id;
    const doi = Buffer.from(claim.doi).toString('base64');
    const url = '/api/papers/request/claim?id=' + id + '&doi=' + doi;
    const token = localStorage.getItem('token') as string;
    deleteWithToken(url, token).then((res) => {
        if (res.status === 204) {
            return true;
        }
    }).catch((err) => {
        errorAlert(err.response.data.message);
        return false;
    });
    return false;
};
const addAuthorship = (claim: ClaimInfo) => {
    const id = claim.id;
    const doi = Buffer.from(claim.doi).toString('base64');
    const url = '/api/papers/author?id=' + id + '&doi=' + doi;
    const token = localStorage.getItem('token') as string;
    postWithToken(url, {}, token).then((res) => {
        if (res.status === 200) {
            return true;
        }
    }).catch((err) => {
        errorAlert(err.response.data.message);
        return false;
    });
    return false;
}

onMounted(() => {
    getClaims();
});

const agree = (claim: ClaimInfo) => {
    if (deleteClaim(claim) && addAuthorship(claim)) {
        successAlert('认领成功');
        getClaims();
    }
};
const refuse = (claim: ClaimInfo) => {
    if (deleteClaim(claim)) {
        successAlert('已拒绝');
        getClaims();
    }
};
</script>

<style scoped></style>