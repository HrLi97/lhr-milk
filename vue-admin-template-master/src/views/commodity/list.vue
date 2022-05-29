<template>
  <div class="app-container">
      医院设置列表
      <el-form :inline="true" class="demo-form-inline">
         <el-form-item>
            <el-input  v-model="searchObj.commodityName" placeholder="商品名称"/>
         </el-form-item>
         <el-form-item>
            <el-input v-model="searchObj.commodityType" placeholder="类别名称"/>
         </el-form-item>
         <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      </el-form>

      <!-- 工具条 -->
      <div>
         <el-button type="danger" size=""">批量删除</el-button>
      </div>

      <el-table
      :data="list" stripe style="width: 100%" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55"/>
         <el-table-column type="index" width="50" label="序号"/>
         <el-table-column prop="name" label="商品名称"/>
         <el-table-column prop="amount" label="商品销量"/>
         <el-table-column prop="price" label="价格" width="60"/>
         <el-table-column  label="是否热销">
               <template slot-scope="scope">
                  {{ scope.row.isHot === 200 ? '爆款' : '' }}
               </template>
         </el-table-column>
         <el-table-column prop="" label="是否新品">
               <template slot-scope="scope">
                  {{ scope.row.isNew === 100 ? '新品' : '' }}
               </template>
      </el-table-column>
         <el-table-column label="类型" width="100">
            <template slot-scope="scope">
               {{ scope.row.param.type}}
            </template>
         </el-table-column>

         <el-table-column label="操作" width="360" align="center">
            <template slot-scope="scope">
               <el-button v-if="scope.row.isNew!==100" type="primary" size="mini" 
               icon="el-icon-success" @click="changeNew(scope.row.id)">新款</el-button>
               <el-button v-if="scope.row.isHot!==200" type="success" size="mini" 
                  icon="el-icon-success" @click="changeHot(scope.row.id)">爆款</el-button>
                  <el-button v-if="scope.row.isHot===200||scope.row.isNew===100" type="warning" size="mini" 
                  icon="el-icon-warning" @click="cancelHotNew(scope.row.id)">取消</el-button>
            <router-link :to="'/commodity/edit/'+scope.row.id">
               <el-button type="danger" size="mini" icon="el-icon-edit"></el-button>
            </router-link>

            </template>
         </el-table-column>

      </el-table>
      <!-- 分页 -->
      <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"/>

   </div>
</template>
<script>
//引入接口定义的js文件
import AdminApi from '@/api/list'
export default {
   //定义变量和初始值
   data() {
      return {
         current:1, //当前页
         limit:5, //每页显示记录数
         searchObj:{}, //条件封装对象
         list:[], //每页数据集合
         total:0, //总记录数
         multipleSelection: [] // 批量选择中选择的记录列表
      }
   },
   created() {
      this.getList()
   },
   methods: {
      changeNew(id){
         this.$confirm('是否添加为新款', '添加操作', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(r=>{
         AdminApi.changeNew(id)
            .then(response=>{
              this.getList(this.current)
              this.$message({
                type:'info',
                message:"添加成功"
              }) 
            })
        }).catch(r=>{
          this.$message({
                type:'info',
                message:"已经取消操作"
              })
        })
      },
      changeHot(id){
         this.$confirm('是否添加为爆款', '添加操作', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(r=>{
         AdminApi.changeHot(id)
            .then(response=>{
              this.getList(this.current)
              this.$message({
                type:'info',
                message:"添加成功"
              }) 
            })
        }).catch(r=>{
          this.$message({
                type:'info',
                message:"已经取消操作"
              })
        })
      },
      cancelHotNew(id){
         this.$confirm('是否取消', '取消操作', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(r=>{
         AdminApi.cancelHotNew(id)
            .then(response=>{
              this.getList(this.current)
              this.$message({
                type:'info',
                message:"取消成功"
              }) 
            })
        }).catch(r=>{
          this.$message({
                type:'info',
                message:"已经取消操作"
              })
        })
      },
      //获取选择复选框的id值
      handleSelectionChange(selection) {
         this.multipleSelection = selection
      },

      getList(page=1) { //添加当前页参数
         this.current = page
         AdminApi.showAll(this.current,this.limit,this.searchObj)
            .then(response=>{
               console.log(response.data)
               // 返回集合赋值list
               this.list = response.data.records
               //总记录数
               this.total = response.data.total
            })
      },
   }
}
</script>