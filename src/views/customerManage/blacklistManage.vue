<template>
    <div>
        <div class="www-page">
            <div style="padding-bottom:20px;">
                用户ID：
                <el-input v-model="query.userId" :maxlength=30 style="width:200px;margin-bottom:10px;" placeholder="用户ID"></el-input>
                姓名：
                <el-input v-model="query.realName" :maxlength=30 style="width:200px;" placeholder="姓名"></el-input>
                手机号：
                <el-input v-model="query.mobile" :maxlength=11 style="width:200px;" placeholder="手机号"></el-input>
                <!--<el-select v-model="query.sourceType" placeholder="来源">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>-->
                <el-button v-waves @click="reset" icon="setting">重置</el-button>
                <el-button type="primary" v-waves icon="search" @click="search">查询</el-button>
                <el-button style="margin-left: 10px;" @click="handleExcel" icon="arrow-down">导出Excel</el-button>

                <div style="display:inline-block;">
                    <el-button style="margin-left: 10px;" @click="toggleShowUpload" icon="upload">导入Excel</el-button>
                    <div style="display:inline-block;position:absolute;">
                        <el-button style="margin-left: 10px;opacity:0;alpha(opacity=0);" icon="upload">导入Excel</el-button>
                        <upload :url="uploadURL" :only-single="true" :value="showUpload" field="black" keys="0" max-size="2048" :params="otherParams" @uploadSuccess="uploadSuccess" @uploadFail="uploadFail">
                        </upload>
                    </div>
                </div>

            </div>
            <div>
                <el-table :data="data.poList" v-loading="listLoading" fit border highlight-current-row style="width: 100%">
                    <el-table-column label="序号" width="100" align="center">
                        <template scope="scope">
                            <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userId" label="用户ID"  align="center" ></el-table-column>
                    <el-table-column prop="realName" label="姓名"  align="center"></el-table-column>
                    <el-table-column prop="mobile" label="手机号"  align="center" ></el-table-column>
                    <el-table-column prop="idenNo" label="身份证号" width="200"  align="center"></el-table-column>
                    <el-table-column prop="createTime" label="添加时间" width="200"  align="center"></el-table-column>
                    <el-table-column prop="channelCode" label="渠道来源" width="200"  align="center"></el-table-column>
                    <el-table-column label="状态"  align="center">
                        <template scope="scope">
                            <span>黑名单</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="refuseReason" label="拒绝原因"  align="center" ></el-table-column>
                    <el-table-column label="操作" width="110"  align="center">
                        <template scope="scope">
                            <el-button size="small" :plain="true" type="danger" @click="remove(scope.row, scope.$index)">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-show="!listLoading" class="pagination-container" style="padding:10px 0;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="query.page" :page-sizes="[10,20,30,50]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper" :total="data.totalItems">
                    </el-pagination>
                </div>
                <el-dialog title="黑名单导入提示" :visible.sync="dialogVisible" size="small">
                    <div>{{message}}</div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="confirm">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import { downloadExecl } from '@api/excel.js';
import upload from '@components/upload';
import { baseURL } from '@api/base.js';

import { trim } from '@src/utils/util';

export default {
    components: {
        upload
    },
    data() {
        return {
            listLoading: true,
            dialogVisible:false,
            message:null,
            // options: [{
            //     value: 'A',
            //     label: 'A'
            // }, {
            //     value: 'B',
            //     label: 'B'
            // }, {
            //     value: 'C',
            //     label: 'C'
            // }, {
            //     value: 'D',
            //     label: 'D'
            // }],
            query: {
                url: 'findBlackUserList',
                page: 1,
                size: 10,
                userId: '',
                mobile: '',
                realName: ''
            },
            current: 1, // 默认显示第一页
            data: {
                poList: [],
                totalItems: 0
            },
            // 导入excel
            showUpload: false,
            otherParams: {
                token: 'fileToken',
                name: 'file'
            },
            uploadURL: baseURL() + 'importBlackUserListExcel'
        }
    },
    computed: {
    },
    created() {
        this.search(1);
    },
    mounted() {
    },
    methods: {
        // 获取列表
        search(cur) {
            if (cur && typeof cur === 'number') {
                this.query.page = cur;
            }
            this.listLoading = true;
            this.query.mobile = trim(this.query.mobile);
            config(this.query).then(response => {
                this.listLoading = false;
                if (response.respCode === '000000') {
                    this.data = response.data;
                }
            })
        },
        // 重置搜索框
        reset() {
            this.query.userId = '';
            this.query.mobile = '';
            this.query.realName = '';
            this.query.authLevel = '';
        },
        // 删除单条数据
        remove(user, index) {
            this.$confirm('确认移除黑名单吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                config({
                    url: 'deleteBlackUserList',
                    id: user.id
                }).then(response => {
                    if (response.respCode === '000000') {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.search();
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 下载excel
        handleExcel() {
            downloadExecl({ url: 'exportBlackUserListExcel', input: this.query });
        },
        // 改变每一页的条数
        handleSizeChange(val) {
            this.query.size = val;
            this.search();
        },
        // 切换页码
        handleCurrentPageChange(val) {
            this.search(val);
        },
        toggleShowUpload() {
            this.showUpload = !this.showUpload;
        },
        uploadSuccess(data, field, keys) {
            if (data.respCode === '000000') {
                this.$message.success('上传成功');
            } else {
                //this.$message.error(data.respMsg);
                this.message=data.respMsg;
                this.dialogVisible=true;
            }
            this.showUpload = false;
            this.search();
        },
        uploadFail(status, field, keys) {
            this.$message.error('上传失败');
            this.showUpload = false;
        },
        confirm(){
            this.dialogVisible=false;
        }
    }
}
</script>
