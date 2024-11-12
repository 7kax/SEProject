<template>
    <h2>删除请求</h2>
    <el-table :data="deletes" fit>
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
import { deleteWithToken, getWithToken } from '@/utils/request';
import { onMounted, ref } from 'vue';

const deletes = ref<DeleteInfo[]>([]);
const getDeletes = () => {
    const url = '/api/papers/request/delete';
    const token = localStorage.getItem('token') as string;
    getWithToken(url, token).then((res) => {
        if (res.status === 200) {
            deletes.value = res.data.deletes;
        }
    }).catch((err) => {
        errorAlert(err.response.data.message);
    });
};
const removeDelete = (Delete: DeleteInfo) => {
    const id = Delete.id;
    const doi = Buffer.from(Delete.doi).toString('base64');
    const url = `/api/papers/request/delete?id=${id}&doi=${doi}`;
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
const deletePaper = (doi: string) => {
    doi = Buffer.from(doi).toString('base64');
    const url = `/api/papers/${doi}`;
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
}

onMounted(() => {
    getDeletes();
});

const agree = (Delete: DeleteInfo) => {
    if (deletePaper(Delete.doi) && removeDelete(Delete)) {
        successAlert('认领成功');
        getDeletes();
    }
};
const refuse = (Delete: DeleteInfo) => {
    if (removeDelete(Delete)) {
        successAlert('已拒绝');
        getDeletes();
    }
};
</script>

<style scoped></style>