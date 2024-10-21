<template>
    <h1>个人信息</h1>
    <button @click="goHome">返回</button>
    <div>
        <h2>ID:</h2><br>{{ userInfo.username }}
        <h2>密码:******</h2><button @click="showPasswordChangingControls">修改密码</button>
        <h3 v-show="onChangingPassword">输入旧密码
            <input v-model="oldPassword" @input="checkOldPassword">
            <span>{{ oldPasswordMessage }}</span>
        </h3>
        <h3 v-show="onChangingPassword">输入新密码
            <input v-model="newPassword" @input="checkNewPassword">
            <span>{{ newPasswordMessage }}</span>
        </h3>
        <h3 v-show="onChangingPassword">确认新密码
            <input v-model="newPasswordConfirm" @input="checkNewPasswordConfirm">
            <span>{{ newPasswordConfirmMessage }}</span>
        </h3>
        <button @click="handlePasswordChange" v-show="onChangingPassword">确认修改</button>
        <button @click="hidePasswordChangingInputs" v-show="onChangingPassword">取消</button>
        <h2>姓名:<input v-model="userInfo.name" :disabled="!onChangingInfo"></h2>
        <h2>手机:<input v-model="userInfo.phone" :disabled="!onChangingInfo"></h2>
        <h2>邮箱:<input v-model="userInfo.email" :disabled="!onChangingInfo"></h2>
        <h2>住址:<input v-model="userInfo.address" :disabled="!onChangingInfo"></h2>
        <button @click="enableInfoChangingControls" v-show="!onChangingInfo">修改个人信息</button>
        <button @click="handleInfoChanging" v-show="onChangingInfo">保存</button>
        <button @click="disableInfoChangingControls" v-show="onChangingInfo">取消</button>

    </div>
</template>

<script lang="ts" setup>
import { reactive,ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { validPassword } from '@/utils/verify';
import { errorAlert, successAlert } from '@/utils/alert';
import { useRouter } from 'vue-router';
import { postRequest } from '@/utils/request';

const router = useRouter();
const authStore = useAuthStore();

const user = authStore.user

let passWord = ref("")
let oldPassword = ref("")
let oldPasswordMessage = ref("")
let newPassword = ref("")
let newPasswordMessage = ref("")
let newPasswordConfirm = ref("")
let newPasswordConfirmMessage = ref("")
let userInfo = reactive<UserInfo>({
    username: '',
    name: '',
    email: '',
    phone: '',
    address: ''
})
let onChangingPassword = ref(false);
let onChangingInfo = ref(false);

//TODO 向后端获取用户信息
userInfo.username = "1"
userInfo.name = "JohnSmith"
userInfo.phone = "1801231188"
userInfo.email = "21333333333@fudan.edu.cn"
userInfo.address = "松花江路2500号"


//TODO 向后端获取用户密码
passWord.value = "123456"

function showPasswordChangingControls(){
    onChangingPassword.value = true
}

function hidePasswordChangingInputs(){
    onChangingPassword.value = false
    oldPasswordMessage.value = ""
    newPasswordMessage.value = ""
    newPasswordConfirmMessage.value = ""
}

function enableInfoChangingControls(){
    onChangingInfo.value = true
}

function disableInfoChangingControls(){
    onChangingInfo.value = false
}





function checkOldPassword(){
    if(oldPassword.value != passWord.value){
        oldPasswordMessage.value = "请输入正确的密码"
    }
    else{
        oldPasswordMessage.value = "✔"
    }
}

function checkNewPassword(){
    if(validPassword(newPassword.value)){
        newPasswordMessage.value = "合法密码"
    }
    else{
        newPasswordMessage.value = "您的密码不合法！"
    }
}

function checkNewPasswordConfirm(){
    if(newPassword.value != newPasswordConfirm.value){
        newPasswordConfirmMessage.value = "两次输入不一致！"
    }
    else{
        newPasswordConfirmMessage.value = "✔"
    }
}

function handlePasswordChange(){
    //TODO
}

function handleInfoChanging(){
    //TODO
}



function goHome(){
    router.push("/")
}



</script>

<style scoped>
/* TODO */
</style>