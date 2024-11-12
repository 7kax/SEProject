<template>
    <h2>认领请求</h2>
    <el-table :data="claims" fit>
        <el-table-column prop="id" label="申请人" sortable />
        <el-table-column prop="doi" label="DOI" sortable />
        <el-table-column label="审核" width="240">
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
const deleteClaim = async (claim: ClaimInfo) => {
    const id = claim.id;
    const doi = Buffer.from(claim.doi).toString('base64');
    const url = '/api/papers/request/claim?id=' + id + '&doi=' + doi;
    const token = localStorage.getItem('token') as string;
    var flag = false;
    await deleteWithToken(url, token).then((res) => {
        if (res.status === 204) {
            flag = true;
        }
    }).catch((err) => {
        errorAlert(err.response.data.message);
    });
    return flag;
};
const addAuthorship = async (claim: ClaimInfo) => {
    const id = claim.id;
    const doi = Buffer.from(claim.doi).toString('base64');
    const url = `/api/papers/author?id=${id}&doi=${doi}`;
    const token = localStorage.getItem('token') as string;
    var flag = false;
    await postWithToken(url, {}, token).then((res) => {
        if (res.status === 200) {
            flag = true;
        }
    }).catch((err) => {
        errorAlert(err.response.data.message);
    });
    return flag;
}

onMounted(() => {
    getClaims();
});

const agree = async (claim: ClaimInfo) => {
    if (await addAuthorship(claim) && await deleteClaim(claim)) {
        successAlert('认领成功');
        getClaims();
    }
};
const refuse = async (claim: ClaimInfo) => {
    if (await deleteClaim(claim)) {
        successAlert('已拒绝');
        getClaims();
    }
};
</script>

<style scoped></style>