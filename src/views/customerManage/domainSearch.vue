<template>
    <div class="www-page">
        <div style="padding-bottom:20px;">
            
            <span style="display:inline-block;">进件渠道：</span>
            <el-input v-model="query.channelCode" :maxlength=30 style="width:200px;margin-bottom:10px;" placeholder="进件渠道"></el-input>
            
            <span style="display:inline-block;">渠道名称：</span>
            <el-input v-model="query.channelName" :maxlength=30 style="width:200px;margin-bottom:10px;" placeholder="渠道名称"></el-input>

            <span style="display:inline-block;">添加时间：</span>
            <el-date-picker
              style="width:200px;margin-bottom:10px;"
              v-model="query.createTimeStart"
              type="date"
              placeholder="开始时间"
              >
            </el-date-picker>
            <el-date-picker
              style="width:200px;margin-bottom:10px;"
              v-model="query.createTimeEnd"
              type="date"
              placeholder="结束时间"
              >
            </el-date-picker>

            <span style="display:inline-block;">渠道状态：</span>
            <el-select v-model="query.status" placeholder="状态" style="width:200px;margin-bottom:10px;">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>

            <el-button v-waves style="margin-bottom:10px;" icon="setting" @click="reset">重置</el-button>
            <el-button type="primary" v-waves style="margin-bottom:10px;" icon="search" @click="search">查询</el-button>
            
            <el-button style="margin-left: 10px;" @click="handleExcel" icon="arrow-down">导出Excel</el-button>
        </div>
        <div class="www-table-box">
            <el-table
            ref="multipleTable"
            :data="data.channelCodePoList"
            border
            style="width:2000px;"
            v-loading="listLoading">
            
                <el-table-column prop="channelCode" label="编号" min-width="100"></el-table-column>
                <el-table-column label="渠道名称" min-width="170">
                    <template scope="scope">
                        <router-link :to="{name:'customerManage_domainDetail',query:{id:scope.row.id}}">{{scope.row.channelName}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="channelLink" label="渠道链接" min-width="170"></el-table-column>
                <el-table-column prop="createTime" label="添加时间" min-width="170"></el-table-column>
                <el-table-column prop="registerNumber" label="注册人数" min-width="170"></el-table-column>
                <el-table-column prop="downloadNumber" label="下载人数" min-width="170"></el-table-column>
                <el-table-column prop="applyNumber" label="提交授信用户量" min-width="170"></el-table-column>
                <el-table-column prop="passApplyNumber" label="通过授信用户量" min-width="170"></el-table-column>
                <el-table-column prop="lendApplyNumber" label="借款申请量" min-width="170"></el-table-column>
                <el-table-column prop="lendAmount" label="放款总额" min-width="170"></el-table-column>
                <el-table-column prop="repaymentAmount" label="还款总额" min-width="170"></el-table-column>
                <el-table-column prop="doneOrder" label="完成订单量" min-width="170"></el-table-column>
                <el-table-column prop="delayNumber" label="逾期用户量" min-width="170"></el-table-column>
                <el-table-column prop="unRepaymentNumber" label="未还款用户量" min-width="170"></el-table-column>
                <el-table-column prop="unRepaymentAmount" label="未还款金额" min-width="170"></el-table-column>
            </el-table>
        </div>
        <div v-if="data.channelCodePoList" class="pagination-container" style="padding:10px 0;">
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
            regex: /^[\d]{4}-[\d]{2}-[\d]{2}$/,
            options: [{
                value: '',
                label: '全部'
            }, {
                value: '1',
                label: '启用'
            }, {
                value: '0',
                label: '禁用'
            }],
            query: {
                url: 'channelCode/list',
                page: 1,
                size: 10,
                createTimeStart: '',
                createTimeEnd: '',
                channelCode: '',
                channelName: '',
                status: ''
            },
            current: 1, // 默认显示第一页
            data: {
                channelCodePoList: null,
                totalItems: 0
            }
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
            if (this.query.createTimeStart && !this.regex.test(this.query.createTimeStart)) {
                this.query.createTimeStart = parseTime(this.query.createTimeStart, '{y}-{m}-{d}');
            }
            if (this.query.createTimeEnd && !this.regex.test(this.query.createTimeEnd)) {
                this.query.createTimeEnd = parseTime(this.query.createTimeEnd, '{y}-{m}-{d}');
            }
        },
        // 获取列表
        search (cur) {
            this.changeQuery(cur);
            this.listLoading = true;
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
                url: 'channelCode/list',
                page: 1,
                size: 10,
                createTimeStart: '',
                createTimeEnd: '',
                channelCode: '',
                channelName: '',
                status: ''
            }
        },
        // 下载excel
        handleExcel () {
            downloadExecl({url: 'channelCode/exportExcel', input: this.query});
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
