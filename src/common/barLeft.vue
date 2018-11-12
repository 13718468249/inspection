<template>
  <div class="bar-left">
    <div class="wrapper">
      <div class="com-name">
        <div class="img-box">
          <img :src="logoUrl" alt="" srcset="">
        </div>
        <p class="com-title">{{userinfo.enterpriseName}}</p>
      </div>
     <el-menu
      :default-active="activeItem"
      class="el-menu-vertical-demo">
        <el-menu-item-group 
          :title='item.title' 
          v-for="(item, i) in manageList" 
          :key="i" 
          :index="item.index">
          <el-menu-item v-for="(listPer, m) in item.content" :key="m" :index="listPer.name"  @click="jump2detail(listPer)">
             <!-- <router-link class="oil-link" :to="{name: listPer.name}"> -->
              <i :class='listPer.tb'></i>
              <span>{{listPer.listName}}</span>
             <!-- </router-link> -->
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </div>
  </div>
</template>
<script>
import API from "@/api/api.js";
export default {
  data() {
    return {
      userinfo: {},
      logoUrl: "",
      routeHeads: ["ent", "doc"],
      routeNames: ["entrusts", "documents"],
      manageList: [
        {
          title: "任务管理",
          index: "1",
          content: [
            {
              name: "entrusts",
              imgUrl: "",
              listName: "委托列表",
              tb: "iconfont icon-list"
            }
          ]
        },
        {
          title: "单证管理",
          index: "2",
          content: [
            {
              name: "documents",
              // index: '1-1',
              imgUrl: "",
              listName: "商检单证管理",
              tb: "iconfont icon-doc"
            }
          ]
        },
        {
          title: "个人中心",
          index: "3",
          content: [
            {
              name: "acc-info",
              imgUrl: "",
              listName: "账户信息",
              tb: "iconfont icon-msg"
            },
            {
              name: "acc-safety",
              imgUrl: "",
              listName: "账号安全",
              tb: "iconfont icon-security"
            },
            {
              name: "mod-code",
              imgUrl: "",
              listName: "修改密码",
              tb: "iconfont icon-pwd"
            },
            {
              name: "son-acc",
              imgUrl: "",
              listName: "子账户管理",
              tb: "iconfont icon-riqi"
            }
          ]
        }
      ]
    };
  },
  watch: {
    $route(val) {
      this.activeItem = this.getRouteName(val.name);
    }
  },
  computed: {
    activeItem: {
      get() {
        return this.getInitActive();
      },
      set(val) {}
    }
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInitActive() {
      let name = this.$route.name;
      let rname = this.getRouteName(name);
      return rname;
    },
    jump2detail(item) {
      this.$router.push(item);
      // if (item.name == "acc-info") {
      //   location.href = API.ACC_INFO;
      // } else if (item.name == "acc-safety") {
      //   location.href = API.ACC_SAFETY;
      // } else if (item.name == "mod-code") {
      //   location.href = API.MOD_CODE;
      // } else if (item.name == "son-acc") {
      //   location.href = API.SON_ACC;
      // }
    },
    getInfo() {
      this.userinfo = JSON.parse(localStorage.getItem("$BLOCK_INSPECTION_USER_INFO"));
      this.logoUrl = this.userinfo.webDomain + this.userinfo.logo;
    },
    getRouteName(name) {
      // console.log(name);
      let heads = this.routeHeads;
      for (let i = 0; i < heads.length; i++) {
        let hi = heads[i];
        let rn = name.indexOf(hi) === 0;
        if (rn) {
          return this.routeNames[i];
        }
      }
      let enter = this.$route.query.enter;
      return enter;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/style/_common.scss";
.bar-left {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
  .wrapper {
    width: 100%;
    height: 649px;
    border: 1px solid rgba(234, 237, 243, 1);
  }
}
.el-menu-item.is-active {
  border-left: 1px solid #409eff;

  a {
    color: inherit;
  }
}
.el-menu-item {
  height: 46px;
  line-height: 46px;
}
.oil-link {
  width: 100%;
  height: 46px;
}
.oil-link span {
  margin-left: 20px;
}
.wrapper .el-menu {
  border-right: none;
}
</style>
