<template>
  <div class="right-body">
    <div class="oil-title clearfix">
      <div class="oil-title-2">任务管理</div>
    </div>
    <div class="index-form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="top">
        <el-form-item label="油种">
            <el-select v-model="formInline.oilseed" clearable placeholder="请输入选择">
              <el-option label="汽油" value="1"></el-option>
              <el-option label="柴油" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商检状态">
            <el-select v-model="formInline.status" clearable placeholder="请输入选择">
              <el-option label="已确认" value="1"></el-option>
              <el-option label="已完成" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleCurrentChange(1)" class="quirey-btn">查询</el-button>
        </el-form-item>    
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%" class="tableTask">
      <el-table-column
        label="装期"
        width="180">
        <template slot-scope="scope">
          {{scope.row.laycan_start_date|fmtTime}}-{{scope.row.laycan_end_date|fmtTime}}
        </template>
      </el-table-column>
      <el-table-column
        prop="oilseed"
        label="油种"
        width="180">
      </el-table-column>
      <el-table-column
        prop='num'
        label="数量">
      </el-table-column>
      <el-table-column
        prop="appoint_enterprise_name"
        label="委托方">
      </el-table-column>
      <el-table-column
        label="商检状态">
        <template slot-scope="scope">
          <el-button :type="scope.row.status==='已完成'?'success':'warning'" @click="test1(scope.row)">{{ scope.row.status }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <!-- <router-link :to="{path:'/rep-edit',query:{rwId:scope.row.ID,bgId:scope.row.inspector_presentation_id,uuid:scope.row.tip_uuid,oilseed:scope.row.oilseed}}">
          <el-button @click="handleClick(scope.row)" type="text" size="small">录入</el-button>
        </router-link> -->
        <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.status=='已确认'">录入</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.status=='已完成'">查看</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="Number(formInline.pageNum)"
      @current-change="handleCurrentChange"
      :total='pageTotal'>
    </el-pagination>
  </div>
</template>
 
<script>
import API from "@/api/api.js";
// console.log ('API','API.TASK');

export default {
  data() {
    return {
      tableData: [],
      formInline: {
        pageNum: "1",
        oilseed: "",
        status: ""
      },
      taskStatus: ["已完成", "已确认"],
      pageTotal: 0
    };
  },
  mounted() {
    this.getTaskData();
  },
  methods: {
    test1(scope){
      console.log(scope);
    },
    getTaskData() {
      // console.log('接口',API.TASK);
      this.$http(API.TASK, this.formInline)
        .then(res => {
          this.pageTotal = Number(res.data.total);
          let rdata = res.data.datas;
          this.tableData = this.formateTableData(rdata); 
        })
        .catch(error => {
          console.log("异常", error);
        });
    },
    formateTableData(rdata) {
      for (let i = 0; i < rdata.length; i++) {
        // let item = rdata[i];
        // console.log(item);
        if (rdata[i].status === "1") {
          rdata[i].status = "已确认";
          // console.log(rdata[i].status);
        } else {
          rdata[i].status = "已完成";
        };
        rdata[i].num=rdata[i].num+" "+rdata[i].quantity_unit_code;
      }
      return rdata;
    },
    handleCurrentChange(pageNum) {
      // console.log(pageNum,"NNNNNNNNNNNNNNNNNNNN");
      this.formInline.pageNum = pageNum;
      this.getTaskData();
    },
    handleClick(row) {
      if(row.status=="已确认"){
        row.status=1;
        this.$router.push({
          path:"/rep-edit",
           query:{
            rwId:row.ID,
            bgId:row.insp_pre_id,
            uuid:row.tip_uuid,
            status:row.tipstatus,
            dealNo:row.deal_no,
            oilseed:row.oilseed=='汽油'?'1':'2'}
      })
      }else{
         row.status=2;
        this.$router.push({
          path:"/rep-display",
           query:{
            rwId:row.ID,
            bgId:row.insp_pre_id,
            uuid:row.tip_uuid,
            status:row.tipstatus,
            dealNo:row.deal_no,
            oilseed:row.oilseed=='汽油'?'1':'2'}
      })
      };
    }
  },
  computed:{

  }
};
</script>

<style lang="scss" scoped>
@import "@/style/_common.scss";
.index-form {
  padding: 10px 0;
  margin-top: 10px;
  overflow: hidden;
}
.index-form .el-form-item {
  margin-bottom: 0;
}
.w-434 {
  width: 434px;
}
.index-form-last {
  float: right;
}
.index-table {
  margin-top: 30px;
}
.oil-title {
  height: 74px;
  line-height: 74px;
  border-bottom: 1px solid rgba(234, 237, 243, 1);
}
.oil-title-2 {
  float: left;
  font-size: 22px;
  font-weight: bold;
  color: #3e3f42;
}
.creat-btn {
  float: right;
  margin-top: 19px;
}
.quirey-btn {
  margin-top: 40px;
  width: 120px;
}
.right-body .el-pagination {
  padding: 0;
  margin: 32px 0;
  text-align: center;
}
.tableTask{
  border: 1px solid #eaedf3;
  border-bottom: none;
  border-radius: 4px;
}
</style>

