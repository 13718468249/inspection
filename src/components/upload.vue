<template>
  <div class="right-body">
    <div class="oil-title clearfix">
      <div class="oil-title-2"> 
          <router-link to="/mag-doc">
              <span>单证管理</span>
          </router-link>
          <i class="el-icon-arrow-right"></i>
          <!-- <router-link :to="{path:'/rep-display',query:{rwId:rwId,bgId:bgId,uuid:uuid,oilseed:oilseed}}">
              <span>我的商检报告</span>
          </router-link> -->
          <span @click="handleClick">我的商检报告</span>
          <i class="el-icon-arrow-right"></i>
          <span>上传附件</span>
      </div>
    </div>
    <div class="up-content">
        <p class="tit">附件</p>
        <div class="main-upload">
            <el-upload
            class="upload-demo"
            drag
            action="http://transaction.test.myoilbank.com/common/doc/upload.json"
            :on-success="uploadFile"
            :before-upload="handleBeforeUpload"
            multiple  :show-file-list="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">支持扩展名PDF.JPG.GIF.PNG.</div>
            </el-upload>
        </div>
        <ul class="file-column">
            <li v-for="(item, i) in fileList" :key="i" class="file-item">
                <span class="file-name">{{item.name}}</span>
                <el-button type="text" @click="deleteRow(i)" size="small" class="del-file">删除</el-button>
            </li>
        </ul>
    </div>
  </div>
</template>
 
<script>
import API from "@/api/api.js";
export default {
  data() {
    return {
      bgId: this.$route.query.bgId,
      rwId: this.$route.query.rwId,
      uuid: this.$route.query.uuid,
      status:this.$route.query.status,
      oilseed: this.$route.query.oilseed,
      dealNo:this.$route.query.dealNo,
      fileData: {},
      fileList: []
    };
  },
  mounted() {},
  methods: {
    uploadFile(res1, file) {
      let rdata = res1.datas;
    //   this.fileList.push(rdata.originalName);
    //   console.log(this.fileList);
      rdata.id = this.bgId;
      rdata.taskId = this.rwId;
      rdata.businessUuid = this.uuid;
      rdata.deal_no=this.dealNo;
    //   this.$message({
    //     type: "success",
    //     message: "文件上传成功，正在保存数据..."
    //   });
      this.$http(API.UPLOAD, rdata)
        .then(res2 => {
          let status = res2.data.status;
          let sucData = res2.data.datas;
          if (status) {
            this.$message({
              type: "error",
              message: "保存失败"
            });
          } else {
            this.fileList.push(sucData);
            // console.log(sucData);
            this.$message({
              type: "success",
              message: "保存成功"
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "保存失败"
          });
        });
    },
    deleteRow(index) {
      let rows = this.fileList;
      let delData = rows[index];

      this.$http(API.FJ_DEL, {
        id:delData.id,
        createUser: delData.createUser
      }).then(res => {
        // console.log(res);
        rows.splice(index, 1);
      });
    },
    handleBeforeUpload(file) {
    //   console.log(file);
      let type = file.type;
      let ifImg = type.indexOf("image") > -1;
      let ifPdf = type.indexOf("pdf") > -1;
      let result = ifImg || ifPdf;
      if (!result) {
        this.$message({
          type: "error",
          message: "不支持当前文件格式!"
        });
      }
      return result;
    },
    handleCurrentChange(pageNum) {},
    handleClick() {
      this.$router.push({
        path: "/rep-display",
        query: {
          rwId: this.rwId,
          bgId: this.bgId,
          uuid: this.uuid,
          status:this.status,
          oilseed: this.oilseed,
          dealNo:this.dealNo,
        }
      });
    }
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
.up-content {
  width: 880px;
  height: 535px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(234, 237, 243, 1);
  background: #fff;
  margin-top: 30px;
}
.tit {
  padding-left: 30px;
  border-bottom: 1px solid rgba(234, 237, 243, 1);
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  font-weight: bold;
}
.main-upload {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
.file-column{
    width: 82%;
    margin: 10px auto;
    height: 180px;
    overflow-x: hidden;
    overflow-y: auto;
}
.file-item{
    text-align: center;
    position: relative;
    height: 32px;
    line-height: 32px;
}
.file-name{
    display: inline-block;
    width: 480px;
    text-align:center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.del-file{
    position: absolute;
    top: 0;
    right: 60px;
    color: #409EFF;
}
</style>

