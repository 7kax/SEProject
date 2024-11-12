<template>
    <div class="user-form">
        <el-form :model="userForm" ref="formRef" :rules="rules" label-width="120px">
            <el-form-item label="学号/工号" prop="id">
                <el-input v-model="userForm.id" placeholder="输入学号/工号" :disabled="disableId" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="userForm.name" placeholder="输入姓名" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="userForm.email" placeholder="输入邮箱" />
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="userForm.phone" placeholder="输入电话" />
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="userForm.address" placeholder="输入地址" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { ElForm } from 'element-plus';
import { validID } from '@/utils/verify';

const emits = defineEmits(['submit']);

const userForm = defineModel<UserInfo>('user', { required: true });
const disableId = defineModel<boolean>('disableId', { required: true });
const formRef = ref<InstanceType<typeof ElForm> | null>(null);

const rules = {
    id: [
        { required: true, message: '请输入学号/工号', trigger: 'blur' },
        {
            validator: (_rule: any, value: string, callback: any) => {
                if (!validID(value)) {
                    callback(new Error('学号/工号格式错误'));
                } else {
                    callback();
                }
            }, trigger: 'blur',
        },
    ],
    name: [
        { required: false, message: '请输入姓名', trigger: 'blur' },
    ],
    email: [
        { required: false, message: '请输入邮箱', trigger: 'blur' },
    ],
    phone: [
        { required: false, message: '请输入电话', trigger: 'blur' },
    ],
    address: [
        { required: false, message: '请输入地址', trigger: 'blur' },
    ],
};

const submitForm = () => {
    if (formRef.value) {
        formRef.value.validate((valid: boolean) => {
            if (valid) {
                emits('submit');
            }
        });
    }
};

const resetForm = () => {
    if (formRef.value) {
        formRef.value.resetFields();
    }
};
</script>

<style scoped></style>