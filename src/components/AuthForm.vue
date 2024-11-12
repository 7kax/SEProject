<template>
    <div class="auth-form">
        <el-form :model="user" :rules="rules" label-width="120px" ref="formRef">
            <el-form-item label="学号/工号" prop="id">
                <el-input v-model="user.id" placeholder="输入学号/工号" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="user.password" placeholder="输入密码" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
                <el-button @click="resetForm(formRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FormInstance } from 'element-plus';

const user = defineModel<{ id: string, password: string }>('user', { required: true });
const emits = defineEmits(['submit']);
const formRef = ref<FormInstance>();

const rules = {
    id: [
        { required: true, message: '请输入学号/工号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
};

const submitForm = (formRef: FormInstance | undefined) => {
    if (!formRef) return;
    formRef.validate().then((valid) => {
        if (valid) {
            emits('submit');
        }
    });
};

const resetForm = (formRef: FormInstance | undefined) => {
    if (!formRef) return;
    formRef.resetFields();
};
</script>

<style scoped></style>