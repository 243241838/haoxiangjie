<template>
    <div class="www-page">
        <div style="padding-bottom:20px;">
            手机号：
            <el-input v-model="query.mobile" :maxlength=30 style="width:200px;margin-bottom:10px;" placeholder="手机号"></el-input>
            姓名：
            <el-input v-model="query.realName" :maxlength=30 style="width:200px;margin-bottom:10px;" placeholder="姓名"></el-input>
            <!--渠道：
            <el-select v-model="query.channelCode" placeholder="渠道" style="width:200px;margin-bottom:10px;">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>-->
            状态：
            <el-select v-model="query.realNameStatus" placeholder="状态" style="width:200px;margin-bottom:10px;">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            是否申请借款：
            <el-select v-model="query.isApplyLoan" placeholder="是否申请借款" style="width:200px;margin-bottom:10px;">
                <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            注册时间：
            <el-date-picker
              style="width:200px;margin-bottom:10px;"
              v-model="createTime"
              type="daterange"
              placeholder="注册时间"
              >
            </el-date-picker>
            <span style="display:inline-block;">登录时间：</span>
            <el-date-picker
              style="width:200px;margin-bottom:10px;"
              v-model="lastLoginTime"
              type="daterange"
              placeholder="登录时间"
              >
            </el-date-picker>
            <el-button v-waves style="margin-bottom:10px;" icon="setting" @click="reset">重置</el-button>
            <el-button type="primary" v-waves style="margin-bottom:10px;" icon="search" @click="search">查询</el-button>
            <!--<el-button v-waves style="margin-bottom:10px;" icon="plus" @click="addBlack">加入黑名单</el-button>
            <el-button v-waves style="margin-bottom:10px;" icon="plus" @click="addWhite">加入白名单</el-button>-->
            <el-button style="margin-left: 10px;" @click="handleExcel" icon="arrow-down">导出Excel</el-button>
        </div>
        <div class="www-table-box">
            <el-table
            ref="multipleTable"
            :data="data.customerPOList"
            border
            style="width:2000px;"
            v-loading="listLoading"
            @selection-change="handleSelectionChange">
            <!--<el-table-column
                type="selection"
                width="100">
            </el-table-column>-->
            <el-table-column label="序号" min-width="100">
                <template scope="scope">
                <span>{{(query.page-1)*query.size + parseInt(scope.$index) + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column label="姓名" min-width="160">
                <template scope="scope">
                    <router-link :to="{name:'customerManage_customerInfoDetails',query:{userId:scope.row.userId}}">{{scope.row.realName}}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" min-width="170"></el-table-column>
            <el-table-column prop="idenAddress" label="籍贯" min-width="160"></el-table-column>
            <el-table-column prop="createTime" label="注册时间" min-width="240"></el-table-column>
            <el-table-column prop="lastLoginTime" label="最后登录时间" min-width="240"></el-table-column>
            <el-table-column prop="channelCode" label="渠道编码" min-width="100"></el-table-column>
            <el-table-column prop="loanCount" label="借款次数" min-width="140"></el-table-column>
            <el-table-column prop="loanMoney" label="借款总额" min-width="120"></el-table-column>
            <el-table-column prop="realNameStatusName" label="状态" min-width="120"></el-table-column>
            </el-table>
        </div>
        <div v-if="data.customerPOList" class="pagination-container" style="padding:10px 0;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentPageChange"
            :current-page.sync="query.page"
            :page-sizes="[10,20,30,50]"
            :page-size="query.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="data.totalItems">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import '@res/css/wjq/style.less';
import config from '@api/config';
import {downloadExecl} from '@api/excel.js';
import {parseTime} from '@filters/index.js';
import {trim} from '@src/utils/util';

export default {
    data() {
        return {
            listLoading: true,
            options: [{
                value: '-9999',
                label: '全部'
            }, {
                value: '1',
                label: '认证成功'
            }, {
                value: '0',
                label: '未认证'
            }, {
                value: '-1',
                label: '认证失败'
            }],
            options2: [{
                value: '-1',
                label: '全部'
            }, {
                value: '1',
                label: '是'
            }, {
                value: '0',
                label: '否'
            }],
            createTime: [],
            lastLoginTime: [],
            query: {
                url: 'customerList',
                page: 1,
                size: 10,
                mobile: '',
                realName: '',
                channelCode: '',
                realNameStatus: '',
                isApplyLoan: '',
                createTimeStart: '',
                createTimeEnd: '',
                lastLoginTimeStart: '',
                lastLoginTimeEnd: ''
            },
            current: 1, // 默认显示第一页
            data: {
                customerPOList: null,
                totalItems: 0
            },
            multipleSelection: []
        }
    },
    computed: {
    },
    created () {
        this.search(1);
    },
    mounted () {
        
    },
    methods: {
        // 查询条件改变
        changeQuery (cur) {
            if (cur && typeof cur === 'number') {
                this.query.page = cur;
            }
            if (this.createTime.length > 0) {
                this.query.createTimeStart = parseTime(this.createTime[0], '{y}-{m}-{d}');
                this.query.createTimeEnd = parseTime(this.createTime[1], '{y}-{m}-{d}');
            }
            if (this.lastLoginTime.length > 0) {
                this.query.lastLoginTimeStart = parseTime(this.lastLoginTime[0], '{y}-{m}-{d}');
                this.query.lastLoginTimeEnd = parseTime(this.lastLoginTime[1], '{y}-{m}-{d}');
            }
        },
        // 获取列表
        search (cur) {
            this.changeQuery(cur);
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
        reset () {
            this.query = {
                url: 'customerList',
                page: this.query.page,
                size: this.query.size,
                mobile: '',
                realName: '',
                channelCode: '',
                status: '',
                isApplyLoan: '',
                createTimeStart: '',
                createTimeEnd: '',
                lastLoginTimeStart: '',
                lastLoginTimeEnd: ''
            }
            this.createTime = [];
            this.lastLoginTime = [];
        },
        // 删除单条数据
        remove (user, index) {
            this.$confirm('确认移除白名单吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                config({
                    url: 'deleteWhiteUserList',
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
        handleExcel () {
            downloadExecl({url: 'exportCustomerListExcel', input: this.query});
           
        },
        // 改变每一页的条数
        handleSizeChange (val) {
            this.query.size = val;
            this.search();
        },
        // 切换页码
        handleCurrentPageChange (val) {
            this.search(val);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 加入黑名单
        addBlack () {
            let arr = this.handleArr(this.multipleSelection);
            if (!arr) {
                return;
            }
            this.listLoading = true;
            config({url: 'addBlackUserList', blackUserListVoList: arr}).then(response => {
                this.listLoading = false;
                if (response.respCode === '000000') {
                    this.$message.success(response.respMsg)
                } else {
                    this.$message.error(response.respMsg)
                }
            });
        },
        // 加入白名单
        addWhite () {
            let arr = this.handleArr(this.multipleSelection);
            if (!arr) {
                return;
            }
            this.listLoading = true;
            config({url: 'addWhiteUserList', whiteUserListVoList: arr}).then(response => {
                this.listLoading = false;
                if (response.respCode === '000000') {
                    this.$message.success(response.respMsg)
                } else {
                    this.$message.error(response.respMsg)
                }
            });
        },
        handleArr () {
            let arr = [];
            this.multipleSelection.map((item) => {
                arr.push({userId: item.userId});
            })
            if (arr.length === 0) {
                return false;
            }
            return arr;
        }
    }
}
</script>
