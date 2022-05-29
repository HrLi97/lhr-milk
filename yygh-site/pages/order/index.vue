<template>
    <!-- header -->
    <div class="nav-container page-component">
      <!--左侧导航 #start -->
      <div class="nav left-nav">
        <div class="nav-item ">
          <span class="v-link clickable dark" onclick="javascript:window.location='/user'">个人信息 </span>
        </div>
        <div class="nav-item selected">
          <span class="v-link selected dark" onclick="javascript:window.location='/order'"> 订单管理 </span>
        </div>
        <div class="nav-item ">
          <span class="v-link clickable dark" onclick="javascript:window.location='/patient'"> 评论管理 </span>
        </div>
        <div class="nav-item ">
          <span class="v-link clickable dark"> 修改账号信息 </span>
        </div>
        <div class="nav-item ">
          <span class="v-link clickable dark"> 意见反馈 </span>
        </div>
      </div>
      <!-- 左侧导航 #end -->
      <!-- 右侧内容 #start -->
      <div class="page-container">
        <div class="personal-order">
          <div class="title"> 预支付订单</div>
          <el-form :inline="true" style="margin-top: 20px; ;">
                <el-cascader
                v-model="value"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                clearable
                @change="handleChange"></el-cascader>
            <el-form-item label="订单状态：" style="margin-left: 80px">
              <el-select v-model="searchObj.isPay" placeholder="全部" class="v-select patient-select" style="width: 200px;">
                <el-option
                  v-for="item in statusList"
                  :key="item.status"
                  :label="item.comment"
                  :value="item.status">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="text" class="search-button v-link highlight clickable selected" @click="fetchData()">
                查询
              </el-button>
              <el-button type="text" class="search-button v-link highlight clickable selected" @click="clean()">
                清空
              </el-button>
            </el-form-item>
          </el-form>
          <div class="table-wrapper table">
            <el-table
              :data="cartList"
              stripe
              style="width: 100%">

              <el-table-column label="商品名称" align="center" min-width="160%">
                <template slot-scope="scope">
                  <div v-for="(item, index) in scope.row.param" :key="index">
                    {{item.name}}  &nbsp;{{item.types}}  &nbsp;:{{item.number}} 
                  </div>
      
                </template>
              </el-table-column>

              <el-table-column
                prop="payStatus"
                label="支付状态"
                min-width="100%">
              </el-table-column>
              <el-table-column class="el-table"
                prop="createTime"
                label="创建时间"
                min-width="100%"
                style="margin-right: 110px;">
              </el-table-column>
              <el-table-column
                prop="price"
                label="价格"
                min-width="100%">
              </el-table-column>
              <el-table-column label="操作" min-width="100%">
                <template slot-scope="scope">
                  <el-button type="text" class="v-link highlight clickable selected" v-if="scope.row.payId===0" @click="payCart(scope.row.id)">支付</el-button>
                  <el-button type="text" class="v-link highlight clickable selected"  v-if="scope.row.payId!==0" @click="payCart(scope.row.id)">评价</el-button>
                  <el-button type="text" class="v-link highlight clickable selected" @click="cancel(scope.row.id)">取消</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!-- 右侧内容 #end -->
    </div>
    <!-- footer -->
  </template>
  <script>
  import '~/assets/css/hospital_personal.css'
  import '~/assets/css/hospital.css'
  import orderInfoApi from '@/api/orderInfo'
  import patientApi from '@/api/patient'
  import joinApi from '@/api/user/join'
  export default {
    data() {
      return {

        searchObj: {}, // 查询表单对象
        patientList: [],
        statusList: [{
          status:"未支付",
          value:0
        },{
          status:"已支付",
          value:1
        }],
        commodityList:[],
        options:[],
        value:[],//练级查询的结果id
        cartList:[]
      }
    },
  
    created() {
      this.init()
      this.fetchData()
    },
    methods: {

      //购买订单
      payCart(id){
        window.location.href = '/order/show?orderId='+id
      },

      //取消订单
      cancel(id){

        this.$confirm('是否确定删除购物车内容？', '删除购物车内容', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(r=>{
            joinApi.cancel(id)
            .then(response=>{
              this.$message({
                type:'info',
                message:"删除成功"
              })
              this.fetchData()
            })
        }).catch(r=>{
          this.$message({
                type:'success',
                message:"已经取消操作"
              })
        })  

      },

      //实现联级查询
      init(){
        joinApi.getParent()
          .then(response=>{
            // console.log(response)
            for(var i=0;i<response.data.length;i++){
            this.commodityList.push(response.data[i])
            this.options = response.data.map(({name,id,param})=>({
              value:id,
              label:name,
              children:param.children.map(({name,id})=>({
                  value:id,
                  label:name,
              }))
            }))
          }

          })
      },

      handleChange(value){
        this.searchObj.commodityId = value[1]
      },


      clean(){
            this.searchObj={}
            this.fetchData(this.page)
        },

      fetchData(page = 1) {
        this.page = page
        joinApi.getPageList(this.searchObj).then(response => {
          console.log(response.data);
          this.cartList = response.data
        })
      },
      findPatientList() {
        patientApi.findAll().then(response => {
          this.patientList = response.data
        
        })
      },
      
      // changeSize(size) {
      //   // console.log(size)
      //   this.limit = size
      //   this.fetchData(1)
      // },
      show(id) {
        console.log(id)
      }
    }
  }

  </script>

  <style>
    .el-table{
      margin-right: 202px;
    }
  </style>
  