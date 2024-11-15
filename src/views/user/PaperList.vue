<!-- 用户看到的论文列表, 只显示自己的论文 -->
<template>
    <el-container>
        <el-header>论文列表</el-header>
        <el-main>
            <el-table :data="papers" fit>
                <el-table-column prop="title" label="论文标题"></el-table-column>
                <el-table-column prop="author" label="作者">
                    <template #default="scope">
                        <span
                            v-for="(author, index) in [...scope.row.firstAuthor, ...scope.row.secondAuthor, ...scope.row.thirdAuthor]"
                            :key="index">
                            {{ index > 0 ? ', ' : '' }}{{ author }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="CCF" label="CCF分级" width="120"></el-table-column>
                <el-table-column prop="status" label="状态" width="120">
                    <template #default="scope">
                        <el-tag :type="getStatusType(scope.row.status)">{{ statusNames(scope.row.status) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="编辑" width="120">
                    <template #default="scope">
                        <el-button :disabled="!isEditable(scope.row.status)" type="primary"
                            @click="editPaper(scope.$index)">编辑</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="请求删除" width="120">
                    <template #default="scope">
                        <el-button :disabled="!canRequestDelete(scope.row.status)" type="danger"
                            @click="requestDelete(scope.$index)">请求删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" @click="addPaper">添加论文</el-button>
        </el-main>
    </el-container>
    <el-dialog title="编辑" v-model="isEditing" @close="closeEditDialog">
        <CreatePaperForm :paper="selectedPaper" :disableDOI="true" @submit="submitEdit" />
    </el-dialog>
    <el-dialog title="添加" v-model="isAdding" @close="closeAddDialog">
        <CreatePaperForm :paper="newPaper" :disableDOI="false" @submit="submitAdd" />
    </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CreatePaperForm from '@/components/CreatePaperForm.vue';
import { ElMessageBox } from 'element-plus';
import { errorAlert, infoAlert, successAlert } from '@/utils/alert';
import { fetchPaper } from '@/requests/paper';
import { addDelete } from '@/requests/application';

// 组件挂载时, 向后端请求论文数据
const papers = ref<Paper[]>([]);
const refreshPapers = () => {
    // const id = JSON.parse(localStorage.getItem('user') as string).id;
    // const url = `/api/papers?id=${id}&doi`;
    // const token = localStorage.getItem('token') as string;
    // getWithToken(url, token).then((res) => {
    //     papers.value = res.data.papers;
    // });

    const params = {
        id: '',
        doi: '',
    };

    fetchPaper(params).then((res) => {
        papers.value = res.papers;
    }).catch((err) => {
        errorAlert(err.response.data.message);
    });
};
onMounted(async () => {
    refreshPapers();
})

const getStatusType = (status: string) => {
    switch (status) {
        case 'notSubmit':
            return 'info';
        case 'review':
            return 'warning';
        case 'approve':
            return 'success';
        case 'reject':
            return 'danger';
    }
};

const statusNames = (status: string) => {
    switch (status) {
        case 'notSubmit':
            return '未提交';
        case 'review':
            return '审核中';
        case 'approve':
            return '审核通过';
        case 'reject':
            return '驳回';
    }
};

const isEditable = (status: string) => {
    return status === 'notSubmit' || status === 'reject';
};

const canRequestDelete = (status: string) => {
    return status === 'approve';
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
        // const doi = Buffer.from(papers.value[index].DOI).toString('base64');
        // const url = '/api/papers/request/delete?doi=' + doi;
        // const token = localStorage.getItem('token') as string;
        // postWithToken(url, '', token).then((res) => {
        //     if (res.status === 201) {
        //         successAlert('请求删除成功');
        //     }
        // }).catch((err) => {
        //     errorAlert(err.response.data.message);
        // });

        addDelete({ doi: papers.value[index].DOI }).then((_res) => {
            successAlert('请求删除成功');
        }).catch((err) => {
            errorAlert(err.response.data.message);
        });
    }).catch(() => {
        infoAlert('已取消删除');
    });
};

const isAdding = ref(false);
const newPaper = ref<Paper>({} as Paper);

const addPaper = () => {
    isAdding.value = true;
    newPaper.value = {
        DOI: '',
        title: '',
        firstAuthor: [],
        secondAuthor: [],
        thirdAuthor: [],
        CCF: 'A',
        status: 'notSubmit',
        additional: []
    };
};
const closeAddDialog = () => {
    isAdding.value = false;
    newPaper.value = {
        DOI: '',
        title: '',
        firstAuthor: [],
        secondAuthor: [],
        thirdAuthor: [],
        CCF: 'A',
        status: 'notSubmit',
        additional: []
    };
};
const submitAdd = () => {
    closeAddDialog();
    refreshPapers();
};
</script>

<style scoped>
/* 添加一些自定义样式 */
</style>