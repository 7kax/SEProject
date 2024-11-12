<!-- 管理员处理请求的页面 -->
<!-- 目前有: 草稿审核、请求删除、认领申请 -->
<template>
    <h2>认领请求</h2>
    <el-table :data="claims" style="width: 100%">
        <el-table-column prop="id" label="申请人" width="120" sortable />
        <el-table-column prop="doi" label="DOI" width="120" sortable />
        <el-table-column label="审核" width="120">
            <template #default="scope">
                <el-button type="primary" @click="audit(scope.row)">申请认领</el-button>
            </template>
        </el-table-column>
    </el-table>

    <br>
    <h2>删除请求</h2>
    <el-table :data="deletes" style="width: 100%">
        <el-table-column prop="id" label="申请人" width="120" sortable />
        <el-table-column prop="doi" label="DOI" width="120" sortable />
        <el-table-column label="审核" width="120">
            <template #default="scope">
                <el-button type="primary" @click="audit(scope.row)">申请认领</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getWithToken, } from '@/utils/request';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { errorAlert, } from '@/utils/alert';
import AdminRequestDetail from './AdminRequestDetail.vue';

const authStore = useAuthStore();
const router = useRouter();


const user = authStore.user;

enum ApplicationType {
    Claim = '论文认领',
    Delete = '论文删除'
}


interface Application {
    id : string,
    name: string,
    doi: string,
    title: string,
    firstAuthor : string,
    type: ApplicationType

}

interface ApplicationData{
    id : string,
    doi : string
}

const claims = ref(new Array<Application>)
const claimDatas = ref(new Array<ApplicationData>)
const deletes = ref(new Array<Application>)
const deleteDatas = ref(new Array<ApplicationData>)

const refreshAppications = () => {
    claims.value = []
    deletes.value = []

    const urlGetClaim = '/api/papers/request/claim'
    const urlGetDelete = '/api/papers/request/delete'
    const token = user!.token;

    //获取申请信息
    getWithToken(urlGetClaim,token).then((res) => {
        console.log(res);
        if (res.status === 200) {
            claimDatas.value = res.data.claims;
        } else if (res.status === 401) {
            errorAlert('请先登录');
            router.push('/login');
        }
    })

    getWithToken(urlGetDelete,token).then((res) => {
        console.log(res);
        if (res.status === 200) {
            deleteDatas.value = res.data.deletes
        } else if (res.status === 401) {
            errorAlert('请先登录');
            router.push('/login');
        }
    })

    //查询其余字段
    claimDatas.value.forEach((claimData) => {
        let name:string = '';
        let title:string = '';
        let firstAuthor:string = '';
        const token = user!.token;

        getWithToken('/api/users/${claimData.id}', token).then((res) => {
            if (res.status === 200) {
                name = res.data.user.name;
            } else if (res.status === 401) {
                errorAlert('请先登录');
                router.push('/login');
            } else if (res.data === 404){
                errorAlert('用户数据出错');
            }
        })

        getWithToken('/api/papers/${claimData.doi}', token).then((res) => {
            if (res.status === 200) {
                title = res.data.papers[0].title
                firstAuthor = res.data.papers[0].firstAuthor
            } else if (res.status === 401) {
                errorAlert('请先登录');
                router.push('/login');
            } else {
                errorAlert('论文数据出错');
            }
        });
        
        //加入列表
        const claim : Application = {
            id : claimData.id,
            name : name,
            doi : claimData.doi,
            title : title,
            firstAuthor : firstAuthor,
            type : ApplicationType.Claim
        }

        claims.value.push(claim)
    })

    deleteDatas.value.forEach((deleteData) => {
        let name:string = '';
        let title:string = '';
        let firstAuthor:string = '';
        const token = user!.token;

        getWithToken('/api/users/${deleteData.id}', token).then((res) => {
            if (res.status === 200) {
                name = res.data.user.name;
            } else if (res.status === 401) {
                errorAlert('请先登录');
                router.push('/login');
            } else if (res.data === 404){
                errorAlert('用户数据出错');
            }
        })

        getWithToken('/api/papers/${deleteData.doi}', token).then((res) => {
            if (res.status === 200) {
                title = res.data.papers[0].title
                firstAuthor = res.data.papers[0].firstAuthor
            } else if (res.status === 401) {
                errorAlert('请先登录');
                router.push('/login');
            } else {
                errorAlert('论文数据出错');
            }
        });
        
        //加入列表
        const deletion : Application = {
            id : deleteData.id,
            name : name,
            doi : deleteData.doi,
            title : title,
            firstAuthor : firstAuthor,
            type : ApplicationType.Delete
        }

        deletes.value.push(deletion)
    })
}

onMounted(refreshAppications())

const audit = ( application : Application) => {
    router.push({
        name : 'AdminRequestDetail',
        query : {
            id : application.id,
            doi : application.doi
        }
    })
}


</script>