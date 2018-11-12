<template>
  <div class="bar-top">
    <div class="w-1180">
      <div class="bar-left">
        <img class="logo_sj"  src="../assets/images/logo_sj.png" alt="">
      </div>
      <div class="bar-right">
        <ul class="oil-tabs">
          <li class="oil-tabs-item">{{userinfo.enterpriseName}}</li>
          <li class="oil-tabs-item out" @click="signOut">Sign Out</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topBar',
  data () {
    return {
      userinfo:{}
    }
  },
  mounted(){
    this.getInfo()
  },
  methods: {
    signOut(){
      location.href="/getLoginOut";
    },
    getInfo(){
      this.userinfo = JSON.parse(localStorage.getItem("$BLOCK_INSPECTION_USER_INFO"))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/_common.scss';

$topH:70px;
.bar-top{
  background: $Black;
  .w-1180{
    .bar-left{
    line-height: $topH;
    .logo_sj{
      width:156px;
    }
  }
  }
}
.oil-tabs{
  float: right;
  color: #ffffff
}
.oil-tabs-item{
  line-height:$topH;
}
.out{
  cursor: pointer;
}
</style>
