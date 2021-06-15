<template>
  <div>
    <div class="ulHead">
      <el-row type="flex">
        <el-col :span="2">
          <el-button type="primary" @click="addOpen">新增</el-button>
        </el-col>
        <el-col :span="6">
          <el-input v-model="selUser" placeholder="请输入用户名" width="200px"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="mSelect">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="delOpt">批量删除</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table ref="multipleTable" :data="userlist" tooltip-effect="dark" style="width: 100%;margin: 10px 0;" border
      :key="itemkey"  @selection-change="seleChange">
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column label="序号" type="index" align="center" width="60">
      </el-table-column>
      <el-table-column label="用户名" prop="username" align="center">
      </el-table-column>
      <el-table-column label="密码" prop="password" align="center">
      </el-table-column>
      <el-table-column label="年龄" prop="age" align="center">
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="changeThis(scope.$index)">编辑</el-button>
          <el-button type="text" style="color:#f5222d;" @click="delThis(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑用户" :visible.sync="updateUser" width="500px" :close-on-click-modal='false'>
      <el-form :model="user">
        <el-form-item label="用户名">
          <el-input v-model="user.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" class="cAge">
          <el-input v-model="user.age" autocomplete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateUser = false">取 消</el-button>
        <el-button type="primary" @click="updatePro()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增用户" :visible.sync="chkadd" width="500px" :close-on-click-modal='false'>
      <el-form :model="user">
        <el-form-item label="用户名">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" class="cAge">
          <el-input v-model="user.age" autocomplete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUser = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userlist: [],
        saveUserList: [],
        user: {},
        updateUser: false,
        itemkey: 1,
        chkadd: false,
        selUser: '',
        opt:[]
      }
    },
    methods: {
      delOpt(){
        var arr=[]
        for(let i=0;i<this.saveUserList.length;i++){
          console.log(this.saveUserList[i].username)
          for(let j=0;j<this.opt.length;j++){
            if(this.saveUserList[i].username==this.opt[j].username){
               arr.push(i)
            }
          }
        }
        for(let i=arr.length-1;i>=0;i--){
          this.$data.saveUserList.splice(arr[i], 1)
        }
         this.$data.userlist= this.$data.saveUserList;
         console.log(this.$data.saveUserList)
      },
      seleChange(val) {
        this.opt=val;
        console.log(this.opt)
      },
      mSelect() {
        if (this.selUser == '') {
          this.userlist = this.saveUserList
        } else {
          var arr = [];
          for (let i = 0; i < this.saveUserList.length; i++) {
            if (this.saveUserList[i].username.split(this.selUser).length > 1) {
              arr.push(this.saveUserList[i]);//储存总数据变量防止重复查询数据丢失
            }
          }
          this.userlist = arr;
        }
      },
      addOpen() {
        this.user = {};
        this.chkadd = true;
      },
      addUser() {
        if (this.user.age > 100 || this.user.age <= 0) {
          this.$message.error('年龄输入有误!');
        } else {
          var userlist = this.$data.userlist;
          this.chkadd = false;
          this.userlist.push(this.user)
          this.itemkey = Math.random(); //刷新table
          this.saveUserList = this.userlist; //刷新存储
        }
      },
      updatePro() {
        if (this.user.age > 100 || this.user.age <= 0) {
          this.$message.error('年龄输入有误!');
        } else {
          var userlist = this.$data.userlist;
          for (let i = 0; i < userlist.length; i++) {
            if (userlist[i].username == this.$data.user.username) {
              this.$data.userlist[i] = this.$data.user;
              this.$data.updateUser = false;
            }
          }
          this.itemkey = Math.random(); //刷新
          this.saveUserList = this.userlist; //刷新存储
        }
      },
      delThis(index) {
        this.$data.userlist.splice(index, 1)
         this.saveUserList = this.userlist; //刷新存储
      },
      changeThis(index) {
        this.$data.updateUser = true;
        var changeli = JSON.parse(JSON.stringify(this.userlist[index])); //防止变量污染
        this.$data.user = changeli;
      },
      getList() {
        this.$axios.get("/server.json").then((res) => {
          console.log(res.data);
          this.$data.userlist = res.data.userlist;
          this.$data.saveUserList = res.data.userlist;
        })
      }
    },
    created() {
      this.getList()
    }
  }
</script>

<style>
  .ulHead{
    padding-bottom: 30px;
  }
  .homeBody{
    width: 90%;
    margin: 0 auto;
  }
  .cAge input::-webkit-outer-spin-button,
  .cAge input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .cAge input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
