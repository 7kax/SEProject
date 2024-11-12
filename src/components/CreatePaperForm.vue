<!-- 创建论文所用的表单 -->
<template>
    <el-form :model="paperForm" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="DOI" prop="DOI" :disabled="disableDOI">
            <el-input v-model="paperForm.DOI"></el-input>
        </el-form-item>

        <el-form-item label="论文标题" prop="title">
            <el-input v-model="paperForm.title"></el-input>
        </el-form-item>

        <el-form-item label="一作列表">
            <div v-for="(_, index) in paperForm.firstAuthor" :key="index">
                <el-input v-model="paperForm.firstAuthor[index]" placeholder="输入一作者姓名"></el-input>
                <el-button type="danger" @click="removeElement(paperForm.firstAuthor, index)">移除</el-button>
            </div>
            <el-button type="primary" @click="addElement(paperForm.firstAuthor)">添加一作者</el-button>
        </el-form-item>

        <el-form-item label="二作列表">
            <div v-for="(_, index) in paperForm.secondAuthor" :key="index">
                <el-input v-model="paperForm.secondAuthor[index]" placeholder="输入二作者姓名"></el-input>
                <el-button type="danger" @click="removeElement(paperForm.secondAuthor, index)">移除</el-button>
            </div>
            <el-button type="primary" @click="addElement(paperForm.secondAuthor)">添加二作者</el-button>
        </el-form-item>

        <el-form-item label="三作列表">
            <div v-for="(_, index) in paperForm.thirdAuthor" :key="index">
                <el-input v-model="paperForm.thirdAuthor[index]" placeholder="输入三作者姓名"></el-input>
                <el-button type="danger" @click="removeElement(paperForm.thirdAuthor, index)">移除</el-button>
            </div>
            <el-button type="primary" @click="addElement(paperForm.thirdAuthor)">添加三作者</el-button>
        </el-form-item>

        <el-form-item label="CCF分区" prop="CCF">
            <el-select v-model="paperForm.CCF" placeholder="请选择CCF分区">
                <el-option label="A" value="A"></el-option>
                <el-option label="B" value="B"></el-option>
                <el-option label="C" value="C"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="额外字段">
            <div v-for="(field, index) in paperForm.additional" :key="index">
                <el-input v-model="field.key" placeholder="键" style="width: 100px;"></el-input>
                <el-input v-model="field.value" placeholder="值"></el-input>
                <el-button type="danger" @click="removeAdditional(index)">移除</el-button>
            </div>
            <el-button type="primary" @click="addAdditional">添加额外字段</el-button>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="handleSaveDraft">保存草稿</el-button>
            <el-button type="success" @click="handleSubmit">正式提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElForm } from 'element-plus';
import { errorAlert, successAlert } from '@/utils/alert';
import { postWithToken } from '@/utils/request';

const emits = defineEmits(['submit']);
const paperForm = defineModel<Paper>('paper', { required: true });
const disableDOI = defineModel<boolean>('disableDOI', { required: true });
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const rules = {
    DOI: [
        { required: true, message: 'DOI是必填项', trigger: 'blur' },
    ],
};

const removeElement = (array: string[], index: number) => {
    array.splice(index, 1);
};
const addElement = (array: string[]) => {
    array.push('');
};
const removeAdditional = (index: number) => {
    paperForm.value.additional.splice(index, 1);
};
const addAdditional = () => {
    paperForm.value.additional.push({ key: '', value: '' });
};

const handleSaveDraft = () => {
    if (!formRef.value) {
        return;
    }
    formRef.value.validate((valid) => {
        if (valid) {
            const url = '/api/papers';
            const data = JSON.stringify(paperForm.value);
            const token = localStorage.getItem('token') as string;
            postWithToken(url, data, token).then((res) => {
                if (res.status === 200) {
                    successAlert('保存草稿成功');
                    emits('submit');
                }
            }).catch((err) => {
                errorAlert(err.response.data.message);
            });
        } else {
            errorAlert('表单验证失败');
        }
    });
};

// 提交前保证必填项不为空
// 如果验证通过, 将状态改为已提交
const validateSubmit = () => {
    if (paperForm.value.title.trim() === '') {
        errorAlert('论文标题是必填项');
        return false;
    }
    if (paperForm.value.firstAuthor.length === 0) {
        errorAlert('至少需要一名一作者');
        return false;
    }
    paperForm.value.status = 'review';
    return true;
}

const handleSubmit = () => {
    if (!formRef.value) {
        return;
    }
    formRef.value.validate((valid) => {
        if (valid && validateSubmit()) {
            const url = '/api/papers';
            const data = JSON.stringify(paperForm.value);
            const token = localStorage.getItem('token') as string;
            postWithToken(url, data, token).then((res) => {
                if (res.status === 200) {
                    successAlert('提交成功');
                    emits('submit');
                } else {
                    errorAlert('提交失败');
                    errorAlert(res.data.message);
                }
            });
        } else {
            errorAlert('表单验证失败');
        }
    });
}
</script>

<style scoped>
.el-form-item {
    margin-bottom: 20px;
}

.el-button {
    margin-right: 10px;
}
</style>