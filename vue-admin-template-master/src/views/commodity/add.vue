<template>
  <div class="app-container">
      <div style="margin-bottom:20px ; font-size: 20px;">
         商品添加修改
      </div>
      <el-form label-width="120px">
         <el-form-item label="商品名称">
            <el-input v-model="commoditySet.name"/>
         </el-form-item>

         <el-form-item label="商品类型">
            <el-select v-model="commoditySet.parentId" placeholder="请选择">
               <el-option
                 v-for="item in options"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
               </el-option>
             </el-select>
         </el-form-item>

         <el-form-item label="价格">
            <el-input v-model="commoditySet.price"/>
         </el-form-item>

         <el-form-item label="销量显示">
            <el-input v-model="commoditySet.amount"/>
         </el-form-item>
         <el-form-item label="温度">
            <el-select v-model="commoditySet.temperature" placeholder="请选择">
               <el-option
                 v-for="item in temperatures"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
               </el-option>
             </el-select>
         </el-form-item>
         <el-form-item label="糖度">
            <el-select v-model="commoditySet.type" placeholder="请选择">
               <el-option
                 v-for="item in types"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
               </el-option>
             </el-select>
         </el-form-item>

         <el-form-item label="图片路径">
            <el-input v-model="commoditySet.imgUrl"/>
         </el-form-item>

         <el-form-item label="商品描述">
            <el-input v-model="commoditySet.description"/>
         </el-form-item>

         <el-form-item prop="name" label="上传图片：">
            <div class="upload-wrapper">
              <div class="avatar-uploader">
                <el-upload
                  class="avatar-uploader"
                  :action="fileUrl"
                  :show-file-list="false"
                  :on-success="onUploadSuccess">
                  <div class="upload-inner-wrapper">
                    <img v-if="commoditySet.imgUrl" :src="commoditySet.imgUrl"  class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div v-if="!commoditySet.imgUrl" class="text">上传商品图片实例</div>
                  </div>
                </el-upload>
              </div>
            </div>
          </el-form-item>
   
         <el-form-item>
            <el-button type="primary" @click="saveOrUpdate">保存</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>
<script>
import AdminApi from '@/api/list'

const List={
   name:'',
   parentId:null,
   imgUrl:'',
   price:null,
   amount:null,
   temperature:4,
   type:4,
   description:''
}

export default {
   data() {
      return {
         options:[],
         commoditySet:List,
         temperatures:[
            {
            name:"无常温",
            id:0},
            {
            name:"无加冰",
            id:1},
            {
            name:"无加热",
            id:2},
            {
            name:"全无",
            id:3},
            {
            name:"全有",
            id:4},
         ],
         types:[
            {
            name:"无正常",
            id:0},
            {
            name:"无少糖",
            id:1},
            {
            name:"无多糖",
            id:2},
            {
            name:"全无",
            id:3},
            {
            name:"全有",
            id:4},
         ],
         fileUrl:'http://localhost:8204/api/oss/file/fileUpload?fileHost=commodityImg',
      }
   },
   created() {//页面渲染之前执行
      //获取路由id值
      //调用接口得到医院设置信息
      this.init()
      if(this.$route.params && this.$route.params.id) {
         const id = this.$route.params.id
         this.getHostSet(id)
      } else {
         //表单数据清空
         this.List = {}     
      }

   },
   methods: {
      init(){
         AdminApi.findAllType()
            .then(response=>{
               console.log(response.data)
               this.options = response.data
            })
      },

      onUploadSuccess(response, file){
         if(response.code !== 200) {
         this.$message.error("上传失败")
         return
         }
         console.log(file.response.data)
         // 填充上传文件列表
         this.commoditySet.imgUrl = file.response.data
      },

      //根据id查询
      getHostSet(id) {
         AdminApi.getCommodityById(id) 
            .then(response => {
               this.commoditySet = response.data
            })
      },
      //添加
      save() {
         console.log(this.commoditySet)
         AdminApi.saveCommoditySet(this.commoditySet)
            .then(response => {
               //提示
               this.$message({
                  type: 'success',
                  message: '添加成功!'
               })
               //跳转列表页面，使用路由跳转方式实现
               this.$router.push({path:'/hospSet/list'})
            })
      },
      //修改
      update() {
         AdminApi.saveCommoditySet(this.commoditySet)
            .then(response => {
               //提示
               this.$message({
                  type: 'success',
                  message: '修改成功!'
               })
               //跳转列表页面，使用路由跳转方式实现
               this.$router.push({path:'/hospSet/list'})
            })
      },
      saveOrUpdate() {
         //判断添加还是修改
         if(!this.commoditySet.id) { //没有id，做添加
            this.save();
         }else {//修改
            this.update()
         }
      }
   }
}
</script>

<style>
   .upload-inner-wrapper {
    width: 160px;
    height: 125px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    color: #4990f1;
    font-size: 14px;
    margin-top: 5px
}
   .avatar{
      width: 100px;
      height: 100px;
   }
</style>