<template>
    <div class="app-container">
        <el-form :inline="true" class="demo-form-inline">
 
        <el-form-item>
            <el-input v-model="searchObj.name" placeholder="用户名称"/>
        </el-form-item>

        <el-form-item>
            <el-input v-model="searchObj.email" placeholder="用户邮箱"/>
        </el-form-item>
    
        <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
        </el-form>
    
    <!-- banner列表 -->
    <el-table v-loading="listLoading" :data="list"
            border
          fit
          highlight-current-row>
    
        <el-table-column
        label="序号"
        width="60"
        align="center">
            <template slot-scope="scope">
                    {{ (page - 1) * limit + scope.$index + 1 }}
            </template>
        </el-table-column>
    
        <el-table-column label="用户头像">
            <template slot-scope="scope">
            <img :src="scope.row.headImgUrl" width="60">
            </template>
        </el-table-column>
    
        <el-table-column prop="name" label="用户名称"/>
        <el-table-column prop="email" label="用户邮箱" min-width="120%"/>
        <el-table-column prop="consumptionAmount" label="总消费金额" width="100px"/>
        <el-table-column prop="lastConsumption" label="最后消费时间" min-width="100%"/>
        <el-table-column label="状态"  min-width="100%">
            <template slot-scope="scope">
                    {{ scope.row.status === 0 ? '锁定' : '正常' }}
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"/>
    
        <el-table-column label="操作" width="230" align="center">

            <template slot-scope="scope">
                <router-link :to="'/commodity/hosp/show/'+scope.row.id">
                    <el-button type="primary" size="mini">查看</el-button>
                </router-link>
            
            </template>   
        </el-table-column>      
    </el-table>
        <!-- 分页组件 -->
        <el-pagination
            :current-page="page"
            :total="total"
            :page-size="limit"
            :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
            style="padding: 30px 0; text-align: center;"
            layout="sizes, prev, pager, next, jumper, ->, total, slot"
            @current-change="fetchData"
            @size-change="changeSize"
        />
    </div>
    </template>
    

<script>
    import userApi from '@/api/user'
    export default{

        data(){
            return{
                listLoading: true, // 数据是否正在加载
                list: null, // banner列表
                total: 0, // 数据库中的总记录数
                page: 1, // 默认页码
                limit: 10, // 每页记录数
                searchObj: {}, // 查询表单对象
                districtList: []
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
            fetchData(page=1){
                this.page = page,
                userApi.getUser(this.page,this.limit,this.searchObj)
                .then(response=>{
                    console.log(response)
                    this.list = response.data.records
                    this.total = response.data.total
                    this.listLoading = false
                    console.log(this.list)
                })
            },
            // 当页码发生改变的时候
            changeSize(size) {
                console.log(size)
                this.searchObj = {}
                this.limit = size
                this.fetchData(1)
            },
            // 重置查询表单
            resetData() {
                console.log('重置查询表单')
                this.searchObj = {}
                this.fetchData()
            },

        }
    }

</script>