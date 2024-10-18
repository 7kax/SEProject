<template>
    <div class="admin-container">
        <el-table :data="example_users" style="width: 100%">
            <el-table-column prop="id" label="UID" width="120" sortable />
            <el-table-column prop="username" label="用户名" width="180" sortable />
            <el-table-column prop="number" label="学号/工号" width="180" sortable />
            <el-table-column label="密码" width="120">******</el-table-column>
            <el-table-column label="修改用户名" width="180">
                <template #default="scope">
                    <el-button @click="changeUsername(scope.row.id)">修改用户名</el-button>
                </template>
            </el-table-column>
            <el-table-column label="修改密码" width="180">
                <template #default="scope">
                    <el-button @click="changePassword(scope.row.id)">修改密码</el-button>
                </template>
            </el-table-column>
            <el-table-column label="删除用户" width="180">
                <template #default="scope">
                    <el-button type="danger" @click="deleteUser(scope.row.id)">删除用户</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-button type="primary" @click="addUser()">添加用户</el-button>
        <el-button @click="goBack()">返回</el-button>

        <el-dialog v-model="changeUsernameFormVisible" title="修改用户名" width="500">
            <el-form :model="changeUsernameForm">
                <el-form-item label="新用户名" prop="newUsername" required>
                    <el-input v-model="changeUsernameForm.newUsername" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="changeUsernameFormVisible = false">取消</el-button>
                <el-button type="primary"
                    @click="changeUsernameFormVisible = false; changeUsernameRequest();">确定</el-button>
            </template>
        </el-dialog>

        <el-dialog v-model="changePasswordFormVisible" title="修改密码" width="500">
            <el-form :model="changePasswordForm">
                <el-form-item label="新密码" prop="newPassword" required>
                    <el-input v-model="changePasswordForm.newPassword" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="changePasswordFormVisible = false">取消</el-button>
                <el-button type="primary"
                    @click="changePasswordFormVisible = false; changePasswordRequest();">确定</el-button>
            </template>
        </el-dialog>

        <el-dialog v-model="addFormVisible" title="添加用户" width="500">
            <el-form :model="addForm">
                <el-form-item label="用户名" prop="username" required>
                    <el-input v-model="addForm.username" />
                </el-form-item>
                <el-form-item label="学号/工号" prop="number" required>
                    <el-input v-model="addForm.number" />
                </el-form-item>
                <el-form-item label="密码" prop="password" required>
                    <el-input v-model="addForm.password" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click="addFormVisible = false; addRequest();">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import example_users from '@/data/example_users.json';
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();
const changeUsernameFormVisible = ref(false);
const changePasswordFormVisible = ref(false);
const addFormVisible = ref(false);
const UserId = ref(0);
const changeUsernameForm = ref({
    newUsername: ''
});
const changePasswordForm = ref({
    newPassword: ''
});
const addForm = ref({
    username: '',
    number: '',
    password: ''
});

const changeUsername = (id: number) => {
    changeUsernameFormVisible.value = true;
    UserId.value = id;
};
const changeUsernameRequest = () => {
    console.log(UserId.value, changeUsernameForm.value.newUsername);
    ElMessage({
        type: 'success',
        message: '修改成功!'
    });
};
const changePassword = (id: number) => {
    changePasswordFormVisible.value = true;
    UserId.value = id;
};
const changePasswordRequest = () => {
    console.log(UserId.value, changePasswordForm.value.newPassword);
    ElMessage({
        type: 'success',
        message: '修改成功!'
    });
}
const deleteUser = (id: number) => {
    ElMessageBox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        console.log(id);
        ElMessage({
            type: 'success',
            message: '删除成功!'
        });
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '已取消删除'
        });
    });
}
const addUser = () => {
    addFormVisible.value = true;
}
const addRequest = () => {
    console.log(addForm.value);
    ElMessage({
        type: 'success',
        message: '添加成功!'
    });
}
const goBack = () => {
    router.push('/');
}

</script>

<style scoped>
.admin-container {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    height: 100%;
}
</style>