<template>
  <div id="app" class="oil">
    <top-bar/>
    <div class="main">
      <div class="w-1180">
        <left-bar/>
        <div class="bar-right">
          <div class="right-box">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from "./common/barTop.vue";
import LeftBar from "./common/barLeft.vue";
import vueRouter from "./router/index.js";
import API from "@/api/api.js";
import { http } from "@/api/http.js";

const localName = "$BLOCK_INSPECTION_USER_INFO";

export default {
  components: {
    TopBar,
    LeftBar
  },
  data() {
    return {};
  },
  mounted() {
    this.login();
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      http(API.USER_INFO).then(res => {
        let userinfo = JSON.stringify(res.data);
        localStorage.setItem(localName, userinfo);
      });
    },
    login() {
      http(API.loginComf, {}, "get").then(res => {
        if (res.data) {
          // this.$store.commit('setUser',res.data);
          localStorage.setItem("setUserName", res.data);
        } else {
          location.href = API.LOGIN_PAGE;
        }
      });
    }
  }
};
</script>

<style>
.oil {
  background: #fbfbfd;
}
.main .w-1180 .bar-right {
  margin-bottom: 100px;
}
</style>
