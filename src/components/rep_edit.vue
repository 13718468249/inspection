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
    <el-form 
      :model="ruleForm" 
      ref="ruleForm"
      :rules="rules"
      label-width="100px" 
      :show-message="false" 
      class="demo-ruleForm" 
      label-position="top"
      @validate="checkRule">
      <el-form-item>
        <div class="btns-left">
          <!-- <router-link :to="{path:'/upload',query:{rwId:rwId,bgId:bgId,uuid:uuid,oilseed:oilseed}}">
            <el-button >上传附件</el-button>
          </router-link> -->
          <el-button @click="getBgid(ruleForm)">上传附件</el-button>
        </div>
        <div class="btns-right">
          <el-button @click="saveForm(ruleForm)" v-if="!(status=='1')">暂存</el-button>
          <el-button type="primary" @click="submitForm(ruleForm)">确认提交</el-button> 
        </div> 
      </el-form-item>
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
          <el-form-item label="商检报告编号:" prop="billno">
            <el-input maxlength="15" v-model="ruleForm.billno" class="ipt-report"></el-input>
          </el-form-item>
      </div>
     <table class="oilNum" cellspacing="0" cellpadding="0">
          <tr>
              <td colspan="5">数量</td>
          </tr>
          <tr>
              <td>
                <el-form-item label="提单量（吨）：" prop="billLadingTon">
                  <el-input maxlength="15" v-model.number="ruleForm.billLadingTon" class="ipt-billD"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="提单量（桶）：" prop="billLadingBucket">
                  <el-input maxlength="15" v-model.number="ruleForm.billLadingBucket" class="ipt-billT"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="船检量（吨）：" prop="shipInspectionTon">
                  <el-input maxlength="15" v-model.number="ruleForm.shipInspectionTon" class="ipt-shipD"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="船检量（桶）：" prop="shipInspectionBucket">
                  <el-input maxlength="15" v-model.number="ruleForm.shipInspectionBucket" class="ipt-shipT"></el-input>
                </el-form-item>
              </td>
              <td>
                 <el-form-item label="提单日：" prop="billLadingDate">
                    <el-date-picker
                      v-model='ruleForm.billLadingDate'
                      :clearable="false"
                      placeholder="">
                    </el-date-picker>
                </el-form-item> 
              </td>
          </tr>
     </table>
     <table class="oilNum" cellspacing="0" cellpadding="0"  v-if="oilseed=='1'">
          <tr>
              <td colspan="5">汽油品质</td>
          </tr>
          <tr>
              <td>
                <el-form-item label="密度：" prop="gasolineDensity">
                  <el-input maxlength="15" v-model.number="ruleForm.gasolineDensity" class="ipt-billD"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="终馏点：" prop="gasolineBoilingPoint">
                  <el-input maxlength="15" v-model.number="ruleForm.gasolineBoilingPoint" class="ipt-billT"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="蒸汽压：" prop="gasolineVaporTension">
                  <el-input maxlength="15" v-model.number="ruleForm.gasolineVaporTension" class="ipt-shipD"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="诱导期：" prop="gasolineInductionPeriod">
                  <el-input maxlength="15" v-model.number="ruleForm.gasolineInductionPeriod" class="ipt-shipT"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="硫含量：" prop="gasolineSulfurContent">
                  <el-input maxlength="15" v-model.number="ruleForm.gasolineSulfurContent" class="ipt-billLad"></el-input>
                </el-form-item>
              </td>
          </tr>
          <tr>
              <td>
                <el-form-item label="含氧量：" prop="gasolineOxygenContent">
                  <el-input maxlength="15" v-model.number="ruleForm.gasolineOxygenContent" class="ipt-billD"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="胶质：" prop="gasolineGum">
                  <el-input maxlength="15" v-model.number="ruleForm.gasolineGum" class="ipt-billT"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="馏程：" prop="gasolineDistillation">
                  <el-input maxlength="15" v-model.number="ruleForm.gasolineDistillation" class="ipt-shipD"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="氧化安定性：" prop="gasolineOxidationStability">
                  <el-input maxlength="15" v-model.number="ruleForm.gasolineOxidationStability" class="ipt-shipT"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="水溶性酸或碱：" prop="gasolineAcidAlkali">
                  <el-input maxlength="15" v-model="ruleForm.gasolineAcidAlkali" class="ipt-billLad"></el-input>
                </el-form-item>
              </td>
          </tr>
           <tr>
              <td>
                <el-form-item label="铜片腐蚀：" prop="gasolineCopperCorrosion">
                  <el-input maxlength="15" v-model="ruleForm.gasolineCopperCorrosion" class="ipt-billD"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="辛烷值（RON研究法）：" prop="gasolineOctaneNumber">
                  <el-input maxlength="15" v-model.number="ruleForm.gasolineOctaneNumber" class="ipt-billT"></el-input>
                </el-form-item>
              </td>
              <td colspan="3">  
              </td>
          </tr>
     </table>
     <table class="oilNum" cellspacing="0" cellpadding="0"  v-if="oilseed=='2'">
          <tr>
              <td colspan="5">柴油品质</td>
          </tr>
          <tr>
              <td>
                <el-form-item label="密度：" prop="dieseloilDensity">
                  <el-input maxlength="15" v-model.number="ruleForm.dieseloilDensity" class="ipt-billD"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="十六烷值：" prop="dieseloilCetaneValue">
                  <el-input maxlength="15" v-model.number="ruleForm.dieseloilCetaneValue" class="ipt-billT"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="闪点：" prop="dieseloilFlashPoint">
                  <el-input maxlength="15" v-model.number="ruleForm.dieseloilFlashPoint" class="ipt-shipD"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="硫含量：" prop="dieseloilSulfurContent">
                  <el-input maxlength="15" v-model.number="ruleForm.dieseloilSulfurContent" class="ipt-shipT"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="灰分：" prop="dieseloilAsh">
                  <el-input maxlength="15" v-model.number="ruleForm.dieseloilAsh" class="ipt-billLad"></el-input>
                </el-form-item>
              </td>
          </tr>
          <tr>
              <td>
                <el-form-item label="铜片腐蚀：" prop="dieseloilCopperCorrosion">
                  <el-input maxlength="15" v-model="ruleForm.dieseloilCopperCorrosion" class="ipt-billD"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="闭口闪点：" prop="dieseloilClosingFlash">
                  <el-input maxlength="15" v-model.number="ruleForm.dieseloilClosingFlash" class="ipt-billT"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="酸度：" prop="dieseloilAcidity">
                  <el-input maxlength="15" v-model.number="ruleForm.dieseloilAcidity" class="ipt-shipD"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="凝点：" prop="dieseloilCondensationPoint">
                  <el-input maxlength="15" v-model="ruleForm.dieseloilCondensationPoint" class="ipt-shipT"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="水分：" prop="dieseloilWaterContent">
                  <el-input maxlength="15" v-model.number="ruleForm.dieseloilWaterContent" class="ipt-billLad"></el-input>
                </el-form-item>
              </td>
          </tr>
           <tr>
              <td>
                <el-form-item label="运动粘度：" prop="dieseloilViscosity">
                  <el-input maxlength="15" v-model.number="ruleForm.dieseloilViscosity" class="ipt-billD"></el-input>
                </el-form-item>
              </td>
              <td colspan="4">  
              </td>
          </tr>
     </table>
     <div class="remark">
        <el-form-item label="备注 Remark：" prop="remark">
          <el-input v-model="ruleForm.remark" class="ipt-report"></el-input>
        </el-form-item>
     </div>
     <div class="contact">
        <el-form-item label="联系人：" prop="linkman" class="person">
          <el-input v-model="ruleForm.linkman" class="ipt-report"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="contactNumber" class="tel">
          <el-input v-model="ruleForm.contactNumber" class="ipt-report"></el-input>
        </el-form-item>
     </div>
    </el-form>
    <div class="attach"><span>附件</span></div>
    <el-table
    :data="fjdata"
    style="width: 100%" class="tab-attach">
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
        <el-button type="text" size="small" @click="newWin(scope.$index, fjdata)">查看</el-button>
        <el-button type="text" @click.native.prevent="deleteRow(scope.$index, fjdata)" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
</template>

<script>
import API from "@/api/api.js";
const one = /^(([1-9][0-9]*)|(([0]\.\d{1}|[1-9][0-9]*\.\d{1})))$/;
const two = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
const three = /^(([1-9][0-9]*)|(([0]\.\d{1,3}|[1-9][0-9]*\.\d{1,3})))$/;
const four = /^(([1-9][0-9]*)|(([0]\.\d{1,4}|[1-9][0-9]*\.\d{1,4})))$/;
// 限制只能是全是数字或者是字母、数字组合
// const bianhao = /^(?![a-zA-Z]+$)[0-9a-zA-Z]*$|^\d*$/;
// 限制只能是数字，只能字母或数字、字母组合
const bianhao = /^[0-9a-zA-Z]*$|^\d*$/;
const qfushi=/^[0-9a-zA-Z][0-9a-zA-Z]$/;
const cfushi=/^[0-9a-zA-Z][0-9a-zA-Z]$/;
const dayu=/^(([5-9]\d{2})|(48[1-9])|(49\d)|([1-9]\d{3,}))$/;
const all=/./;
export default {
  data() {
    return {
      state1: "",
      bgId: this.$route.query.bgId,
      rwId: this.$route.query.rwId,
      uuid: this.$route.query.uuid,
      status:this.$route.query.status,
      transnum:this.$route.query.dealNo,
      createDate:'',
      updateDate:'',
      createUser:'',
      updateUser:'',
      fjdata: [],
      taskDet: {},
      oilseed: this.$route.query.oilseed,
      dealNo:'',
      ruleForm: {
        billLadingBucket: null,
        billLadingDate: "",
        billLadingTon: null,
        billno: null,
        contactNumber: null,
        dealNo: null,
        dieseloilAcidity: null,
        dieseloilAsh: null,
        dieseloilCetaneValue: null,
        dieseloilClosingFlash: null,
        dieseloilCondensationPoint: null,
        dieseloilCopperCorrosion: null,
        dieseloilDensity: null,
        dieseloilFlashPoint: null,
        dieseloilSulfurContent: null,
        dieseloilViscosity: null,
        dieseloilWaterContent: null,
        gasolineAcidAlkali: null,
        gasolineBoilingPoint: null,
        gasolineCopperCorrosion: null,
        gasolineDensity: null,
        gasolineDistillation: null,
        gasolineGum: null,
        gasolineInductionPeriod: null,
        gasolineOctaneNumber: null,
        gasolineOxidationStability: null,
        gasolineOxygenContent: null,
        gasolineSulfurContent: null,
        gasolineVaporTension: null,
        linkman: null,
        remark: null,
        shipInspectionBucket: null,
        shipInspectionTon: null
      },
      rules: {
        billno: [{ message: "输入格式错误", pattern: bianhao }],
        gasolineDensity: [
          { message: "请输入不超过一位小数的数字", pattern: one }
        ],
        gasolineInductionPeriod:[
          { message: "请输入大于480的数字", pattern: dayu }
        ],
        gasolineOctaneNumber: [
          { message: "请输入不超过一位小数的数字", pattern: one }
        ],
        gasolineOxidationStability: [
          { message: "请输入不超过一位小数的数字", pattern: one }
        ],
        billLadingTon: [
          { message: "请输入不超过三位小数的数字", pattern: three }
        ],
        gasolineCopperCorrosion:[
          { message: "输入格式错误", pattern: qfushi }
        ],
        dieseloilCopperCorrosion:[
          { message: "输入格式错误", pattern: cfushi}
        ],
        billLadingBucket: [
          { message: "请输入不超过两位小数的数字", pattern: two }
        ],
        shipInspectionTon: [
          { message: "请输入不超过三位小数的数字", pattern: three }
        ],
        shipInspectionBucket: [
          { message: "请输入不超过两位小数的数字", pattern: two }
        ],
        billLadingDate: [{ pattern: all  }],
        gasolineBoilingPoint: [
          { message: "请输入不超过一位小数的数字", pattern: one }
        ],
        dieseloilSulfurContent:[
          { message: "请输入不超过一位小数的数字", pattern: one }
        ],
        gasolineVaporTension: [
          { message: "请输入不超过一位小数的数字", pattern: one }
        ],
        gasolineSulfurContent: [
          { message: "请输入不超过一位小数的数字", pattern: one }
        ],
        gasolineOxygenContent: [
          { message: "请输入不超过两位小数的数字", pattern: two }
        ],
        gasolineGum: [{ message: "请输入不超过一位小数的数字", pattern: one }],
        gasolineDistillation: [
          { message: "请输入不超过一位小数的数字", pattern: one }
        ],
        gasolineAcidAlkali:[{pattern: all}],
        gasolineDistillation: [
          { message: "请输入不超过一位小数的数字", pattern: one }
        ],
        dieseloilDensity: [
          { message: "请输入不超过四位小数的数字", pattern: four }
        ],
        dieseloilCetaneValue: [
          { message: "请输入不超过一位小数的数字", pattern: one }
        ],
        dieseloilFlashPoint: [
          { message: "请输入不超过一位小数的数字", pattern: one }
        ],
        dieseloilCondensationPoint:[
          {pattern:all}
        ],
        kong: [{ message: "请输入不超过一位小数的数字", pattern: one }],
        dieseloilAsh: [
          { message: "请输入不超过三位小数的数字", pattern: three }
        ],
        dieseloilClosingFlash: [
          { message: "请输入不超过一位小数的数字", pattern: one }
        ],
        dieseloilAcidity: [
          { message: "请输入不超过三位小数的数字", pattern: three }
        ],
        dieseloilWaterContent: [
          { message: "请输入不超过一位小数的数字", pattern: one }
        ],
        dieseloilViscosity: [
          { message: "请输入不超过三位小数的数字", pattern: three }
        ],
        remark:[{pattern:all}],
        linkman:[{pattern:all}],
        contactNumber:[{pattern:all}]
      }
    };
  },
  mounted() {
    this.getRepData();
  },

  methods: {
    tranData(inputTime) {
      if (!inputTime) {
        return "";
      }
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    // warn(num) {
    //   let anum = Number(num);
    //   let ifNum = isNaN(anum);
    //   if (ifNum || (!ifNum && anum < 480)) {
    //     this.$message({
    //       type: "error",
    //       message: "请输入大于480的数字"
    //     });
    //   }
    // },
    getRepData() {
      this.$http(API.REP_DET, { id: this.bgId }, "get").then(res => {
        let rdata = res.data;
        this.dealNo=rdata.dealNo?rdata.dealNo:this.transnum;
        this.createDate=rdata.createDate;
        this.createUser=rdata.createUser;
        this.updateDate=rdata.updateDate;
        this.updateUser=rdata.updateUser;
        rdata.billLadingDate = this.tranData(rdata.billLadingDate);
        if (rdata) this.ruleForm = rdata;
      });
      this.$http(API.TASK_DET, { id: this.rwId}, "get").then(res => {
        let mdata = res.data;
        if (mdata) this.taskDet = mdata;
      });
      this.$http(API.LOOK_UP, { businessUuid: this.uuid, }, "get").then(res => {
        let ndata = res.data;
        if (ndata) this.fjdata = ndata.datas;
      });
    },
    checkRule(prop, result) {
      if (!result) {
        let msg = this.rules[prop][0].message;
        this.$message({
          type: "error",
          message: msg
        });
      }
    },
    resultOfReq(status, str) {
      if (status) {
        this.$message({
          type: "error",
          message: `${str}失败`
        });
      } else {
        this.$message({
          type: "success",
          message: `${str}成功`
        });
      }
    },
    submitData(formName) {
      formName.inspAppId = this.rwId;
      formName.id = this.bgId;
      formName.uuid=this.uuid;
      formName.dealNo=this.dealNo;
      formName.createDate=this.createDate;
      formName.updateDate=this.updateDate;
      formName.createUser=this.createUser;
      formName.updateUser=this.updateUser;
      this.$http(API.DET_SUBMIT, formName)
        .then(res => {
          let status = res.data.status;
          this.bgId=res.data.datas.id;
          this.uuid=res.data.datas.uuid;
          this.resultOfReq(status, "提交");
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "提交失败"
          });
        });
    },
    submitForm(formName) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.submitData(formName);
        } else {
          this.$message({
            type: "error",
            message: "提交失败"
          });
          return false;
        }
      });
    },
    saveForm(formName) {
      // console.log(formName);
      formName.inspAppId = this.rwId;
      formName.id = this.bgId;
      formName.uuid=this.uuid;
      formName.dealNo=this.dealNo;
      formName.createDate=this.createDate;
      formName.updateDate=this.updateDate;
      formName.createUser=this.createUser;
      formName.updateUser=this.updateUser;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$http(API.TEM_STORE, formName)
            .then(res => {
              // this.$message({
              //   type: "success",
              //   message: "保存成功"
              // });
              this.bgId=res.data.datas.id;
              this.uuid=res.data.datas.uuid;
              let status = res.data.status;
              this.resultOfReq(status, "保存");
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "保存失败"
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "保存失败"
          });
          return false;
        }
      });
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
    },
    getBgid(formName) {
        formName.inspAppId = this.rwId;
        formName.id = this.bgId;
        formName.uuid=this.uuid;
        formName.dealNo=this.dealNo;
        formName.createDate=this.createDate;
        formName.updateDate=this.updateDate;
        formName.createUser=this.createUser;
        formName.updateUser=this.updateUser;
        this.$http(API.TEM_STORE, formName).then(res => {
          this.uuid = res.data.datas.uuid;
          this.bgId = res.data.datas.id;
          this.$router.push({
            path: "/upload",
            query: {
              rwId: this.rwId,
              bgId: this.bgId,
              uuid: this.uuid,
              oilseed: this.oilseed,
              status:this.status,
              dealNo:this.dealNo,
            }
          });
        });
    },
    newWin(index, data) {
      let myhost = "http://image.test.mycrudeoil.com/",
        path = myhost + data[index].path;
      window.open(path);
    },
    // handleClick(row) {},
    uploadUrl() {}
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/_common.scss";
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
  margin-top: 50px;
  width: 120px;
}
.right-body .el-pagination {
  padding: 0;
  margin: 32px 0;
  text-align: center;
}
.demo-ruleForm {
  margin-top: 30px;
}
.upload {
  display: inline-block;
}
.task {
  margin-top: 10px;
  background: #ffffff;
  border: 1px solid rgba(234, 237, 243, 1);
  width: 880px;
  font-size: 14px;
}
.task tr:nth-of-type(2) td {
  padding-top: 18px;
  padding-bottom: 8px;
}
.task tr:last-of-type td {
  padding-top: 8px;
  padding-bottom: 20px;
}
.task tr:first-of-type td {
  border-bottom: 1px solid rgba(234, 237, 243, 1);
  height: 50px;
  line-height: 50px;
  font-weight: bold;
}
.task td:nth-of-type(3) {
  width: 50px;
}
.task td:first-of-type {
  width: 65px;
  padding-left: 20px;
}
.task td:nth-of-type(2) {
  width: 404px;
  text-align: left;
}
.task tr:not(:first-of-type) td:nth-of-type(2n + 1) {
  color: #9ea0a5;
}
.el-button {
  width: 98px;
  height: 40px;
}
.btns-left {
  float: left;
}
.btns-right {
  float: right;
}
.reportNum {
  margin-top: 10px;
  height: 96px;
  background: #ffffff;
  border: 1px solid rgba(234, 237, 243, 1);
  padding-left: 20px;
}
.oilNum {
  margin-top: 10px;
  border-collapse: collapse;
  background: #ffffff;
  width: 880px;
}
.oilNum td {
  border: 1px solid #eaedf3;
}
.oilNum tr:first-of-type td {
  height: 50px;
  text-align: left;
  font-weight: bold;
  padding-left: 20px;
}
table tr:not(:first-of-type) td:first-of-type {
  padding-left: 20px;
}
table tr:not(:first-of-type) td:not(:first-of-type) {
  padding-left: 10px;
}
table tr td:last-of-type {
  padding-right: 10px;
}
.task tr:not(:first-of-type) td:not(:first-of-type) {
  padding-left: 0px;
}
.remark {
  padding-left: 20px;
  padding-right: 20px;
  background: #ffffff;
  border: 1px solid rgba(234, 237, 243, 1);
  margin-top: 10px;
}
.contact {
  padding-left: 20px;
  background: #ffffff;
  border: 1px solid rgba(234, 237, 243, 1);
  border-top: none;
}
.person,
.tel {
  display: inline-block;
}
.person {
  margin-right: 20px;
}
.attach {
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid #eaedf3;
  border-bottom: none;
  background: #ffffff;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #3e3f42;
  font-weight: bold;
}
.tab-attach {
  border: 1px solid #eaedf3;
  border-bottom: none;
}
.attach span:first-of-type {
  float: left;
}
.attach span:nth-of-type(2) {
  float: right;
}
</style>

