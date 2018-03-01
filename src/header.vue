<template>
    <div id="__header" v-show="isShow">
        <div class='header' style="min-width:1000px;">
        <h1 class="logo">好享借</h1>
        <div style="float:left;">
            <el-menu theme="dark" :default-active="activeIndex"  mode="horizontal" @select="handleSelect">
                <el-menu-item v-for="(item,index) in data" :index="index + ''" :key="index">
                    <router-link style="display:block;" :to="(item.resourceUrl)">{{item.resourceName}}</router-link>
                </el-menu-item>
            </el-menu>
        </div>
        <div style="float:right;">
            <el-menu theme="dark" mode="horizontal" @select="handleSelect">
                <el-submenu index="user" style="float:right;">
                    <template class="title" slot="title" v-if="user">{{user.realName}}</template>
                    <template class="title" slot="title" v-else>用户名</template>
                    <el-menu-item index="personalInfo">个人资料</el-menu-item>
                    <el-menu-item index="modifyPass">修改密码</el-menu-item>
                    <el-menu-item index="logout">退出</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        </div>
        <el-dialog title="个人资料" :visible.sync="dialogFormVisible">
            <el-form v-if="sysUserVo" :model="sysUserVo" :rules="rules" ref="userInfo" v-loading="dialogLoading">
                <el-form-item prop="realName" label="姓名" label-width="120">
                    <el-input disabled v-model="sysUserVo.realName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="roleName" label="角色" label-width="120">
                    <el-input disabled v-model="sysUserVo.roleName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="userName" label="账号" label-width="120">
                    <el-input disabled v-model="sysUserVo.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" label="手机" label-width="120">
                    <el-input :disabled="mobileDisable" v-model="sysUserVo.mobile" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="" label-width="120">
                    <el-button @click="editMobile">编 辑</el-button>
                </el-form-item>
                <el-form-item prop="email" label="邮箱" label-width="120">
                    <el-input disabled v-model="sysUserVo.email" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div v-if="isEdit" slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible=false;mobileDisable=true;">取 消</el-button>
                <el-button type="primary" @click="commit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改密码" :visible.sync="passwordDialog">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2">
                <el-form-item style="padding-right:100px;" label="账号" label-width="120">
                    <el-input v-if="sysUserVo" v-model="sysUserVo.userName" disabled auto-complete="off"></el-input>
                    <el-input v-else disabled auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item style="padding-right:100px;" prop="oldPassword" label="原密码" label-width="120">
                    <el-input v-model="ruleForm2.oldPassword" placeholder="请输入原密码" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item style="padding-right:100px;" prop="pass" label="新密码" label-width="120">
                    <el-input v-model="ruleForm2.pass" placeholder="请输入新密码" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item style="padding-right:100px;" prop="checkPass" label="新密码" label-width="120">
                    <el-input v-model="ruleForm2.checkPass" placeholder="请再次输入" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm2')">取 消</el-button>
                <el-button type="primary" @click="commitNewPass('ruleForm2')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import config from '@api/config.js';
import {mobile} from '@utils/validate.js';
import logout from '@utils/logout';
import Cookies from 'js-cookie';
import { mapGetters } from 'vuex';

export default {
  data(){
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return{
      isShow: this.$store.getters.token,
      activeIndex: '0',
      dialogLoading: false,
      mobileDisable: true,
      isEdit: false,
      dialogFormVisible: false,
      // 表单验证
      rules: {
          mobile
      },
      ruleForm2: {
        pass: '',
        checkPass: '',
        oldPassword: ''
      },
      rules2: {
        pass: [
            { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
            { validator: validatePass2, trigger: 'blur' }
        ]
      },
      activeName: 'second',
      sysUserVo: null,
      passwordDialog: false,
      data: this.$store.getters.headerRouters
    }
  },
  computed: {
      ...mapGetters([
          'user'
      ])
  },
  mounted () {
    //   window.onresize = function (ev) {
    //       let e = ev || event;
    //       let width = e.target.innerWidth;
    //       if (width <= 1000) {
    //           this.fixedWidth = true;
    //       } else {
    //           this.fixedWidth = false;
    //       }
    //   }
  },
  methods: {
    getUserInfo () {
        this.$store.dispatch('USERINFO').then(response => {
            if (response.respCode === '000000') {
                let user = response.data.sysUserPo;
                this.sysUserVo = {
                    realName: user.realName,
                    roleName: user.roleName,
                    roleId: user.roleId,
                    userName: user.userName,
                    mobile: user.mobile,
                    email: user.email
                }
            } else {
                this.$message.error(response.respMsg)
            }
        })
    },
    handleSelect(key) {
        this.getUserInfo();
        if (key == 'personalInfo') {
            this.dialogFormVisible = true;
        } else if(key == 'modifyPass') {
            this.passwordDialog = true;
        } else if (key == 'logout') {
            logout();
        }
    },
    // 修改密码提交
    commitNewPass (formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                let obj = {
                    url: 'updateSysUserPassword.html',
                    oldPassword: this.ruleForm2.oldPassword,
                    newPassword: this.ruleForm2.pass,
                    userId: localStorage.getItem('userId') || ''
                }
                config(obj).then(response => {
                    if (response.respCode === '000000') {
                        this.passwordDialog=false;
                        this.$message.success(response.respMsg)
                        
                    } else {
                        this.$message.error(response.respMsg)
                    }
                })
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    },
    // 取消修改密码
    resetForm(formName) {
        this.$refs[formName].resetFields();
        this.passwordDialog = false;
    },
    editMobile () {
        this.isEdit = true;
        this.mobileDisable = false;
    },
    // 添加
    commit () {
        let isSuccess = true;
        this.$refs['userInfo'].validate((valid) => {
            if (!valid) {
                isSuccess = false;
                return false;
            }
        });
        if (!isSuccess) {
            return false;
        }
        this.dialogLoading = true;
        config({url: 'updateSysUser.html', sysUserVo: this.sysUserVo}).then(response => {
            if (response.respCode === '000000') {
                this.$message({
                    message:　response.respMsg,
                    type: 'success'
                });
            } else {
                this.$message.error(response.respMsg);
            }
            this.dialogFormVisible = false;
            this.dialogLoading = false;
        })
    },
    // 设置头
    setHeader () {
        this.data = this.$store.getters.headerRouters;
        this.isShow = this.$store.getters.token;
    },
    setActiveIndex (index) {
        this.activeIndex = index + '';
    }
  }
}
</script>
<style lang="less" scoped>
    
</style>

