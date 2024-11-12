<!-- 审核详情页 -->
<template>
    <button @click="backToRequests">返回</button>
    <h1>审核申请</h1>
    <br>
    <h3>申请人:{{ applier?.name }}</h3>
    <h3>申请人工号:{{ applier?.name }}</h3>
    <h3>申请类型：{{ route.query.type }}</h3>
    <h3>论文标题:{{ paper?.title }}</h3>
    <h3>DOI:{{ paper?.DOI }}</h3>
    <h3>第一作者:{{ paper?.firstAuthor }}</h3>
    <h3>第二作者:{{ paper?.secondAuthor }}</h3>
    <h3>第三作者:{{ paper?.thirdAuthor }}</h3>
    <h3>CCF分区:{{ paper?.CCF }}</h3>

    <button @click="approve">通过</button>
    <button @click="reject">驳回</button>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { deleteWithToken, getWithToken, postWithToken, } from '@/utils/request';
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';
import { errorAlert, successAlert } from '@/utils/alert';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const user = authStore.user;

const applier = ref<UserInfo>()
const paper = ref<Paper>()

onMounted(() => {
    const token = user!.token;
    getWithToken('/api/users/${route.query.id}', token).then((res) => {
        if (res.status === 200) {
            applier.value = res.data.user
        } else if (res.status === 401) {
            errorAlert('请先登录');
            router.push('/login');
        } else if (res.data === 404){
            errorAlert('用户数据出错');
        }
    })

    getWithToken('/api/papers/${claimData.doi}', token).then((res) => {
        if (res.status === 200) {
            paper.value = res.data.papers[0]
        } else if (res.status === 401) {
            errorAlert('请先登录');
            router.push('/login');
        } else {
            errorAlert('论文数据出错');
        }
    });

})


const backToRequests = () => {
    router.push('/admin/request')
}

const approve = () => {
    const data = {
        id: applier.value?.id,
        doi: paper.value?.DOI,
    }
    const token = user!.token;
    const urlAddAuthor = '/api/papers/author?id=${data.id}&doi=${data.doi}'
    const urlDeleteClaim = '/api/papers/request/claim?id=${data.id}&doi=${data.doi}'
    const urlDeletePaper = '/api/papers/${data.doi}'
    const urlDeleteDeletion = '/api/papers/request/delete?id=${data.id}&doi=${data.doi}'

    if(route.query.type === ApplicationType.Claim){
        postWithToken(urlAddAuthor, "", token).then((res) => {
            console.log(res);
            if (res.status === 200) {
                deleteWithToken(urlDeleteClaim, token).then((res) => {
                    if (res.status === 200) {
                        successAlert('已通过该申请,3秒后返回申请列表页面')
                        setTimeout(() => {
                            backToRequests();
                        }, 3000);
                    } else if (res.status === 401) {
                        errorAlert('请先登录');
                        router.push('/login');
                    } else if (res.data === 404){
                        errorAlert('申请数据出错');
                    }
                })
            } else if (res.status === 401) {
                errorAlert('请先登录');
                router.push('/login');
            } else if (res.status === 404) {
                errorAlert('申请数据出错')
            }
        })
    }else if(route.query.type === ApplicationType.Delete){
        deleteWithToken(urlDeletePaper, token).then((res) => {
            console.log(res);
            if (res.status === 200) {
                deleteWithToken(urlDeleteDeletion, token).then((res) => {
                    if (res.status === 200) {
                        successAlert('已通过该申请,3秒后返回申请列表页面')
                        setTimeout(() => {
                            backToRequests();
                        }, 3000);
                    } else if (res.status === 401) {
                        errorAlert('请先登录');
                        router.push('/login');
                    } else if (res.data === 404){
                        errorAlert('申请数据出错');
                    }
                })
            } else if (res.status === 401) {
                errorAlert('请先登录');
                router.push('/login');
            } else if (res.status === 404) {
                errorAlert('申请数据出错')
            }
        }) 
    }

}

const reject = () => {
    const data = {
        id: applier.value?.id,
        doi: paper.value?.DOI,
    }
    const token = user!.token;
    const urlDeleteClaim = '/api/papers/request/claim?id=${data.id}&doi=${data.doi}'
    const urlDeleteDeletion = '/api/papers/request/delete?id=${data.id}&doi=${data.doi}'

    if(route.query.type === ApplicationType.Claim){
        deleteWithToken(urlDeleteClaim, token).then((res) => {
            if (res.status === 200) {
                successAlert('已驳回该申请,3秒后返回申请列表页面')
                setTimeout(() => {
                    backToRequests();
                }, 3000);
            } else if (res.status === 401) {
                errorAlert('请先登录');
                router.push('/login');
            } else if (res.data === 404){
                errorAlert('申请数据出错');
            }
        })
    }else if(route.query.type === ApplicationType.Delete){
        deleteWithToken(urlDeleteDeletion, token).then((res) => {
            if (res.status === 200) {
                successAlert('已驳回该申请,3秒后返回申请列表页面')
                setTimeout(() => {
                    backToRequests();
                }, 3000);
            } else if (res.status === 401) {
                errorAlert('请先登录');
                router.push('/login');
            } else if (res.data === 404){
                errorAlert('申请数据出错');
            }
        })
    }
}

</script>