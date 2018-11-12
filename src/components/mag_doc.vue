<template>
  <div class="right-body">
    <div class="oil-title clearfix">
      <div class="oil-title-2">单证管理</div>
    </div>
    <div class="index-form">
      <el-form :inline="true" :model="form" class="demo-form-inline" label-position="top">
        <el-form-item label="商检报告编号">
            <el-input v-model="form.billno" clearable placeholder="请输入商检报告编号"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-autocomplete
            v-model="form.billno"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入商检报告编号"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item> -->
        <el-form-item>
            <el-button type="primary" @click="handleCurrentChange(1)" class="quirey-btn">查询</el-button>
        </el-form-item>    
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%" class="tableDoc">
      <el-table-column
        prop="billno"
        label="商检报告编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="oilseed"
        label="油种"
        width="180">
      </el-table-column>
      <el-table-column
        prop="appoint_enterprise_name"
        label="委托方">
      </el-table-column>
      <el-table-column
        label="提单日">
        <template slot-scope="scope">
          {{scope.row.bill_lading_date|fmtDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="bill_lading_ton"
        label="提单量（吨）">
      </el-table-column>
       <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <!-- <router-link :to="{path:'/rep-display',query:{bgId:scope.row.ID,rwId:scope.row.insp_app_id,uuid:scope.row.uuid,oilseed:scope.row.oilseed}}">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </router-link> -->
         <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="Number(form.pageNum)"
      @current-change="handleCurrentChange"
      :total='pageTotal'>
    </el-pagination>
  </div>
  </template>

<script>
import API from '@/api/api.js';

export default {
  data() {
    return {
      tableData: [
      ],
      form:{
      pageNum:"1",
      billno:""
      },
      pageTotal:0,
      restaurants: [],
        timeout:  null
    }
  },
  mounted(){
    this.getRepList();
    // this.restaurants = this.loadAll();
  },
  methods: {
    getRepList(){
       console.log('接口',API.TASK);
      this.$http(API.REP_LIST, this.form).then(res => {
        console.log('数据',res);
        this.pageTotal=Number(res.data.total); 
        let transData = res.data.datas;
        this.tableData=transData;
      })
    },
    
    // <--------   模糊查询   start---------->

    // loadAll() {
    //   this.$http(QUERY_BILL,form.billno).then(res =>{
    //     let resultNum=res.data.datas.billnoList;
    //     return resultNum;
    //   }
    //   )
    // },
    // querySearchAsync(queryString, cb) {
    //     var restaurants = this.restaurants;
    //     var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

    //     clearTimeout(this.timeout);
    //     this.timeout = setTimeout(() => {
    //       cb(results);
    //     }, 3000 * Math.random());
    //   },
    //   createStateFilter(queryString) {
    //     return (state) => {
    //       return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    //     };
    //   },
    //   handleSelect(item) {
    //     console.log(item);
    //   }
    // },

    // <--------   模糊查询   end---------->

    handleCurrentChange(pageNum){
      console.log(pageNum);
      this.form.pageNum = pageNum;
      this.getRepList();
    },
    handleClick(row){
     this.$router.push({
          path:"/rep-display",
          query:{
            rwId:row.insp_app_id,
            bgId:row.ID,
            uuid:row.uuid,
            status:row.state,
            oilseed:row.oilseed=='汽油'?'1':'2'
            }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/_common.scss';
.index-form {
  padding: 10px;
  margin-top: 10px;
  overflow: hidden;
}
.index-form .el-form-item{
  margin-bottom: 0;
}
.w-434 {
  width: 434px;
}
.index-form-last {
  float: right;
}
.index-table{
  margin-top: 30px;
}
.oil-title{
  height: 74px;
  line-height: 74px;
  border-bottom: 1px solid rgba(234,237,243,1);
}
.oil-title-2{
  float:left;
  font-size: 22px;
  font-weight: bold;
  color:#3E3F42;
}
.creat-btn{
  float:right;
  margin-top: 19px;
}
.quirey-btn{
  margin-top: 40px;
  width: 120px;
}
.right-body .el-pagination{
    padding: 0;
    margin:32px 0;
    text-align: center;
  }
.right-body .index-form{
    padding-left: 0px;
}
table td:first-of-type{
  padding-left: 10px;
}
.tableDoc{
  border: 1px solid #eaedf3;
  border-bottom: none;
  border-radius: 4px;
}
</style>

