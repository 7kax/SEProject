<template>
    <el-container>
        <el-header>用户列表</el-header>
        <el-main>
            <el-table :data="users" fit>
                <el-table-column prop="id" label="学号/工号" sortable />
                <el-table-column prop="name" label="姓名" sortable />
                <el-table-column prop="email" label="邮箱" sortable />
                <el-table-column prop="phone" label="电话" sortable />
                <el-table-column prop="address" label="地址" sortable />
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
            <el-button type="primary" @click="doAddUser()">添加用户</el-button>
        </el-main>
    </el-container>
    <el-dialog v-model="modifyUserFormVisible" title="编辑用户" width="500">
        <ProfileForm :user="userForm" @submit="modifyUserRequest()" :disableId="true" />
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
        <!-- <ProfileForm :user="userForm" @submit="addRequest" :disableId="false" /> -->
        <AuthForm :user="userToAdd" @submit="addRequest" />
    </el-dialog>
</template>

<script lang="ts" setup>
import example_users from '@/data/example_users.json';
import example_user from '@/data/example_user.json';
import { ref, onMounted } from 'vue';
import { ElMessageBox } from 'element-plus';
import { errorAlert, successAlert, infoAlert } from '@/utils/alert';
import { validPassword } from '@/utils/verify';
import ProfileForm from '@/components/ProfileForm.vue';
import AuthForm from '@/components/AuthForm.vue';
import { addUser, fetchUsers, removeUser, updatePassword, updateUser } from '@/requests/user';

// 进入网页时, 向后端请求所有用户信息
const users = ref<UserInfo[]>(example_users);
const getUsers = () => {
    // const url = '/api/users';
    // const token = localStorage.getItem('token') as string;
    // getWithToken(url, token).then((res) => {
    //     if (res.status === 200) {
    //         users.value = res.data.users;
    //     }
    // }).catch((err) => {
    //     errorAlert(err.response.data.message);
    // });

    fetchUsers().then((res) => {
        users.value = res.users;
    }).catch((err) => {
        errorAlert(err.response.data.message);
    });
};
onMounted(() => {
    getUsers();
});

// 用于缓存选中行的用户信息, 以及便于编辑用户信息
const userForm = ref<UserInfo>(example_user);

// 编辑用户相关逻辑
// 控制编辑用户对话框的显示
const modifyUserFormVisible = ref(false);
// 点击编辑用户按钮时, 将选中行的用户信息填充到表单中, 并显示编辑用户对话框
const modifyUser = (user: UserInfo) => {
    userForm.value.id = user.id;
    userForm.value.name = user.name;
    userForm.value.email = user.email;
    userForm.value.phone = user.phone;
    userForm.value.address = user.address;
    modifyUserFormVisible.value = true;
};
// 在编辑用户对话框中点击确定时, 发送请求
const modifyUserRequest = () => {
    // const url = `/api/users/${userForm.value.id}`;
    // const data = JSON.stringify(userForm.value);
    // const token = localStorage.getItem('token') as string;
    // patchWithToken(url, data, token).then((res) => {
    //     if (res.status === 200) {
    //         successAlert('修改用户信息成功');
    //         modifyUserFormVisible.value = false;
    //         getUsers();
    //     }
    // }).catch((err) => {
    //     errorAlert(err.response.data.message);
    // });

    updateUser(userForm.value).then((_res) => {
        successAlert('修改用户信息成功');
        modifyUserFormVisible.value = false;
        getUsers();
    }).catch((err) => {
        errorAlert(err.response.data.message);
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
    // const url = `/api/users/${userForm.value.id}/password`;
    const data = {
        oldPassword: '',
        newPassword: resetPasswordForm.value.newPassword,
    };
    // const token = localStorage.getItem('token') as string;
    // patchWithToken(url, data, token).then((res) => {
    //     if (res.status === 200) {
    //         successAlert('重置密码成功');
    //         resetPasswordFormVisible.value = false;
    //     }
    // }).catch((err) => {
    //     errorAlert(err.response.data.message);
    // });

    updatePassword(data, { id: userForm.value.id }).then((_res) => {
        successAlert('重置密码成功');
        resetPasswordFormVisible.value = false;
    }).catch((err) => {
        errorAlert(err.response.data.message);
    });
};

// 删除用户相关逻辑
const deleteUser = (user: UserInfo) => {
    ElMessageBox.confirm('确定删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        // const url = `/api/users/${user.id}`;
        // const token = localStorage.getItem('token') as string;
        // deleteWithToken(url, token).then((res) => {
        //     if (res.status === 204) {
        //         successAlert('删除用户成功');
        //         getUsers();
        //     }
        // }).catch((err) => {
        //     errorAlert(err.response.data.message);
        // });

        removeUser({ id: user.id }).then((_res) => {
            successAlert('删除用户成功');
            getUsers();
        }).catch((err) => {
            errorAlert(err.response.data.message);
        });
    }).catch(() => {
        infoAlert('已取消删除');
    });
};

// 添加用户相关逻辑
// 用于缓存添加用户的信息
const userToAdd = ref<{ id: string, password: string }>({ id: '', password: '' });
// 控制添加用户对话框的显示
const addFormVisible = ref(false);
// 点击添加用户按钮时, 显示添加用户对话框
const doAddUser = () => {
    // userForm.value = {} as UserInfo;
    userToAdd.value = { id: '', password: '' };
    addFormVisible.value = true;
};
// 在添加用户对话框中点击确定时, 发送请求
const addRequest = () => {
    // const url = '/api/users';
    // const data = JSON.stringify(userToAdd.value);
    // const token = localStorage.getItem('token') as string;
    // postWithToken(url, data, token).then((res) => {
    //     if (res.status === 201) {
    //         successAlert('添加用户成功');
    //         addFormVisible.value = false;
    //         getUsers();
    //     }
    // }).catch((err) => {
    //     errorAlert(err.response.data.message);
    // });

    addUser(userToAdd.value).then((_res) => {
        successAlert('添加用户成功');
        addFormVisible.value = false;
        getUsers();
    }).catch((err) => {
        errorAlert(err.response.data.message);
    });
};
</script>

<style scoped></style>