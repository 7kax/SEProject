<!-- 用户看到的论文列表, 只显示自己的论文 -->
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
                <el-table-column label="状态">
                    <template #default="scope">
                        <el-tag :type="getStatusType(scope.row.status)">{{ statusNames(scope.row.status) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="编辑" width="100">
                    <template #default="scope">
                        <el-button :disabled="!isEditable(scope.row.status)" type="primary"
                            @click="editPaper(scope.$index)">编辑</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="请求删除" width="100">
                    <template #default="scope">
                        <el-button :disabled="!canRequestDelete(scope.row.status)" type="danger"
                            @click="requestDelete(scope.$index)">请求删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="编辑" :visible.sync="isEditing" width="30%" @close="closeEditDialog">
                <CreatePaperForm :paper="selectedPaper" @submit="submitEdit" />
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { deleteWithToken, getWithToken } from '@/utils/request';
import { onMounted, ref } from 'vue';
import CreatePaperForm from '@/components/CreatePaperForm.vue';
import { ElMessageBox } from 'element-plus';
import { errorAlert, infoAlert, successAlert } from '@/utils/alert';

// 组件挂载时, 向后端请求论文数据
const papers = ref<Paper[]>([]);
const refreshPapers = () => {
    const id = JSON.parse(localStorage.getItem('user') as string).id;
    const url = `/api/papers/${id}`;
    const token = localStorage.getItem('token') as string;
    getWithToken(url, token).then((res) => {
        papers.value = res.data.papers;
    });
};
onMounted(async () => {
    refreshPapers();
})

const getStatusType = (status: Status) => {
    switch (status) {
        case Status.NotSubmit:
            return 'info';
        case Status.Review:
            return 'warning';
        case Status.Approve:
            return 'success';
        case Status.Reject:
            return 'danger';
    }
};

const statusNames = (status: Status) => {
    switch (status) {
        case Status.NotSubmit:
            return '未提交';
        case Status.Review:
            return '审核中';
        case Status.Approve:
            return '审核通过';
        case Status.Reject:
            return '驳回';
    }
};

const isEditable = (status: Status) => {
    return status === Status.NotSubmit || status === Status.Reject;
};

const canRequestDelete = (status: Status) => {
    return status === Status.Approve;
};

const isEditing = ref(false);
const selectedPaper = ref<Paper>({} as Paper);

const editPaper = (index: number) => {
    isEditing.value = true;
    selectedPaper.value = { ...papers.value[index] };
};

const closeEditDialog = () => {
    isEditing.value = false;
    selectedPaper.value = {} as Paper;
};

const submitEdit = () => {
    closeEditDialog();
    refreshPapers();
};

const requestDelete = (index: number) => {
    ElMessageBox.confirm('确认请求删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        const doi = papers.value[index].DOI;
        const url = `/api/papers/${doi}`;
        const token = localStorage.getItem('token') as string;
        deleteWithToken(url, token).then((res) => {
            if (res.status === 204) {
                successAlert('请求删除成功');
            } else {
                errorAlert('请求删除失败');
            }
        })
    }).catch(() => {
        infoAlert('已取消删除');
    });
};
</script>

<style scoped>
/* 添加一些自定义样式 */
</style>