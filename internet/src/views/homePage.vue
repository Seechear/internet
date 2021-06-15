<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px"
      style="text-align: left;overflow-y: scroll;overflow-x: hidden;max-height: 100vh;float: left;">
      <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
        <el-submenu v-for="(item,index) in menuList" :index="''+index" :key='index'>
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.listName}}</span>
          </template>
          <el-menu-item-group v-for="(items,indexs) in item.childrenList" :key='indexs' :index="''+indexs+''">
            <el-menu-item :index="''+index+'-'+indexs">{{items}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main style="overflow-y: auto;overflow-x: hidden;height: 100vh;float: right;">
        <template>
          <div class="homeHead">
            <div class="user">
              <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
                 <el-submenu :index="'1'">
                    <template slot="title" style="userName">{{account}}</template>
                    <el-menu-item @click="exit" :index="'1-1'">退出</el-menu-item>
                  </el-submenu>
             </el-menu>
            </div>
          </div>
          <div class="homeBody">
            <router-view style="margin-top: 70px;"/>
          </div>
        </template>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        menuList: [{
          "listName": "系统管理",
          "childrenList": ["用户管理", "公司管理", "角色管理", "公司管理", "公司管理", "公司管理"]
        }, {
          "listName": "机械管理",
          "childrenList": ["机器人", "图像传感器", "深度相机", "3D打印机", "球形光源", "透射光源"]
        }],
        isCollapse:false,
        userlist:[],
        account:''
      }
    },
    methods: {
      exit(){
       window.sessionStorage.clear();
        this.$router.push({path:'/'})
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      getLogin(){
        this.$data.account= window.sessionStorage.getItem("account")
      },
      handleSelect(key, keyPath) {
              console.log(key, keyPath);
            }
    },
    created(){
      this.getLogin();
    }
  }
</script>

<style>
  .el-submenu__title{
     color: white !important;
  }
  .el-submenu__title:hover{
     color: black !important;
  }
  .el-menu-demo{
    background-color: rgba(0,0,0,0);

  }
.el-menu--collapse .el-menu .el-submenu, .el-menu--popup{
  min-width: 100px!important;
  text-align: center;
}
  .user{
    float: right;
    height: 100%;
  }
  .el-main{
    padding: 0;
  }
  .homeHead{
    width: 100%;
    height: 60px;
    background-color: #474e55;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  .el-menu {
    border-right: solid 0px #e6e6e6;
  }

  .el-aside {
    background-color: #545C64;
  }
  .el-aside::-webkit-scrollbar {
    width: 0px;
  }

  .el-main::-webkit-scrollbar {
    width: 0px;
  }
</style>
