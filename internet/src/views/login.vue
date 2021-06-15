<template>
  <div class="bkgpic">
    <div class="loginBox">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <h1 class="login-title">登录</h1>
        <div class="chunk">
          <el-form-item prop="account">
            <el-input v-model="ruleForm.account" placeholder="请输入账号" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="chunk">
          <el-form-item prop="pass">
            <el-input type="password" placeholder="请输入密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="chunk">
          <el-form-item>
            <el-button class="btnLogin" type="primary" @click="login()">登陆</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      var checAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          if (value.length <= 3 || value.length > 12) {
            callback(new Error('用户名格式错误!'));
          } else {
            callback();
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        }
        setTimeout(() => {
          if (value.length <= 3 || value.length > 12) {
            callback(new Error('密码格式错误!'));
          } else {
            callback();
          }
        }, 1000);
      };
      return {
        userlist: [],
        checked: true,
        rules: {
          account: [{
            validator: checAccount,
            trigger: 'blur'
          }],
          pass: [{
            validator: validatePass,
            trigger: 'blur'
          }],
        },
        ruleForm: {
          pass: '',
          account: '',
        },
      }
    },
    methods: {
      getUserlist() {
        this.$axios.get("/server.json").then((res) => {
          console.log(res);
          this.$data.userlist = res.data.userlist;
        })
      },
      login() {
        var userlist = this.$data.userlist;
        var haveLogin = false;
        console.log(userlist)
        for (let i = 0; i < userlist.length; i++) {
          if (userlist[i].username === this.$data.ruleForm.account && userlist[i].password === this.$data.ruleForm
            .pass) {
            haveLogin = true;
            this.$notify({
              title: '登陆成功！',
              type: 'success'
            });
            window.sessionStorage.setItem("isLogin", true);
            this.$router.push({
              name: 'homePage',
              params: {
                account: this.$data.ruleForm.account
              }
            })
             window.sessionStorage.setItem("account", this.$data.ruleForm.account);
          }
        }
        if (haveLogin == false) {
          this.$notify.error({
            title: '账号或者密码错误！',
          });
        }
      }
    },
    created() {
      this.getUserlist();
    },
  }
</script>
<style lang="scss">
  .el-form-item {
    margin-bottom: 25px;
  }

  .login-title {
    text-align: center;
    font-size: 20px;
    width: 100%;
  }

  .btnLogin {
    margin-top: 10px;
    width: 300px;
  }

  .el-input {
    width: 300px !important;
  }

  .demo-ruleForm {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  body {
    margin: 0;
    padding: 0;
  }

  .bkgpic {
    background-color: yellow;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loginBox {
    border-radius: 8px;
    width: 380px;
    height: 270px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
