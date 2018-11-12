<template>
  <div class="right-body">
    <div class="oil-title clearx">
        <div class="oil-title-2"> 
          <router-link to="/mag-doc">
              <span>单证管理</span>
          </router-link>
          <i class="el-icon-arrow-right"></i>
          <span>我的商检报告</span>
      </div>
    </div>
      <div class="btns">
        <!-- <router-link :to="{path:'/rep-edit',query:{rwId:rwId,bgId:bgId,uuid:uuid,oilseed:oilseed}}">
          <div class="btns-right">
            <em>修改</em> 
          </div>
        </router-link> -->
          <div class="btns-right" @click="handleClick">
            <em>修改</em> 
          </div>
      </div>
      <!-- </el-form-item> -->
      <table class="task" cellspacing="0" cellpadding="0">
          <tr>
            <td colspan="4">任务概况</td>
          </tr>
          <tr>
            <td>委托方：</td>
            <td colspan="3">{{taskDet.appoint_enterprise_name}}</td>
          </tr>
          <tr>
            <td>数量：</td>
            <td>{{taskDet.num}} {{taskDet.quantity_unit_code}}</td>
            <td>油种：</td>
            <td>{{taskDet.oilseed}}</td>
          </tr>
          <tr>
            <td>规格：</td>
            <td>{{taskDet.specifications}}</td>
            <td>装期：</td>
            <td>{{taskDet.laycan_start_date|fmtTime}}-{{taskDet.laycan_end_date|fmtTime}}</td>
          </tr>
      </table>
      <div class="reportNum">
           <span>商检报告编号：</span>
           <span>{{detData.billno}}</span>
      </div>
     <table class="oilNum" cellspacing="0" cellpadding="0">
          <tr>
              <td colspan="5">数量</td>
          </tr>
          <tr>
              <td>
                <div>提单量（吨）：</div>
                <div>{{detData.billLadingTon}}</div>
              </td>
              <td>
                <div>提单量（桶）：</div>
                <div>{{detData.billLadingBucket}}</div>
              </td>
              <td>
                <div>船检量（吨）：</div>
                <div>{{detData.shipInspectionTon}}</div>
              </td>
              <td>
                <div>船检量（桶）：</div>
                <div>{{detData.shipInspectionBucket}}</div>
              </td>
              <td>
                <div>提单日：</div>
                <div>{{detData.billLadingDate|fmtDate}}</div>
              </td>
          </tr>
     </table>
     <table class="oilNum" cellspacing="0" cellpadding="0" v-if='oilseed=="1"'>
          <tr>
              <td colspan="5">汽油品质</td>
          </tr>
          <tr>
              <td>
                <div>密度：</div>
                <div>{{detData.gasolineDensity}}</div>
              </td>
              <td>
                <div>终馏点：</div>
                <div>{{detData.gasolineBoilingPoint}}</div>
              </td>
              <td>
                <div>蒸气压：</div>
                <div>{{detData.gasolineVaporTension}}</div>
              </td>
              <td>
                <div>诱导期：</div>
                <div>{{detData.gasolineInductionPeriod}}</div>
              </td>
              <td>
                <div>硫含量：</div>
                <div>{{detData.gasolineSulfurContent}}</div>
              </td>
          </tr>
          <tr>
              <td>
                <div>含氧量：</div>
                <div>{{detData.gasolineOxygenContent}}</div>
              </td>
              <td>
                <div>胶质：</div>
                <div>{{detData.gasolineGum}}</div>
              </td>
              <td>
                <div>馏程：</div>
                <div>{{detData.gasolineDistillation}}</div>
              </td>
              <td>
                <div>氧化安定性：</div>
                <div>{{detData.gasolineOxidationStability}}</div>
              </td>
              <td>
                <div>水溶性酸或碱：</div>
                <div>{{detData.gasolineAcidAlkali}}</div>
              </td>
          </tr>
           <tr>
              <td>
                <div>铜片腐蚀：</div>
                <div>{{detData.gasolineCopperCorrosion}}</div>
              </td>
              <td>
                <div>辛烷值（RON研究法）：</div>
                <div>{{detData.gasolineOctaneNumber}}</div>
              </td>
              <td colspan="3">  
              </td>
          </tr>
     </table>
     <table class="oilNum" cellspacing="0" cellpadding="0" v-if='oilseed=="2"'>
          <tr>
              <td colspan="5">柴油品质</td>
          </tr>
          <tr>
              <td>
                <div>密度：</div>
                <div>{{detData.dieseloilDensity}}</div>
              </td>
              <td>
                <div>十六烷值：</div>
                <div>{{detData.dieseloilCetaneValue}}</div>
              </td>
              <td>
                <div>闪点：</div>
                <div>{{detData.dieseloilFlashPoint}}</div>
              </td>
              <td>
                <div>硫含量：</div>
                <div>{{detData.dieseloilSulfurContent}}</div>
              </td>
              <td>
                <div>灰分：</div>
                <div>{{detData.dieseloilAsh}}</div>
              </td>
          </tr>
          <tr>
              <td>
                <div>铜片腐蚀：</div>
                <div>{{detData.dieseloilCopperCorrosion}}</div>
              </td>
              <td>
                <div>闭口闪点：</div>
                <div>{{detData.dieseloilClosingFlash}}</div>
              </td>
              <td>
                <div>酸度：</div>
                <div>{{detData.dieseloilAcidity}}</div>
              </td>
              <td>
                <div>凝点：</div>
                <div>{{detData.dieseloilCondensationPoint}}</div>
              </td>
              <td>
                <div>水分：</div>
                <div>{{detData.dieseloilWaterContent}}</div>
              </td>
          </tr>
           <tr>
              <td>
                <div>运动粘度：</div>
                <div>{{detData.dieseloilViscosity}}</div>
              </td>
              <td colspan="4">  
              </td>
          </tr>
     </table>
     <div class="remark">
        <div>备注 Remark：</div>
        <div>{{detData.remark}}</div>
     </div>
     <div class="contact">
        <div>
          <p>联系人：</p>
          <p>{{detData.linkman}}</p>
        </div>
        <div>
          <p>联系电话：</p>
          <p>{{detData.contactNumber}}</p>
        </div>
     </div>
    <!-- </el-form> -->
    <div class="attach"><span>附件</span></div>
    <el-table
    :data="fjdata"
    style="width:100%" class="tab-attach">
      <el-table-column
        prop="name"
        label="附件名称" width="300">
      </el-table-column>
      <el-table-column
        label="上传时间" width="120">
        <template slot-scope="scope">
            {{scope.row.updateDate|fmtDate}}
        </template>
      </el-table-column>
      <el-table-column
      label="操作" width="458">
      <template slot-scope="scope">
        <el-button type="text" size="small"  @click="newWin(scope.$index, fjdata)">下载单证</el-button>
        <el-button type="text" size="small"  @click="newWin(scope.$index, fjdata)">查看</el-button>
        <el-button type="text" @click.native.prevent="deleteRow(scope.$index, fjdata)" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
</div>
</template>


<script>
import API from '@/api/api.js';

export default {
  data() {
    return {
     oilseed:this.$route.query.oilseed,
     fjdata:[],
     detData:{},
     taskDet:{},
     bgId:this.$route.query.bgId,
     rwId:this.$route.query.rwId,
     uuid:this.$route.query.uuid,
     status:this.$route.query.status
    }
  },
  mounted(){
    this.getRepData();
  },
  methods: {
    tranData(inputTime) {
      if (!inputTime) {
        return '';
      }
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return  y + "-" + m + "-" + d;
    },
     getRepData(){
        this.$http(API.REP_DET, {id:this.bgId},'get').then(res => {
          console.log(this.$route.query.bgId);
       let rdata=res.data;
        rdata.billLadingDate = this.tranData(rdata.billLadingDate);
        if(rdata) this.detData=rdata;
      });
      this.$http(API.TASK_DET,{id:this.rwId},"get").then(res =>{
        let mdata=res.data;
        if(mdata) this.taskDet=mdata;
      }
      );
      this.$http(API.LOOK_UP,{businessUuid:this.uuid},"get").then(res =>{
        let ndata=res.data;
        if(ndata) this.fjdata=ndata.datas;
      }
      );
    },
    newWin(index,data){
      let myhost="http://image.test.mycrudeoil.com/",
          path=myhost+data[index].path;
          window.open(path);
    },
    handleClick(){
       this.$router.push({
          path:"/rep-edit",
          query:{
            rwId:this.rwId,
            bgId:this.bgId,
            uuid:this.uuid,
            oilseed:this.oilseed,
            status:this.status
            }
        })
    },
    deleteRow(index, rows) {
      // console.log(index);
      let delData = this.fjdata[index];
      this.$http(API.FJ_DEL, {
        id: delData.id,
        createUser: delData.createUser
      }).then(res => {
        // console.log(res);
        rows.splice(index, 1);
      });
    }
    // deleteRow(index, rows) {
    //     rows.splice(index, 1);
    // }
  }
};
</script>
<style lang="scss" scoped>
@import '@/style/_common.scss';
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
  margin-top: 50px;
  width: 120px;
}
.right-body .el-pagination{
    padding: 0;
    margin:32px 0;
    text-align: center;
  }
  .demo-ruleForm{
    margin-top: 30px;
  }
  .upload{
    display:inline-block;
  }
  .task{
    background: #ffffff;
    border:1px solid rgba(234,237,243,1);
    width: 880px;
    font-size: 14px;
  }
  .task tr:nth-of-type(2) td{
    padding-top: 18px;
    padding-bottom: 8px;
  }
  .task tr:last-of-type td{
    padding-top: 8px;
    padding-bottom:20px;
  }
  .task tr:first-of-type td{
    border-bottom: 1px solid rgba(234,237,243,1);
    height: 50px;
    line-height: 50px;
    font-weight: bold;
  }
  .task td:nth-of-type(3){
    width: 50px;
  }
  .task td:first-of-type{
    width: 65px;
    padding-left: 20px;
  }
  .task td:nth-of-type(2){
    width: 404px;
    text-align: left;
  }
  .task tr:not(:first-of-type) td:nth-of-type(2n+1){
    color: #9EA0A5;
  }
 .btns{
   height: 40px;
   margin-top: 30px;
   margin-bottom: 20px;
  }
.btns-right em{
  display: block;
  height: 38px;
  line-height: 38px;
  width: 120px;
  border-radius: 4px;
  font-style:normal;
  border:1px solid #dcdfe6;
  text-align: center;
  background: #fff;
}
.reportNum{
  margin-top:10px;
  padding-top: 7px;
  padding-bottom: 7px;
}
.reportNum span:first-of-type{
  color: #9EA0A5;
}
.oilNum{
  margin-top: 10px;
  border-collapse: collapse;
  background: #ffffff;
  width: 880px;
}
.oilNum td{
  border: 1px solid #EAEDF3;
}
.oilNum tr:not(:first-of-type) td{
  width: 20%;
  padding-top: 14px;
  padding-bottom: 10px;
}
.oilNum td div:first-of-type{
  font-size: 12px;
  color: #9EA0A5;
  margin-bottom: 20px;
}
.oilNum tr:first-of-type td{
  height: 50px;
  text-align: left;
  font-weight: bold;
  padding-left: 20px;
}
.remark{
  padding-top: 17px;
  padding-bottom: 14px;
}
.remark div:first-of-type{
  font-size:12px;
  color: #9EA0A5;
  margin-bottom: 20px;
}
table tr:not(:first-of-type) td:first-of-type{
  padding-left: 20px;
}
table tr:not(:first-of-type) td:not(:first-of-type){
  padding-left: 10px;
}
table tr td:last-of-type{
  padding-right: 10px;
}
.task tr:not(:first-of-type) td:not(:first-of-type){
  padding-left:0px;
}
.remark{
  padding-left: 20px;
  padding-right: 20px;
  background: #ffffff;
  border: 1px solid rgba(234,237,243,1);
  margin-top: 10px;
}
.contact{
  padding-left: 20px;
  background: #ffffff;
  border: 1px solid rgba(234,237,243,1);
  border-top: none;
}
.contact div{
  display: inline-block;
  vertical-align: top;
}
.contact div:first-of-type{
  margin-right: 167px;
}
.contact p:first-of-type{
  font-size: 12px;
  color: #9EA0A5;
  margin-bottom: 20px;
}
.contact div:nth-of-type(2) p:last-of-type{
  padding-top:1px;
}
.person,.tel{
  display: inline-block;
}
.person{
  margin-right: 20px;
}
.attach{
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid #eaedf3;
  border-bottom: none;
  background: #ffffff;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #3E3F42;
  font-weight: bold;
}
.tab-attach{
  border: 1px solid #eaedf3;
  border-bottom: none;
}
.attach span:first-of-type{
  float: left;
}
.attach span:nth-of-type(2){
  float: right;
}
</style>

