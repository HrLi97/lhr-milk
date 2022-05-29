<template>
    <!-- header -->
    <div class="nav-container page-component">
      <!--左侧导航 #start -->
      <div class="nav left-nav">
        <div class="nav-item selected">
          <span class="v-link clickable selected dark" onclick="javascript:window.location='/user'">个人信息 </span>
        </div>
        <div class="nav-item ">
          <span class="v-link  dark" onclick="javascript:window.location='/order'"> 订单管理 </span>
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
        <div>
          <div class="title"> 用户基本信息</div>
          <div class="status-bar">     
              <div class="block" style="margin-bottom: 25px;">
                <el-avatar shape="square" size="large" :src="userInfo.headImgUrl"></el-avatar>
            </div>
            <div class="status-wrapper"><span class="iconfont"></span>{{ userInfo.name }}</div>
          </div>



          <el-descriptions title="自定义样式列表" :column="3" border>
            <el-descriptions-item label="用户名" label-class-name="my-label" content-class-name="my-content">{{userInfo.name}}</el-descriptions-item>
            <el-descriptions-item label="邮箱" content-class-name="my-address">{{userInfo.email}}</el-descriptions-item>
            <el-descriptions-item label="消费金额">{{userInfo.consumptionAmount}}元</el-descriptions-item>
            <el-descriptions-item label="新增地址" :inline="true">

                <el-input  v-model="newAddress" placeholder="请输入新增的地址">
                </el-input>
                <el-button style="margin-top: 10px; float: right ; display:inline;" size="mini" type="success" @click="addAddress()">
                  确定
                </el-button>

            </el-descriptions-item>
            
            <el-descriptions-item label="最后消费时间">
              <el-tag size="small">{{userInfo.lastConsumption}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">
              <el-tag size="medium">{{userInfo.createTime}}</el-tag>
            </el-descriptions-item>
            
            <el-descriptions-item label="地址管理" :contentStyle="{'text-align': 'right'}" style="min-inline-size:100% ;">
              <el-select v-model="address" placeholder="请选择" style="min-inline-size:100% ;font-size: small;">
                <el-option
                  v-for="item in userAddress"
                  :key="item.id"
                  :label="item.address"
                  :value="item.id">
                  <el-button type="info" size="mini" style="margin-left:50px ;background-position-x: center;" @click="shezhimoren(item.id)">设为默认地址</el-button>
                  <span style="float: left">{{ item.address }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px; margin-left :20px;" v-if="item.isDefault===1">{{message}}</span>
                </el-option>
                
              </el-select>
            </el-descriptions-item>
          </el-descriptions>

          <el-table
          :data="infoList"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="callbackTime"
            label="购买日期"
            width="180">
          </el-table-column>
          <el-table-column
           
            label="购买商品"
            min-width="110%">
            <template slot-scope="scope" >
              <div v-for="(item, index) in scope.row.list" :key="index">
               {{item.name}}  &nbsp;{{item.types}}  &nbsp;:{{item.number}} 
              </div>
  
            </template>
          </el-table-column>
          <el-table-column
            prop="param.address"
            label="送货地址"
            min-width="130%">
          </el-table-column>
          <el-table-column
            prop="price"
            label="总价格"
            min-width="30%">
          </el-table-column>
          <el-table-column
          label="操作"
          min-width="100%">
          <el-row>
            <el-button type="success">评论</el-button>
            <el-button type="danger">删除</el-button>
          </el-row>     
        </el-table-column>
        </el-table>
        </div>
      </div><!-- 右侧内容 #end -->
      <!-- 登录弹出框 -->
    </div>
    <!-- footer -->
  </template>
  
  <script>
  import '~/assets/css/hospital_personal.css'
  import '~/assets/css/hospital.css'
  import '~/assets/css/personal.css'
  import userInfoApi from '@/api/user/userInfo'

  export default {
    data() {
      return {
        newAddress:'',
        userInfo:{},
        infoList:[],
        userAddress:[],
        address:'',
        message:"默认地址",
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      init() {
        
      },
      addAddress(){
          userInfoApi.addAddress(this.newAddress)
            .then(response=>{
              this.getUserInfo()
            })
      },
      shezhimoren(id){
        userInfoApi.changeAddressDefault(id)
          .then(response=>{
            this.newAddress=''
            this.getUserInfo()
          })
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      getUserInfo() {
        userInfoApi.getUserInfo().then(response => {
         console.log(response.data)
          this.infoList = response.data.infoList
          this.userInfo = response.data.userInfo
          this.userAddress = response.data.address
        })
      },

    }
  }
  </script>
  <style>


    .page-container .title {
      letter-spacing: 1px;
      font-weight: 700;
      color: #333;
      font-size: 16px;
      margin-top: 0;
      margin-bottom: 20px;
    }
    
    .my-label {
    background: #4c713a;
  }

    .my-content {
    background: #e4f6ef;
  }
    .my-address{
      background: #f8e3ec;
    }
  </style>
  