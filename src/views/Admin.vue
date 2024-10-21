<template>
    <div class="admin-container">
        <el-table :data="users" style="width: 100%">
            <el-table-column prop="id" label="学号/工号" width="120" sortable />
            <el-table-column prop="name" label="姓名" width="120" sortable />
            <el-table-column prop="email" label="邮箱" width="120" sortable />
            <el-table-column prop="phone" label="电话" width="120" sortable />
            <el-table-column prop="address" label="地址" width="120" sortable />
            <el-table-column label="编辑用户" width="120">
                <template #default="scope">
                    <el-button type="primary" @click="modifyUser(scope.row)">编辑用户</el-button>
                </template>
            </el-table-column>
            <el-table-column label="重置密码" width="120">
                <template #default="scope">
                    <el-button type="warning" @click="resetPassword(scope.row)">修改密码</el-button>
                </template>
            </el-table-column>
            <el-table-column label="删除用户" width="120">
                <template #default="scope">
                    <el-button type="danger" @click="deleteUser(scope.row)">删除用户</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-button type="primary" @click="addUser()">添加用户</el-button>
        <el-button @click="goBack()">返回</el-button>

        <el-dialog v-model="modifyUserFormVisible" title="编辑用户" width="500">
            <UserForm v-model="userForm" @submit="modifyUserRequest()" :disableId="true" />
        </el-dialog>

        <el-dialog v-model="resetPasswordFormVisible" title="重置密码" width="500">
            <el-form :model="resetPasswordForm" :rules="passwordRules">
                <el-form-item label="新密码" prop="newPassword" required>
                    <el-input v-model="resetPasswordForm.newPassword" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="resetPasswordFormVisible = false">取消</el-button>
                <el-button type="primary" @click="resetPasswordRequest();">确定</el-button>
            </template>
        </el-dialog>

        <el-dialog v-model="addFormVisible" title="添加用户" width="500">
            <UserForm v-model="userForm" @submit="addRequest" :disableId="false" />
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import example_users from '@/data/example_users.json';
import example_user from '@/data/example_user.json';
import { ref, onMounted } from 'vue';
import { ElMessageBox } from 'element-plus';
import { errorAlert, successAlert, infoAlert } from '@/utils/alert';
import { useRouter } from 'vue-router';
import { deleteWithToken, getWithToken, patchWithToken, postWithToken } from '@/utils/request';
import { validPassword } from '@/utils/verify';

const router = useRouter();

// 进入网页时, 向后端请求所有用户信息
const users = ref<UserInfo[]>(example_users);
onMounted(() => {
    const token = localStorage.getItem('token') as string;
    getWithToken('/api/admin', token).then((res) => {
        if (res.status === 200) {
            users.value = res.data.users;
        } else if (res.status === 401 || res.status === 403) {
            errorAlert(res.data.message);
        } else {
            errorAlert('获取用户信息失败');
        }
    });
});

// 用于缓存选中行的用户信息, 以及便于编辑用户信息
const userForm = ref<UserInfo>(example_user);

// 编辑用户相关逻辑
// 控制编辑用户对话框的显示
const modifyUserFormVisible = ref(false);
// 点击编辑用户按钮时, 将选中行的用户信息填充到表单中, 并显示编辑用户对话框
const modifyUser = (user: UserInfo) => {
    userForm.value = { ...user };
    modifyUserFormVisible.value = true;
};
// 在编辑用户对话框中点击确定时, 发送请求
const modifyUserRequest = () => {
    const data = {
        user: userForm.value,
    };
    const token = localStorage.getItem('token') as string;
    patchWithToken('/api/admin/user', data, token).then((res) => {
        if (res.status === 200) {
            successAlert('修改用户信息成功');
            modifyUserFormVisible.value = false;
        } else if (res.status === 400 || res.status === 401 || res.status === 403 || res.status === 404) {
            errorAlert(res.data.message);
        } else {
            errorAlert('修改用户信息失败');
        }
    });
};

// 重置密码相关逻辑
// 校验密码格式
const passwordRules = {
    newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        {
            validator: (_rule: any, value: string, callback: any) => {
                if (!validPassword(value)) {
                    callback(new Error('密码格式错误'));
                } else {
                    callback();
                }
            }, trigger: 'blur',
        },
    ],
};
// 控制重置密码对话框的显示
const resetPasswordFormVisible = ref(false);
// 用于缓存选中行的用户信息, 以及便于重置密码
const resetPasswordForm = ref({ newPassword: '' });
// 点击重置密码按钮时, 显示重置密码对话框
const resetPassword = (user: UserInfo) => {
    userForm.value = { ...user };
    resetPasswordFormVisible.value = true;
};
// 在重置密码对话框中点击确定时, 发送请求
const resetPasswordRequest = () => {
    const data = {
        id: userForm.value.id,
        newPassword: resetPasswordForm.value.newPassword,
    };
    const token = localStorage.getItem('token') as string;
    patchWithToken('/api/admin/user/password', data, token).then((res) => {
        if (res.status === 200) {
            successAlert('重置密码成功');
            resetPasswordFormVisible.value = false;
        } else if (res.status === 400 || res.status === 401 || res.status === 403 || res.status === 404) {
            errorAlert(res.data.message);
        } else {
            errorAlert('重置密码失败');
        }
    });
};

// 删除用户相关逻辑
const deleteUser = (user: UserInfo) => {
    ElMessageBox.confirm('确定删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        const token = localStorage.getItem('token') as string;
        deleteWithToken(`/api/admin/user/${user.id}`, token).then((res) => {
            if (res.status === 204) {
                successAlert('删除用户成功');
            } else if (res.status === 401 || res.status === 403 || res.status === 404) {
                errorAlert(res.data.message);
            } else {
                errorAlert('删除用户失败');
            }
        });
    }).catch(() => {
        infoAlert('已取消删除');
    });
};

// 添加用户相关逻辑
// 控制添加用户对话框的显示
const addFormVisible = ref(false);
// 点击添加用户按钮时, 显示添加用户对话框
const addUser = () => {
    userForm.value = {} as UserInfo;
    addFormVisible.value = true;
};
// 在添加用户对话框中点击确定时, 发送请求
const addRequest = () => {
    const data = userForm.value;
    const token = localStorage.getItem('token') as string;
    postWithToken('/api/admin/user', data, token).then((res) => {
        if (res.status === 201) {
            successAlert('添加用户成功');
            addFormVisible.value = false;
        } else if (res.status === 400 || res.status === 401 || res.status === 403 || res.status === 404) {
            errorAlert(res.data.message);
        } else {
            errorAlert('添加用户失败');
        }
    });
};

// 返回按钮逻辑
const goBack = () => {
    router.push('/');
};

</script>

<style scoped>
.admin-container {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    height: 100%;
}
</style>