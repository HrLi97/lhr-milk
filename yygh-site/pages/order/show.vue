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
        <div class="order-detail">
          <div class="title"> 订单详情</div>
          <div class="status-bar">
            <div class="left-wrapper">
              <div class="status-wrapper BOOKING_SUCCESS">
                <span class="iconfont"></span> {{ orderInfo.param.orderStatusString }}
              </div>
            </div>
            <div class="right-wrapper">
              <img src="//img.114yygh.com/static/web/code_order_detail.png" class="code-img">
              <div class="content-wrapper">
                <div> 微信<span class="iconfont"></span>关注自家奶店</div>
                <div class="watch-wrapper"> 快速订餐</div>
              </div>
            </div>
          </div>
          <div class="info-wrapper">
            <div class="title-wrapper">
              <div class="block"></div>
              <div>订单信息 </div>
            </div>
            <div class="info-form">
              <el-form ref="form" :model="orderInfo">
                <el-form-item label="商品信息：" :prop="'index+'.name">
               <div v-for="(item,index) in orderInfo.param" :key="index">

                <span v-if="!index" >{{item.name}} &nbsp; {{item.types}}  &nbsp;:{{item.number}} </span>
                  <span v-if="index" style="position: relative;left: 88px;">{{item.name}}  &nbsp;{{item.types}}  &nbsp;:{{item.number}} </span>
                 
               </div>
              </el-form-item>
              <el-form-item label="送餐地址："  v-if="orderInfo.payId===0"  style="width: 600px;">
                <template>
                  <el-select v-model="address" placeholder="请选择" style="width: 400px;">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.address"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </el-form-item>
                <el-form-item v-if="orderInfo.payId===0" prop="startDate" label="预计送达时间" style="width: 600px;">
                  <el-date-picker
                      style="width: 250px"
                      class="input-width"
                      v-model="startDate"
                      :picker-options="pickerOptions"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="请选择时间">
                    </el-date-picker>
                </el-form-item>

                <el-form-item  v-if="orderInfo.payId!==0" label="送货地址：" style="min-width :150%;">
                  <div class="content">
                    <div class="fee">{{ backList.param.address }}
                    </div>
                  </div>
                </el-form-item>

                <el-form-item  v-if="orderInfo.payId!==0" label="预计送达时间：">
                  <div class="content">
                    <div class="fee">{{ backList.getTime }}
                    </div>
                  </div>
                </el-form-item>

                <el-form-item label="费用：">
                  <div class="content">
                    <div class="fee">{{ orderInfo.price }}元
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="联系方式：">
                  <div class="content">
                    <div class="fee">{{ orderInfo.email }}
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="加入购物车时间：">
                  <div class="content"><span>{{ orderInfo.createTime }}</span></div>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!-- <div class="rule-wrapper mt40">
            <div class="rule-title"> 注意事项</div>
            <div>1、请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；<br>
              <span style="color:red">2、【取号】就诊当天需在{{ orderInfo.fetchTime }}在医院取号，未取号视为爽约，该号不退不换；</span><br>
              3、【退号】在{{ orderInfo.quitTime }}前可在线退号 ，逾期将不可办理退号退费；<br>
              4、预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；<br>
              5、请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。
            </div>
          </div> -->
          <div class="bottom-wrapper mt60" >
            <div class="button-wrapper">
              <div class="v-button white" v-if="orderInfo.payId == 0" @click="cancelCart()">取消订单</div>
            </div>
            <div class="button-wrapper ml20" v-if="orderInfo.payId !=0">
              <div class="v-button" @click="deleteCart()">删除订单</div>
            </div>
            <div class="button-wrapper ml20" v-if="orderInfo.payId !=0">
              <div class="v-button" @click="deleteCart()">评价订单</div>
            </div>
            <div class="button-wrapper ml20" v-if="orderInfo.payId == 0">
              <div class="v-button" @click="payCart()">支付订单</div>
            </div>
          </div>
        </div>
      </div><!-- 右侧内容 #end -->
      <!-- 微信支付弹出框 -->
      <el-dialog :visible.sync="dialogPayVisible" v-if="dialogPayVisible" style="text-align: left" :append-to-body="true" width="500px" @close="closeDialog">
        <div class="container">
          <div class="operate-view" style="height: 350px;">
            <div class="wrapper wechat">
              <div>
                <qriously :value="payObj.codeUrl" :size="220"/>
                <div style="text-align: center;line-height: 25px;margin-bottom: 40px;">
                  请使用微信扫一扫<br/>
                  扫描二维码支付
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div><!-- footer -->
  </template>
  <script>
  import '~/assets/css/hospital_personal.css'
  import '~/assets/css/hospital.css'
  import joinApi from '@/api/user/join'
  import userInfoApi from '@/api/user/userInfo'
  import weixinApi from '@/api/user/weixin';
  export default {
    data() {
      return {
        orderId: null,
        backList:{ param: {}},
        orderInfo: {
          param: {}
        },
        dialogPayVisible: false,
        payObj: {},
        timer: null , // 定时器名称
        pickerOptions: {
            disabledDate(time) {
              let now = new Date();   //获取此时的时间
              let nowData = new Date(  //获取此时年月日的后一天
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
              );
              let oneMonthafter = new Date(  //获取一个月之前的时间
                now.getFullYear(),
                now.getMonth() ,  //获取下一个月
                now.getDate() + 7   //将多算的一天减掉
              );

              return (
                time.getTime() < nowData.getTime() 
                || time.getTime() > oneMonthafter.getTime()  //小于一个月的全部disabled掉
              );
            },

          shortcuts: [{
            text: '半小时后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 *0.5);
              picker.$emit('pick', date);
            }
          }, {
            text: '一小时后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 *1);
              picker.$emit('pick', date);
            }
          }, {
            text: '俩小时后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 *2);
              picker.$emit('pick', date);
            }
          }]
          },
        startDate:'',
        options:[],
        address:'1',
      }
    },

    created() {
      this.orderId = this.$route.query.orderId
      this.init()
      this.getBack()
    },
    methods: {
      init() {
        joinApi.orderDetail(this.orderId).then(response => {
          console.log(response.data);
          this.orderInfo = response.data
        })
        userInfoApi.getUserAddress()
          .then(response=>{
            this.options = response.data
            // console.log(this.options)
            for(let i = 0;i<response.data.length;i++){
              if(response.data[i].param.default===1){
                this.address = response.data[i].id
              }
            }
            console.log(this.address)
          })
      },
      getBack(){
        if(this.orderInfo.payId!==0&&this.orderInfo.payId!==null){
          joinApi.getBack(this.orderId)
            .then(response=>{
              // console.log(response.data)
              this.backList = response.data
              console.log(this.backList)
            })
        }
      },
      cancelCart(){
        const id = this.$route.query.orderId
        // console.log(id)
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
              window.location.href="/order"
            })
        }).catch(r=>{
          console.log(this.address),
          console.log(this.startDate)
          this.$message({
                type:'success',
                message:"已经取消操作"
              })
        })
      },

      payCart() { 
        if(this.startDate==""){
          this.$message.error("请选择送达时间")
          return
        }
        else if(new Date(this.startDate).getTime<new Date().getTime){
          console.log(new Date().getTime)
          
          this.$message.error("请选择正确的送达时间")
          return
        }
        else{
          this.dialogPayVisible = true
          weixinApi.createNative(this.orderId,this.address,this.startDate).then(response => {
          this.payObj = response.data
          console.log(response.data)
          if(this.payObj.codeUrl == '') {
            this.dialogPayVisible = false
            this.$message.error("支付错误")
          } else {
            this.timer = setInterval(() => {
              this.queryPayStatus(this.orderId)
            }, 3000);
          }
        })
        }
      },
      queryPayStatus(orderId) {
        weixinApi.queryPayStatus(orderId).then(response => {
          if (response.message == '支付中') {
            return
          }
          clearInterval(this.timer);
          this.$message({
            message:"支付成功",
            type:'success'
          })
          //还需要将预计送达时间回调
          window.location.reload()
        })
      },
      closeDialog() {
        if(this.timer) {
          clearInterval(this.timer);
        }
      },
      deleteCart(){



      },
    }
  }
  </script>
  <style>
    .info-wrapper {
      padding-left: 0;
      padding-top: 0;
    }
    .content-wrapper {
      color: #333;
      font-size: 14px;
      padding-bottom: 0;
    }
    .bottom-wrapper {
      width: 100%;
    }
    .button-wrapper {
      margin: 0;
    }
    .el-form-item {
      margin-bottom: 5px;
    }
    .bottom-wrapper .button-wrapper {
      margin-top: 0;
    }
  </style>
  