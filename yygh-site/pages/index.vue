<template>
  <div class="home page-component" >
    <el-carousel indicator-position="inside">
      <el-carousel-item v-for="(item,index) in imgs" :key="index">
        <img :src="item.url">
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索 -->
    <div class="search-container">
    <div class="search-wrapper">
    <div class="hospital-search">
      <el-autocomplete
      class="search-input"
      prefix-icon="el-icon-search"
      v-model="name"
      :fetch-suggestions="querySearchAsync"
      placeholder="点击输入奶茶名称"
      @select="handleSelect"
      >
        <span slot="suffix" class="search-btn v-link highlight clickable selected">搜索 </span>
      </el-autocomplete>
    </div>
    </div>
    </div>
    <!-- bottom -->
    <div class="bottom">
    <div class="left">
    <div class="home-filter-wrapper">
    <div>
      <div class="filter-wrapper title">
        <span
        class="label">品种：</span>
        <div class="condition-wrapper">
          <span class="item v-link clickable" 
            :class="hostypeActiveIndex == index ? 'selected' : ''"
             v-for="(item,index) in hostypeList" :key="item.id" 
             @click="commoditySelect(item.id,index)">{{ item.name }}</span>
       </div>
      </div>
    </div>
    </div>

    <div class="v-scroll-list hospital-list">
      <div class="v-card clickable list-item" v-for="item in list" :key="item.id">
        <div class="">
          <div class="hospital-list-item hos-item" index="0" >
            <div class="wrapper">
            <div class="hospital-title"> {{ item.name }}
              
            </div>
            
            <div class="bottom-container">
            <div class="icon-wrapper">
              <span class="iconfont"></span>销量：{{ item.amount}}
            </div>
          <div class="icon-wrapper">
          <span class="iconfont"></span>价格：{{ item.price}}元
          <el-row class="button-item" aria-setsize="10px">
            <div class="status-wrapper" v-if="item.temperature == 3">
              <el-button size="mini" circle icon="el-icon-plus"></el-button>
            </div>
            <div class="status-wrapper" v-if="item.temperature != 3">
              <el-button size="mini" circle><img src="https://img-shop.qmimg.cn/s23107/2019/04/28/6e4829e475329d4836.jpg?imageView2/2/w/20/h/20"></el-button>
            </div>
          </el-row>
          </div>
          </div>
          </div>
          <img :src="''+item.imgUrl"
           :alt="item.id"
           class="hospital-img"  @click="show(item.id)">
          </div>
        </div>
      </div>
      <el-dialog :visible.sync="dialogUserFormVisible" v-if="dialogUserFormVisible" style="text-align: left;" top="50px" :append-to-body="true"  width="500px" @close="closeDialog()">

        <div hidden id="img">{{test.imgUrl}}</div>
        <img :src="test.imgUrl" style="width:250px ;height: 250px;align-content: center;margin-left: 100px;;">
        <div class="container" style="color: rgb(0, 0, 0);">
          商品名称：{{ test.name }}
        </div>
        <div  style="color: rgb(72, 72, 72);margin-top: 10px;">描述：{{test.description}}</div>
        <el-divider></el-divider>
      <div class="status-wrapper" v-if="test.temp != 3">
          <div style="margin-bottom: 10px;">温度</div>         
            <div>
              <el-radio v-model="temp" label="1" v-if="test.temp!=0" >正常温</el-radio>     
              <el-radio v-model="temp" label="2" v-if="test.temp!=1" >加冰</el-radio>
              <el-radio v-model="temp" label="3" v-if="test.temp!=2" >加热</el-radio>
            </div>
      </div>
      <div class="status-wrapper" v-else-if="test.temp == 3">
          <div hidden>
            <el-radio v-model="temp" label="1"  hidden >{{temp=4}}}</el-radio>
          </div>
     </div>
      <div class="status-wrapper" v-if="test.type != 3" style="margin-top: 20px;">
        <div style="margin-bottom: 10px;">糖度</div>
          <div style="margin-bottom: 20px;">
            <el-radio v-model="type" label="1" v-if="test.type!=0" >标准糖</el-radio>     
            <el-radio v-model="type" label="2" v-if="test.type!=1" >少糖</el-radio>
            <el-radio v-model="type" label="3" v-if="test.type!=2" >多糖</el-radio>
          </div>
      </div>
      <div class="status-wrapper" v-else-if="test.type == 3">
        <div hidden>
          <el-radio v-model="type" label="1"  hidden >{{type=4}}}</el-radio>
        </div>
   </div>
      <div  style="background-color: rgb(238, 237, 237); width: 400px;height:120px;margin-bottom: 5%">
          <div style="margin-left:20px; margin-top: 20px;padding-top: 20px ;">
            价格：￥{{test.price}}
              <el-button  icon="el-icon-remove" size="mini" circle style="margin-left: 55%;" @click="number--"></el-button>
                <p  style="display: inline-block;">{{number}}</p>
              <el-button  icon="el-icon-circle-plus" size="mini" circle @click="number++"></el-button>           
          </div>
          <div v-if="test.temp != 3" style="margin-left: 20px;display: inline-block;margin-top: 15px;" >
            <div v-if="temp==1">正常温</div>
            <div v-if="temp==2">加冰</div>
            <div v-if="temp==3">加热</div>
          </div>
          <div v-if="test.type != 3" style="margin-left: 3px; display: inline-block;">
            <div v-if="type==1">标准糖</div>
            <div v-if="type==2">少糖</div>
            <div v-if="type==3">多糖</div>
          </div>
          <el-row>
            <el-button type="success" style="width: 100%; margin-top: 4%;" @click="join()">加入购物车</el-button>
          </el-row>       
      </div>
      </el-dialog>
      <div style="margin-top: 20px;">
        <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
          购物车详情
        </el-button>
      </div>
      
      <el-drawer 
        title="购物车详情"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
      <template slot="title" style="width: 40px;">
        <div class="font" v-if="userJoinList!=''">
          总价 ： {{userJoinList[0].param.totalPrice}} 元
        </div><div class="font" v-if="userJoinList==''">
          总价 ：  0 元
        </div>
          <el-button type="warning" style="width: 5%; " circle @click="delAll" >清空</el-button>
          <el-button type="success" style="width: 10%;margin-left: 40px;" @click="buy">确定</el-button>
      </template>
          <el-table
          :data="userJoinList"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="品类"
            width="180">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="180">
          </el-table-column>
          <el-table-column
            prop="param.types"
            label="种类"
            width="180">
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量">
          </el-table-column>
          <el-table-column  prop="id">
            <template slot-scope="scope">
              <el-button  icon="el-icon-remove" size="mini" circle style="margin-left: 55%;" @click="changeNum(0,scope.row.id)"></el-button>
              <el-button  icon="el-icon-circle-plus" size="mini" circle @click="changeNum(1,scope.row.id)"></el-button>   
            </template>      
        </el-table-column>

        </el-table>  

      </el-drawer>

    </div>
    </div>
    <div class="right">
      <div class="common-dept">
      <div class="header-wrapper">
      <div class="title"> 热销饮品</div>
      <div class="all-wrapper"><span>全部</span>
      <span class="iconfont icon"></span>
      </div>
      </div>
      <div class="content-wrapper">
      <span class="item v-link clickable dark">霸气榴莲</span>
      <span class="item v-link clickable dark">酸奶杨梅</span>
      <span class="item v-link clickable dark">脏脏王 </span>
      <span class="item v-link clickable dark">霸气橙子 </span>
      <span class="item v-link clickable dark">芝士草莓 </span>
      <span class="item v-link clickable dark">霸气芒果 </span>
      <span class="item v-link clickable dark">黑糖宝藏</span>
      <span class="item v-link clickable dark">芋泥宝藏 </span>
      </div>
    </div>
    <div class="space">
      <div class="header-wrapper">
      <div class="title-wrapper">
    
    </div>
    </div>
  </div>
</div>
</div>
</div>
</template>

<script>

import hosp from '@/api/hosp';
import dict from '@/api/dict';
import commodityApi from '@/api/user/commodity';
import cookie from 'js-cookie'

const defaultDialogAtrr={
            name: '', 
            price:0, // 输入框绑定对象
            parent_name: '', // 输入框placeholder
            type: 0, // 类型
            temp: 0, // 常温？
            description: '',  // 对商品的描述
            amount:0,
            imgUrl:''
     }

const joinListlogAtrr={
  name:'',
  number:1,
  price:1,
  type:1,
  temp:1,
    }

export default {

  data(){
    return{
      imgs: [
        {url:'https://img-shop.qmimg.cn/s36192/2020/06/02/5f174643c17873cccc.jpg'},
        {url:'https://img-shop.qmimg.cn/s36192/2020/06/02/79ba8839a547c49835.jpg'},
        {url:'https://img-shop.qmimg.cn/s36192/2020/06/02/93d2e5e3e768c04581.jpg'},
        {url:'https://img-shop.qmimg.cn/s36192/2020/05/29/610a53aa1d08c04e0c.jpg'},
      ],
      searchObj: {},

      page: 1,
      limit: 10,
      total:1,

      imgitem:[1,2,3,4],
      name: '', //奶茶的名称
      list:[],
      hostypeList: [], //医院等级集合
      commodityList: [],
      dialogUserFormVisible:false,
      joinRsponse:{},
      hostypeActiveIndex: 0,
      provinceActiveIndex: 0,
      dialogAtrr:defaultDialogAtrr,
      joinList:joinListlogAtrr,
      test:{},
      temp: '1',
      type: '1',
      number:1, //加入购物车的数量
      totalPrice:0,
      drawer: false,
      direction: 'btt',
      userJoinList:[],
    }
  },
  created(){
    this.init()
  },
  methods:{
    buy(){
      //生成一条消费表 但是还没有支付 把信息加载进去  需要把购物车列表打包实体类传后端
      console.log(this.userJoinList)
      // window.location.href='/buy/'
      commodityApi.GenerateTable(this.userJoinList)
        .then(r=>{
          //存数据 删点购物车里面的记录 跳转
          // this.getJoinList()
          window.location.href='/order/'
          console.log(r)
        })
    },
    changeNum(flag,id){
      console.log(flag,id)
      //去数据库改变数据并且刷新购物车
      commodityApi.changeNum(flag,id)
        .then(response=>{
          this.getJoinList()
        })
    },
    delAll(){
      this.$confirm('是否确定清空购物车？', '清空购物车', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            //删除数据库所有内容
            commodityApi.delAll()
              .then(r=>{
                this.getJoinList()
                this.$message({
                  type: 'success',
                  message: '清空购物车'
                });
              })
          })
          .catch(action => {
            this.$message({
              type: 'success',
              message: '放弃清空购物车'
            })
          });
    },
    join(){
      this.dialogUserFormVisible = false
      //判断有没有登录
      let token = cookie.get('token')
      if (!token) {
        const h = this.$createElement;
          this.$notify({
            title: '登录提醒',
            message: h('i', { style: 'color: teal'}, '请登录后再加入购物车~'),
            type: 'warning'
          });
          loginEvent.$emit('loginDialogEvent')
          return
      }
      //将选择的内容加入到一个列表
      this.joinList.name = this.defaultDialogAtrr.name
      this.joinList.number = this.number
      this.joinList.temp = this.temp
      this.joinList.type = this.type
      this.joinList.price = this.defaultDialogAtrr.price*this.number    
      commodityApi.addJoinList(this.joinList)
        .then(response=>{
          this.$message({
            message:"成功加入购物车",
            type:'success'
          })
          this.getJoinList()
        })
      // console.log(this.joinRsponse)
      //同时把数据加入到购物车 调用零时数据库来完成任务 redis
      this.number = 1
    },

    handleClose(done) {
        done()
    },

    getJoinList(){
        commodityApi.getJoinList()
          .then(response=>{
            console.log(response.data)
            this.userJoinList = response.data
          })
    },


    init() {
      commodityApi.findCommodityType()
        .then(response=>{
          this.hostypeList=[]
          this.hostypeList.push({"name":"全部","value":""})
          // console.log(response.data)
          //再将接口数据添加
          for(var i=0;i<response.data.length;i++){
            this.hostypeList.push(response.data[i])
          }
        }),
        this.getList()
        this.getJoinList()
      },

    //根据条件查询得到医院列表信息
    getList(){
      commodityApi.findCommodity(this.page,this.limit,this.searchObj)
        .then(response=>{
          for(let i in response.data.records){
            this.list.push(response.data.records[i])
          }
          this.total = response.data.records.length
        })
        .catch(err=>{
          console.log(222)
        })
    },

    //根据品种来查询具体的商品
    commoditySelect(id,index){
        this.list=[]
        this.searchObj.id = id
        this.hostypeActiveIndex=index
        this.page=1
        this.getList()
    },

      querySearchAsync(queryString, cb) {
          this.searchObj = []
          if(queryString == '') return
          commodityApi.findCommodityByName(queryString).then(response => {
            console.log(response)
            for (let i = 0, len = response.data.length; i <len; i++) {
              response.data[i].value = response.data[i].name
            }
            cb(response.data)
          })
     },
    //在下拉框选择某一个内容，执行下面方法，跳转到详情页面中
    handleSelect(item){
        window.location.href = '/hosp/' + item.hoscode
    },
    show(id){
      this.temp ='1'
      this.type ='1'    
      this.dialogUserFormVisible=true
      // this.test = this.dialogAtrr
      //通过id去查找具体商品的信息
      this.dialogAtrr = { ...defaultDialogAtrr }
      commodityApi.findCommodityById(id)
        .then(response=>{
          this.defaultDialogAtrr = response.data
          this.test = response.data
          // console.log(this.dialogAtrr)
        })
        
    },
    closeDialog(){
      this.dialogUserFormVisible=false

    }
  }
}
</script>
<style>
  .list-item{
    margin-left: 6px;
  }
  .button-item{
    margin-left: 0px;
    left: 50px;
    size: 10px;
  }
  .el-drawer {
    height:10px;
    width: 20px;
    background-color: rgb(235, 235, 235);
  }
  .font{
    line-height: 1.3;
    font-size: 20px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
  }
</style>
