<template>
  <div>
    <div class="www-page">
        <div style="padding-bottom:20px;">
            用户姓名：
            <el-input v-model="query.realName" :maxlength=30 style="width:200px;" placeholder="用户姓名"></el-input>
            角色：
            <el-select v-model="query.roleId" style="width:200px;" placeholder="角色">
                <el-option
                v-for="item in poList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId">
                </el-option>
            </el-select>
            <el-button type="primary" v-waves icon="search" @click="search">查询</el-button>
            <el-button type="primary" v-waves :plain="true" icon="plus" @click="add">添加</el-button>
        </div>
        <div>
            <el-table :data="data.sysUserPoList" v-loading="loading" border style="width: 100%;min-width:1200px;">
                <el-table-column label="序号" width="100">
                    <template scope="scope">
                        <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="roleName" label="角色"></el-table-column>
                <el-table-column prop="userName" label="登录名"></el-table-column>
                <el-table-column prop="realName" label="用户姓名"></el-table-column>
                <el-table-column prop="mobile" label="手机"></el-table-column>
                <el-table-column prop="lastLoginIp" label="最后登录IP"></el-table-column>
                <el-table-column prop="lastLoginTime" label="最后登录时间"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="modifyTime" label="最后修改时间"></el-table-column>
                <el-table-column prop="enabled" label="状态">
                    <template scope="scope">
                        <span v-if="scope.row.enabled==1">正常</span>
                        <span v-if="scope.row.enabled==0">停用</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250">
                    <template scope="scope">
                        <el-button style="margin-left:0;" :plain="true" type="info" size="small" @click="look(scope.row, scope.$index)">查看
                        </el-button>
                        <el-button style="margin-left:0;" :plain="true" type="success" size="small" @click="edit(scope.row, scope.$index)">修改
                        </el-button>
                        <el-button v-if="scope.row.enabled==1" style="margin-left:0;" type="danger" size="small" @click="forbidden(scope.row, scope.$index)">停用
                        </el-button>
                        <el-button v-if="scope.row.enabled==0" style="margin-left:0;" type="success" size="small" @click="forbidden(scope.row, scope.$index)">恢复
                        </el-button>
                        <el-button style="margin-left:0;" :plain="true" type="warning" size="small" @click="resetPassword(scope.row, scope.$index)">重置密码
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-show="!loading" class="pagination-container" style="padding:10px 0;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="query.page"
                    :page-sizes="[10,20,30,50]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper" :total="data.totalItems">
                </el-pagination>
            </div>
        </div>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
        <el-form :model="sysUserVo" :rules="rules" ref="userInfo" v-loading="dialogLoading">
            <el-form-item prop="roleId" label="角色" label-width="120">
                <el-select v-model="sysUserVo.roleId" placeholder="请选择角色">
                    <el-option
                    v-for="item in poList"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="userName" label="账号" label-width="120">
                <el-input v-model="sysUserVo.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="realName" label="姓名" label-width="120">
                <el-input v-model="sysUserVo.realName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="mobile" label="手机" label-width="120">
                <el-input v-model="sysUserVo.mobile" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱" label-width="120">
                <el-input v-model="sysUserVo.email" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="commit">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
 
import '@res/css/wjq/style.less';
import config from '@api/config';
import {downloadExecl} from '@api/excel.js';
import {mobile, userName, email} from '@utils/validate.js';
import {trim} from '@src/utils/util';
export default {
    data() {
        return {
            loading: true,
            dialogLoading: false,
            // 角色列表
            poList: null,
            // 查询条件
            query: {
                url: 'sysUserList',
                page: 1,
                size: 10,
                realName: '',
                roleId: ''
            },
            // api返回的数据
            current: 1, // 默认显示第一页
            data: {
                sysUserPoList: [],
                totalItems: 0
            },
            // 对话框
            dialogTitle: '新增用户',
            dialogFormVisible: false,
            dialogURL: 'addSysUser',
            sysUserVo: {
                roleId: '',
                userName: '',
                realName: '',
                mobile: '',
                email: ''
            },
            // 表单验证
            rules: {
                roleId:[
                    {required: true, message: '请选择角色', trigger: 'blur'},
                ],
                userName,
                realName: [
                    {required: true, message: '姓名不能为空', trigger: 'blur'}
                ],
                mobile,
                email
            }
        }
    },
    computed: {
    },
    created () {
        this.getRoleList();
        this.search(1);
    },
    mounted () {
    },
    methods: {
        // 角色列表
        getRoleList () {
            config({url: 'findRoleList'}).then(response => {
                if (response.respCode === '000000') {
                    let arr = [{roleId: '', roleName: '全部'}]
                    this.poList = arr.concat(response.data.poList);
                    this.poList.map((item) => {
                        item.roleId += '';
                    })
                }
            })
        },
        // 获取列表
        search (cur) {
            if (cur && typeof cur === 'number') {
                this.query.page = cur;
            }
            if (typeof cur == 'object') {
                this.query.page = 1;
            }
            this.query.realName = trim(this.query.realName)
            this.loading = true;
            config(this.query).then(response => {
                this.loading = false;
                if (response.respCode === '000000') {
                    this.data = response.data;
                }
            })
        },
        // 查看
        look (row) {
            let ele = this.$createElement;
            this.$notify({
                title: '查看用户',
                message: ele('div', null, [
                    ele('p', null, [
                        ele('span', {style:'color: #333;margin-right:10px;'}, '角色：'),
                        ele('span', {style:'color: #333;margin-right:10px;'}, row.roleName)
                    ]),
                    ele('p', null, [
                        ele('span', {style:'color: #333;margin-right:10px;'}, '账号：'),
                        ele('span', {style:'color: #333;margin-right:10px;'}, row.userName)
                    ]),
                    ele('p', null, [
                        ele('span', {style:'color: #333;margin-right:10px;'}, '姓名：'),
                        ele('span', {style:'color: #333;margin-right:10px;'}, row.realName)
                    ]),
                    ele('p', null, [
                        ele('span', {style:'color: #333;margin-right:10px;'}, '手机：'),
                        ele('span', {style:'color: #333;margin-right:10px;'}, row.mobile)
                    ]),
                    ele('p', null, [
                        ele('span', {style:'color: #333;margin-right:10px;'}, '邮箱：'),
                        ele('span', {style:'color: #333;margin-right:10px;'}, row.email)
                    ])
                ]),
                offset: 100
            });
        },
        // 禁止/恢复
        forbidden (row) {
            let obj = {
                url: 'updateSysUserEnabled',
                userId: row.userId,
                enabled: row.enabled == 1 ? 0 : 1
            }
            config(obj).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message:　response.respMsg,
                        type: 'success'
                    });
                    row.enabled = obj.enabled;
                } else {
                    this.$message.error(response.respMsg);
                }
            })
        },
        // 重置密码
        resetPassword (row) {
            this.$alert('用户：' + row.realName, '重置密码', {
                confirmButtonText: '确定',
                callback: action => {
                    if (action == 'confirm') {
                        config({url: 'resetPassword', userId: row.userId}).then(response => {
                            if (response.respCode === '000000') {
                                this.$message({
                                    message:　response.respMsg,
                                    type: 'success'
                                });
                            } else {
                                this.$message.error(response.respMsg);
                            }
                        })
                    }
                }
            });
            
        },
        // 编辑用户
        edit (row) {
            this.dialogFormVisible = true;
            this.sysUserVo = {
                roleId: row.roleId + '',
                userName: row.userName,
                realName: row.realName,
                mobile: row.mobile,
                email: row.email,
                userId: row.userId
            }
            this.dialogURL = 'updateSysUser';
        },
        // 新增用户
        add () {
            this.sysUserVo = {
                roleId: '',
                userName: '',
                realName: '',
                mobile: '',
                email: ''
            }
            this.dialogFormVisible = true;
            this.dialogURL = 'addSysUser';
        },
        // 新增,修改提交
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
            config({url: this.dialogURL, sysUserVo: this.sysUserVo}).then(response => {
                if (response.respCode === '000000') {
                    this.$message({
                        message:　response.respMsg,
                        type: 'success'
                    });
                    this.search();
                    
                } else {
                    this.$message.error(response.respMsg);
                }
                this.dialogFormVisible = false;
                    this.dialogLoading = false;
            })
        },
        // 下载excel
        handleExcel () {
            downloadExecl({url: 'exportWhiteUserListExcel'});
        },
        // 改变每一页的条数
        handleSizeChange (val) {
            this.query.size = val;
            this.search();
        },
        // 切换页码
        handleCurrentPageChange (val) {
            this.search(val);
        }
    }
}
</script>
